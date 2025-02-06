import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { FaUser, FaChild, FaBaby, FaInfoCircle, FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import { toast } from "react-toastify";
import BookingService from "../../services/BookingService";
import PaymentService from "../../services/PaymentService";
import tourApi from "@/services/TourService";
import { useUser } from "@/contexts/UserProvider";
import { useSearchParams, useNavigate } from "react-router-dom";


export default function Book() {
  const { user } = useUser();
  const userId = user?.id;
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tourId");
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    UserID: userId,
    TourID: tourId,
    AdultQuantity: 1,
    ChildQuantity: 0,
    InfantQuantity: 0,
    TotalAmount: 0
  });

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequirements: ""
  });

  const [selectTour, setSelectTour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tourId) {
          toast.error("No tour selected");
          return;
        }
        
        const response = await tourApi.getTourById(tourId); 
        if (response) {
          setSelectTour(response);
          calculateTotalAmount(
            bookingData.AdultQuantity, 
            bookingData.ChildQuantity, 
            bookingData.InfantQuantity, 
            response.price
          );
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        toast.error("Failed to load tour information");
      }
    };
  
    fetchData();
  }, [tourId, bookingData.AdultQuantity, bookingData.ChildQuantity, bookingData.InfantQuantity]);

  const calculateTotalAmount = (adults, children, infants, basePrice) => {
    const adultTotal = adults * basePrice;
    const childTotal = children * (basePrice * 0.75);
    const infantTotal = infants * (basePrice * 0.1);
    return adultTotal + childTotal + infantTotal;
  };

  const handleQuantityChange = (type, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    const updatedBooking = {
      ...bookingData,
      [type]: newValue
    };
    
    if (selectTour) {
      const total = calculateTotalAmount(
        type === 'AdultQuantity' ? newValue : updatedBooking.AdultQuantity,
        type === 'ChildQuantity' ? newValue : updatedBooking.ChildQuantity,
        type === 'InfantQuantity' ? newValue : updatedBooking.InfantQuantity,
        selectTour.price
      );
      updatedBooking.TotalAmount = total;
    }
    
    setBookingData(updatedBooking);
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookTour = async () => {
    if (bookingData.AdultQuantity + bookingData.ChildQuantity + bookingData.InfantQuantity === 0) {
      toast.error("Please select at least one passenger");
      return;
    }
    setShowContactModal(true);
  };



const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const fullBookingData = {
            ...bookingData,
            ...contactInfo
        };
        
        const bookingResponse = await BookingService.createBooking(fullBookingData);
        console.log('Booking Response:', bookingResponse);
        
        if (!bookingResponse?.bookingID) {
            throw new Error('Failed to create booking');
        }

        // 2. Khởi tạo thanh toán
        const paymentResponse = await BookingService.initiatePayment(bookingResponse.bookingID); 
        console.log('Payment Response:', paymentResponse);

        if (paymentResponse?.paymentUrl) {
          localStorage.setItem('pendingBookingId', bookingResponse.bookingID);
          window.location.href = paymentResponse.paymentUrl;
      } else {
          throw new Error('Invalid payment URL received');
      }
    } catch (error) {
      console.error('Booking/Payment Error:', error);
      toast.error(error.message || "Booking failed. Please try again.")
        
        
        
    } finally {
        setIsLoading(false);
    }
};

// Thêm useEffect để xử lý callback từ PayPal
useEffect(() => {
    const paymentToken = searchParams.get('token');
    const pendingBookingId = localStorage.getItem('pendingBookingId');
    
    if (paymentToken && pendingBookingId) {
        const completePayment = async () => {
            try {
                await PaymentService.capturePayment(paymentToken, pendingBookingId);
                toast.success('Payment completed successfully!');
                localStorage.removeItem('pendingBookingId');
                navigate('/booking-confirmation'); // hoặc trang success khác
            } catch (error) {
                console.error('Payment completion error:', error);
                toast.error('Payment failed. Please try again.');
                navigate('/payment-failed'); // hoặc trang error khác
            }
        };
        
        completePayment();
    }
}, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Right side - Price Summary & Booking Form */}
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 ml-auto">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Price Summary</h2>
      </div>

      <div className="mt-6 space-y-4">
        {/* Passenger Selection */}
        <div className="space-y-3">
          {/* Adult */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-sm text-gray-500">Age 13+</p>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={bookingData.AdultQuantity}
              onChange={(e) => handleQuantityChange('AdultQuantity', e.target.value)}
              className="w-20 p-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Child */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaChild className="text-gray-500" />
              <div>
                <p className="font-medium">Children</p>
                <p className="text-sm text-gray-500">Age 2-12</p>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={bookingData.ChildQuantity}
              onChange={(e) => handleQuantityChange('ChildQuantity', e.target.value)}
              className="w-20 p-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Infant */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaBaby className="text-gray-500" />
              <div>
                <p className="font-medium">Infants</p>
                <p className="text-sm text-gray-500">Under 2</p>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={bookingData.InfantQuantity}
              onChange={(e) => handleQuantityChange('InfantQuantity', e.target.value)}
              className="w-20 p-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 mt-4 space-y-3">
        <div className="border-t pt-4 mt-4 space-y-3">
  <div className="flex items-center justify-between">
    <p className="text-gray-600">Adult Price</p>
    <p className="font-semibold tabular-nums">
      ${(selectTour?.price * bookingData.AdultQuantity).toFixed(2)}
    </p>
  </div>
  
  <div className="flex items-center justify-between">
    <p className="text-gray-600">Children Price</p>
    <p className="font-semibold tabular-nums">
      ${(selectTour?.price * 0.75 * bookingData.ChildQuantity).toFixed(2)}
    </p>
  </div>
  
  <div className="flex items-center justify-between">
    <p className="text-gray-600">Infant Price</p>
    <p className="font-semibold tabular-nums">
      ${(selectTour?.price * 0.1 * bookingData.InfantQuantity).toFixed(2)}
    </p>
  </div>
</div>
          
       
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-lg font-semibold text-primary-600">${bookingData.TotalAmount}</p>
          </div>
        </div>
      </div>

      <button
  onClick={handleBookTour}
  disabled={bookingData.AdultQuantity + bookingData.ChildQuantity + bookingData.InfantQuantity === 0}
  className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
>
  Continue to Book
</button>

      {/* Optional: Add note */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        <FaInfoCircle className="inline mr-1" />
        Prices are inclusive of all taxes
      </p>
    </div>
  </div>
  <Transition appear show={showContactModal} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={() => setShowContactModal(false)}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              Contact Information
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Please fill in your contact details to complete the booking.
              </p>
            </div>

            <form onSubmit={handleSubmitBooking} className="mt-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={contactInfo.fullName}
                  onChange={handleContactInfoChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="Your phone number"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequirements"
                  value={contactInfo.specialRequirements}
                  onChange={handleContactInfoChange}
                  rows="3"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="Any special requests or requirements?"
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
  <button
    type="button"
    className="flex-1 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
    onClick={() => setShowContactModal(false)}
  >
    Cancel
  </button>
  <button
    type="submit"
    disabled={isLoading}
    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </div>
    ) : (
      "Proceed to Payment"
    )}
  </button>
</div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
  
</div>
  );
}
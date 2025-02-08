import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingService from "@/services/BookingService";
import PaymentService from "@/services/PaymentService";
import { useUser } from "@/contexts/UserProvider";
import 'react-toastify/dist/ReactToastify.css';

export default function PassengerForms() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, tour } = location.state || {};

  const [bookingDetails, setBookingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardIdentification: "",
    specialRequirements: ""
  });

  const validateBookingDetails = () => {
    if (!bookingDetails.fullName || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.cardIdentification) {
      toast.error("Please complete all required fields");
      return false;
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateBookingDetails()) return;

    toast.success("Processing your booking...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    try {
      const adultQuantity = parseInt(bookingData.AdultQuantity);
      const childQuantity = parseInt(bookingData.ChildQuantity);
      const infantQuantity = parseInt(bookingData.InfantQuantity || 0);
      const price = parseFloat(tour.price);
      const adultTotal = adultQuantity * price;
    const childTotal = childQuantity * (price * 0.75);
    const infantTotal = infantQuantity * (price * 0.1);
    const calculatedTotalAmount = adultTotal + childTotal + infantTotal;
    console.log('Payment Calculations:', {
      adultQuantity,
      childQuantity,
      infantQuantity,
      price,
      adultTotal,
      childTotal,
      infantTotal,
      calculatedTotalAmount
    });

    const bookingRequest = {
      UserID: user.id,
      TourID: tour.tourId,
      AdultQuantity: adultQuantity,
      ChildQuantity: childQuantity,
      InfantQuantity: infantQuantity,
      AdultUnitPrice: price,
      ChildUnitPrice: price * 0.75,
      InfantUnitPrice: price * 0.1,
      TotalAmount: calculatedTotalAmount,
      FullName: bookingDetails.fullName,
      Email: bookingDetails.email,
      Phone: bookingDetails.phone,
      CardIdentification: bookingDetails.cardIdentification,
      SpecialRequirements: bookingDetails.specialRequirements || ""
    };

    console.log('Sending booking request:', bookingRequest);

      const bookingResponse = await BookingService.createBooking(bookingRequest);
      console.log('Booking response:', bookingResponse);

      if (bookingResponse?.bookingID) {
        const paymentResponse = await PaymentService.initiatePayment(bookingResponse.bookingID);
        console.log('Payment response:', paymentResponse);

        if (paymentResponse?.paymentUrl) {
          window.location.href = paymentResponse.paymentUrl;
        } else {
          throw new Error("Invalid payment initiation response");
        }
      } else {
        throw new Error("Invalid booking response structure");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to process your request");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-3">
            Complete Your Booking
          </h2>
          <p className="text-gray-600 text-lg">Enter your details to finalize your journey</p>
        </div>

        {/* Enhanced Booking Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <span className="bg-primary/10 p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Booking Details
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tour Information */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-white rounded-lg p-4 shadow-sm transition-all hover:shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Tour Information</h4>
                <div className="space-y-3">
                <div className="flex justify-between items-center">
  <span className="text-gray-600">Tour Name:</span>
  <span className="font-medium text-gray-900">
    {tour?.tourName || "Tour name not available"}
  </span>
</div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Adults:</span>
                    <span className="font-medium text-gray-900">{bookingData?.AdultQuantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Children:</span>
                    <span className="font-medium text-gray-900">{bookingData?.ChildQuantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Infants:</span>
                    <span className="font-medium text-gray-900">{bookingData?.InfantQuantity || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="bg-white rounded-lg p-4 shadow-sm transition-all hover:shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Adult Price:</span>
                    <span className="font-medium text-gray-900">${tour.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Child Price (75%):</span>
                    <span className="font-medium text-gray-900">${(tour.price * 0.75).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Infant Price (10%):</span>
                    <span className="font-medium text-gray-900">${(tour.price * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-primary">Total Amount:</span>
                      <span className="font-bold text-primary">${bookingData?.TotalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Personal Information Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <span className="bg-primary/10 p-3 rounded-xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Personal Information
              </span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-medium block mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={bookingDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium block mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium block mb-2">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="cardIdentification" className="text-gray-700 font-medium block mb-2">
                    ID Card/Passport *
                  </Label>
                  <Input
                    id="cardIdentification"
                    value={bookingDetails.cardIdentification}
                    onChange={(e) => handleInputChange("cardIdentification", e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter ID/Passport number"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="specialRequirements" className="text-gray-700 font-medium block mb-2">
                  Special Requirements
                </Label>
                <Textarea
                  id="specialRequirements"
                  value={bookingDetails.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  className="w-full min-h-[120px] rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Any special requirements or notes (e.g., dietary restrictions, accessibility needs)"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex justify-between items-center pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Button>
            <Button 
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 flex items-center"
            >
              Proceed to Payment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
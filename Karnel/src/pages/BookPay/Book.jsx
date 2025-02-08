import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser, FaChild, FaBaby } from "react-icons/fa";
import { useUser } from "@/contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Book({ tour }) {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState({
    AdultQuantity: 0,
    ChildQuantity: 0,
    InfantQuantity: 0,
    TotalAmount: 0
  });

  const calculateTotal = (quantities) => {
    if (!tour?.price) return 0;
    const { AdultQuantity, ChildQuantity, InfantQuantity } = quantities;
    return (
      AdultQuantity * tour.price +
      ChildQuantity * (tour.price * 0.75) +
      InfantQuantity * (tour.price * 0.1)
    );
  };

  const handleQuantityChange = (type, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    const updatedBooking = {
      ...bookingData,
      [type]: newValue
    };
    const total = calculateTotal(updatedBooking);
    setBookingData({
      ...updatedBooking,
      TotalAmount: total
    });
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book a tour");
      navigate("/login");
      return;
    }
  
    const totalPassengers =
      bookingData.AdultQuantity +
      bookingData.ChildQuantity +
      bookingData.InfantQuantity;
  
    if (totalPassengers === 0) {
      toast.error("Please select at least one passenger");
      return;
    }
  
    if (totalPassengers > tour.availableSlots) {
      toast.error(`Only ${tour.availableSlots} slots available`);
      return;
    }
  
    const adultTotal = bookingData.AdultQuantity * tour.price;
    const childTotal = bookingData.ChildQuantity * (tour.price * 0.75);
    const infantTotal = (bookingData.InfantQuantity || 0) * (tour.price * 0.1);
    const calculatedTotal = adultTotal + childTotal + infantTotal;
    console.log('Booking Calculations:', {
      adultTotal,
      childTotal,
      infantTotal,
      calculatedTotal,
      bookingData,
      tour
    });
    navigate("/passenger-info", {
      state: {
        bookingData: {
          ...bookingData,
          AdultQuantity: parseInt(bookingData.AdultQuantity),
          ChildQuantity: parseInt(bookingData.ChildQuantity),
          InfantQuantity: parseInt(bookingData.InfantQuantity || 0),
          TotalAmount: calculatedTotal,
          AdultUnitPrice: tour.price,
          ChildUnitPrice: tour.price * 0.75,
          InfantUnitPrice: tour.price * 0.1,
          UserID: user.id 
        },
        tour: {
          tourId: tour.tourId || tour.id,
          tourName: tour.tourName || tour.name, 
          price: parseFloat(tour.price)
        }
      }
    });
  };

  const PassengerInput = ({ icon, label, subLabel, type, value }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-500">{subLabel}</p>
        </div>
      </div>
      <Input
        type="number"
        min="0"
        value={value}
        onChange={(e) => handleQuantityChange(type, e.target.value)}
        className="w-20 text-center"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <PassengerInput
          icon={<FaUser />}
          label="Adults"
          subLabel="Age 13+"
          type="AdultQuantity"
          value={bookingData.AdultQuantity}
        />
        <PassengerInput
          icon={<FaChild />}
          label="Children"
          subLabel="Age 2-12"
          type="ChildQuantity"
          value={bookingData.ChildQuantity}
        />
        <PassengerInput
          icon={<FaBaby />}
          label="Infants"
          subLabel="Under 2"
          type="InfantQuantity"
          value={bookingData.InfantQuantity}
        />
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Adult Price</span>
          <span>${(tour?.price * bookingData.AdultQuantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Children Price</span>
          <span>${(tour?.price * 0.75 * bookingData.ChildQuantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Infant Price</span>
          <span>${(tour?.price * 0.1 * bookingData.InfantQuantity).toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-b py-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total Amount</span>
          <span className="font-semibold text-primary">
            ${bookingData.TotalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleBookNow}
        disabled={!bookingData.TotalAmount}
      >
        Continue to Book
      </Button>
    </div>
  );
}
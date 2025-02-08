import React, { useState, useEffect } from 'react';
import BookingService from '@/services/BookingService';

export default function BookingList({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await BookingService.getUserBookings(userId);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{booking.tourName}</h4>
                <p>Booking ID: {booking.bookingID}</p>
                <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Status: {booking.status}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Total: ${booking.totalAmount}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5128/api/Auth');
        // Filter users to only show those with role "User"
        const filteredUsers = response.data.filter(user => user.role === "USER");
        setUsers(filteredUsers);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserBookings = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5128/api/Booking/user/${userId}`);
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch user bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchUserBookings(user.id);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {loading && !selectedUser ? (
            <p>Loading users...</p>
          ) : users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500"> Email: {user.email}</p>
                    </div>
              
                  </div>
                  
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {/* Bookings Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedUser ? `Bookings for ${selectedUser.name}` : 'User Bookings'}
          </h2>
          
          {selectedUser ? (
            loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.bookingId} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg"> Name: {booking.tourName}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        booking.paymentStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>Booking Date: {formatDate(booking.bookingDate)}</p>
                        <p>Total Amount: {formatCurrency(booking.totalAmount)}</p>
                      </div>
                      <div>
                        <p>Passengers:</p>
                        <ul>
                          <li>Adults: {booking.adultQuantity}</li>
                          <li>Children: {booking.childQuantity}</li>
                          <li>Infants: {booking.infantQuantity}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No bookings found for this user.</p>
            )
          ) : (
            <p>Select a user to view their bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
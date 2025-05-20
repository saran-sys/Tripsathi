import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/v1/admin/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/api/v1/admin/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending' },
      confirmed: { color: 'success', text: 'Confirmed' },
      cancelled: { color: 'danger', text: 'Cancelled' },
      completed: { color: 'info', text: 'Completed' }
    };

    const config = statusConfig[status] || { color: 'secondary', text: status };
    return (
      <Badge color={config.color} className="status-badge">
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="admin-card">
      <h4 className="mb-4">Booking Management</h4>
      <Table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Tour</th>
            <th>Date</th>
            <th>Guests</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user?.username}</td>
              <td>{booking.tour?.title}</td>
              <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
              <td>{booking.guestSize}</td>
              <td>${booking.totalAmount}</td>
              <td>{getStatusBadge(booking.status)}</td>
              <td>
                {booking.status === 'pending' && (
                  <>
                    <Button
                      color="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => handleStatusUpdate(booking._id, 'completed')}
                  >
                    Mark Complete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingManagement; 
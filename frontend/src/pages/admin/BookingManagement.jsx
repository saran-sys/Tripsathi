import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import '../../styles/admin/booking-management.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result = await res.json();
      setBookings(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        throw new Error('Failed to update booking status');
      }

      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to delete booking');
      }

      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <h4 className="text-center pt-5">Loading.....</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  return (
    <section className="booking-management">
      <Container>
        <Row>
          <Col lg="12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Booking Management</h2>
              <Button 
                className="btn primary__btn"
                onClick={() => navigate('/admin/dashboard')}
              >
                <i className="ri-arrow-left-line me-2"></i>
                Back to Dashboard
              </Button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center">
                <h4>No bookings found</h4>
              </div>
            ) : (
              <div className="booking__list">
                {bookings.map(booking => (
                  <Card key={booking._id} className="booking__item">
                    <div className="booking__header">
                      <div className="booking__tour">
                        <img src={booking.tour.photo} alt={booking.tour.title} />
                        <div>
                          <h5>{booking.tour.title}</h5>
                          <p className="text-muted">
                            <i className="ri-map-pin-line me-2"></i>
                            {booking.tour.city}
                          </p>
                        </div>
                      </div>
                      <Badge className={`status status-${booking.status}`}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="booking__details">
                      <div className="booking__user">
                        <h6>User Information</h6>
                        <div className="user__info">
                          <img src={booking.user.photo || '/images/default-avatar.png'} alt={booking.user.username} />
                          <div>
                            <p><strong>Name:</strong> {booking.user.username}</p>
                            <p><strong>Email:</strong> {booking.user.email}</p>
                            <p><strong>Phone:</strong> {booking.user.phone || 'N/A'}</p>
                            <p><strong>Joined:</strong> {new Date(booking.user.joinedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="booking__info">
                        <h6>Booking Information</h6>
                        <p><strong>Booking ID:</strong> {booking._id}</p>
                        <p><strong>Booking Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
                        <p><strong>Guests:</strong> {booking.guestsSize}</p>
                        <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                        <p><strong>Created:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>

                      <div className="booking__tour-info">
                        <h6>Tour Information</h6>
                        <p><strong>Price:</strong> ${booking.tour.price}</p>
                        <p><strong>Max Group Size:</strong> {booking.tour.maxGroupSize}</p>
                        <p><strong>Rating:</strong> {booking.tour.rating.toFixed(1)} ⭐</p>
                        <p><strong>Featured:</strong> {booking.tour.featured ? 'Yes' : 'No'}</p>
                      </div>
                    </div>

                    <div className="booking__actions">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            className="btn success__btn"
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                          >
                            Confirm Booking
                          </Button>
                          <Button
                            className="btn danger__btn"
                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                          >
                            Cancel Booking
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          className="btn success__btn"
                          onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        >
                          Mark as Complete
                        </Button>
                      )}
                      <Button
                        className="btn danger__btn"
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Delete Booking
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookingManagement; 
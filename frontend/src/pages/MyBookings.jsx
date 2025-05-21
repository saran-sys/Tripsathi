import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import Payment from '../components/Payment/Payment';
import '../styles/my-bookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
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

  const handlePaymentSuccess = () => {
    setSelectedBooking(null);
    fetchBookings();
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to cancel booking');
      }

      // Refresh bookings after cancellation
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkAsComplete = async (bookingId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${bookingId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to mark booking as complete');
      }

      // Refresh bookings after marking as complete
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <h4 className="text-center pt-5">Loading.....</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;

  if (selectedBooking) {
    return (
      <Payment 
        booking={selectedBooking}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setSelectedBooking(null)}
      />
    );
  }

  return (
    <section className="my-bookings">
      <Container>
        <Row>
          <Col lg="12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>My Bookings</h2>
              <Button 
                className="btn primary__btn"
                onClick={() => navigate('/dashboard')}
              >
                <i className="ri-arrow-left-line me-2"></i>
                Back to Dashboard
              </Button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center">
                <h4>No bookings found</h4>
                <Button className="btn primary__btn mt-3" onClick={() => navigate('/tours')}>
                  Book a Tour
                </Button>
              </div>
            ) : (
              <div className="booking__list">
                {bookings.map(booking => (
                  <div key={booking._id} className="booking__item">
                    <div className="booking__img">
                      <img src={booking.tourId?.photo} alt={booking.tourId?.title} />
                    </div>
                    <div className="booking__content">
                      <h5>{booking.tourId?.title}</h5>
                      <div className="booking__info">
                        <h6>Booking ID: {booking._id}</h6>
                        <h6>Guest Name: {booking.fullName}</h6>
                        <h6>Booking Date: {new Date(booking.bookAt).toLocaleDateString()}</h6>
                        <h6>Number of Guests: {booking.guestsSize}</h6>
                        <h6>Total Amount: ${booking.totalAmount}</h6>
                        <h6>Status: <span className={`status status-${booking.status}`}>{booking.status}</span></h6>
                      </div>
                      {booking.status === 'pending' && (
                        <Button 
                          className="btn primary__btn w-100 mt-4"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          Proceed to Payment
                        </Button>
                      )}
                      {booking.status === 'pending' && (
                        <Button
                          className="btn danger__btn mt-3"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          className="btn success__btn mt-3"
                          onClick={() => handleMarkAsComplete(booking._id)}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MyBookings; 
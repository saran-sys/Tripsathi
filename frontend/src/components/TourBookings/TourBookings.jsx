import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'reactstrap';
import './tour-bookings.css';
import { BASE_URL } from '../../utils/config';
import useFetch from '../../hooks/useFetch';

const TourBookings = () => {
  const { data: bookings, loading, error } = useFetch(`${BASE_URL}/tour-bookings/current`);
  
  // Mock data in case API is not available
  const mockBookings = [
    {
      _id: "1",
      destination: "Everest Base Camp",
      startDate: "2024-04-15",
      endDate: "2024-04-20",
      status: "confirmed",
      totalPrice: 1500,
      numberOfPeople: 2
    },
    {
      _id: "2",
      destination: "Annapurna Circuit",
      startDate: "2024-05-01",
      endDate: "2024-05-10",
      status: "pending",
      totalPrice: 2000,
      numberOfPeople: 3
    },
    {
      _id: "3",
      destination: "Langtang Valley",
      startDate: "2024-06-01",
      endDate: "2024-06-07",
      status: "confirmed",
      totalPrice: 1200,
      numberOfPeople: 1
    }
  ];

  // Use mock data if API is not available
  const displayBookings = bookings || mockBookings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading bookings...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h4>Error loading bookings. Using mock data.</h4>
      </div>
    );
  }

  return (
    <section className="tour-bookings">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h2 className="featured__tour-title">Your Bookings</h2>
          </Col>
          {displayBookings.map(booking => (
            <Col lg="4" md="6" sm="12" key={booking._id} className="mb-4">
              <Card className="booking__card">
                <div className="booking__img">
                  <img src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" alt="" />
                </div>
                <div className="booking__content">
                  <h5 className="booking__title">{booking.destination}</h5>
                  <div className="booking__info">
                    <p>
                      <i className="ri-calendar-line"></i> {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                    </p>
                    <p>
                      <i className="ri-user-line"></i> {booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'Person' : 'People'}
                    </p>
                    <p>
                      <i className="ri-money-dollar-circle-line"></i> ${booking.totalPrice}
                    </p>
                    <p>
                      <i className="ri-fingerprint-line"></i> Booking ID: {booking._id}
                    </p>
                  </div>
                  <div className="booking__bottom d-flex align-items-center justify-content-between mt-3">
                    <Badge color={getStatusColor(booking.status)} className="booking__status">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <button className="btn primary__btn">View Details</button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TourBookings; 
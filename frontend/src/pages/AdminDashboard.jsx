import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/admin-dashboard.css';
import UserManagement from '../components/admin/UserManagement';
import BookingManagement from '../components/admin/BookingManagement';
import TourManagement from '../components/admin/TourManagement';
import ReviewManagement from '../components/admin/ReviewManagement';
import DestinationManagement from './admin/DestinationManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'tours':
        return <TourManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'destinations':
        return <DestinationManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <Row>
          <Col md={3} className="admin-sidebar">
            <div className="admin-header">
              <h3>Admin Dashboard</h3>
            </div>
            <nav className="admin-nav">
              <ul>
                <li>
                  <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                  >
                    User Management
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'bookings' ? 'active' : ''}
                    onClick={() => setActiveTab('bookings')}
                  >
                    Booking Management
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'tours' ? 'active' : ''}
                    onClick={() => setActiveTab('tours')}
                  >
                    Tour Management
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'reviews' ? 'active' : ''}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Review Management
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === 'destinations' ? 'active' : ''}
                    onClick={() => setActiveTab('destinations')}
                  >
                    Destination Management
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
          <Col md={9} className="admin-content">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard; 
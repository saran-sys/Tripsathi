import React, { useState } from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import '../styles/user-dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TourBookings from '../components/TourBookings/TourBookings';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { user } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      message: "Your booking for Everest Base Camp Trek is confirmed",
      date: "2024-05-20",
      read: false
    },
    {
      id: 2,
      message: "Payment received for Mardi Trek",
      date: "2024-05-19",
      read: true
    }
  ];

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <CommonSection title="User Dashboard" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="12">
              <div className="dashboard__nav">
                <div className="user__info">
                  <div className="user__avatar">
                    <img src={user?.photo || "https://via.placeholder.com/150"} alt="user avatar" />
                  </div>
                  <h5>{user?.username}</h5>
                  <p>{user?.email}</p>
                </div>
                <Nav className="dashboard__menu">
                  <NavItem>
                    <NavLink
                      className={`dashboard__tab ${activeTab === 'bookings' ? 'active' : ''}`}
                      onClick={() => toggleTab('bookings')}
                    >
                      <i className="ri-calendar-check-line"></i> My Bookings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`dashboard__tab ${activeTab === 'past-trips' ? 'active' : ''}`}
                      onClick={() => toggleTab('past-trips')}
                    >
                      <i className="ri-history-line"></i> Past Trips
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`dashboard__tab ${activeTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => toggleTab('notifications')}
                    >
                      <i className="ri-notification-3-line"></i> Notifications
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col lg="9" md="8" sm="12">
              <div className="dashboard__content">
                {activeTab === 'bookings' && (
                  <div className="bookings__tab">
                    <TourBookings />
                  </div>
                )}

                {activeTab === 'past-trips' && (
                  <div className="past-trips__tab">
                    <h4>Past Trips</h4>
                    <p>Your past trips will appear here.</p>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="notifications__tab">
                    <h4>Notifications</h4>
                    <div className="notifications__list">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`notification__item ${!notification.read ? 'unread' : ''}`}>
                          <div className="notification__content">
                            <p>{notification.message}</p>
                            <span className="notification__date">{notification.date}</span>
                          </div>
                          {!notification.read && <span className="notification__badge"></span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserDashboard; 
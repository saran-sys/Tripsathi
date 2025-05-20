import React, { useState, useEffect } from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import '../styles/user-dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      message: "Your booking for Everest Base Camp Trek is confirmed",
      date: "2024-05-20",
      read: false,
      type: "success"
    },
    {
      id: 2,
      message: "Payment received for Mardi Trek",
      date: "2024-05-19",
      read: true,
      type: "info"
    }
  ];

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const togglePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
    if (!isPasswordModalOpen) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Password updated successfully!');
        togglePasswordModal();
      } else {
        toast.error(result.message || 'Failed to update password');
      }
    } catch (error) {
      toast.error('Error updating password');
      console.error('Error:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email,
          phone: profileData.phone
        })
      });

      const result = await response.json();

      if (result.success) {
        updateUser(result.data);
        toast.success('Profile updated successfully!');
        toggleProfileModal();
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating profile');
      console.error('Error:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <CommonSection title="User Dashboard" />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="dashboard__section">
        <Container>
          <Row>
            <Col lg="3" md="4" sm="12">
              <motion.div 
                className="dashboard__nav"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="user__info">
                  <div className="user__avatar">
                    <img src={user?.photo || "https://via.placeholder.com/150"} alt="user avatar" />
                    <div className="user__status"></div>
                  </div>
                  <h5>{user?.username}</h5>
                  <p>{user?.email}</p>
                  <div className="user__stats">
                    <div className="stat__item">
                      <span className="stat__number">{notifications.filter(n => !n.read).length}</span>
                      <span className="stat__label">Notifications</span>
                    </div>
                  </div>
                </div>
                <Nav className="dashboard__menu">
                  <NavItem>
                    <NavLink
                      className={`dashboard__tab ${activeTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => toggleTab('notifications')}
                    >
                      <i className="ri-notification-3-line"></i> Notifications
                      {notifications.filter(n => !n.read).length > 0 && (
                        <span className="notification__count">
                          {notifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="dashboard__tab"
                      onClick={() => navigate('/my-bookings')}
                    >
                      <i className="ri-book-2-line"></i> All Bookings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`dashboard__tab ${activeTab === 'settings' ? 'active' : ''}`}
                      onClick={() => toggleTab('settings')}
                    >
                      <i className="ri-settings-4-line"></i> Settings
                    </NavLink>
                  </NavItem>
                </Nav>
              </motion.div>
            </Col>
            <Col lg="9" md="8" sm="12">
              <motion.div 
                className="dashboard__content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {activeTab === 'notifications' && (
                  <div className="notifications__tab">
                    <div className="tab__header">
                      <h4>Notifications</h4>
                      <button className="btn btn-outline-primary btn-sm">
                        Mark All as Read
                      </button>
                    </div>
                    <div className="notifications__list">
                      {notifications.map(notification => (
                        <motion.div 
                          key={notification.id} 
                          className={`notification__item ${!notification.read ? 'unread' : ''} ${notification.type}`}
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <div className="notification__icon">
                            <i className={`ri-${notification.type === 'success' ? 'check-double-line' : 'information-line'}`}></i>
                          </div>
                          <div className="notification__content">
                            <p>{notification.message}</p>
                            <span className="notification__date">
                              <i className="ri-time-line"></i>
                              {notification.date}
                            </span>
                          </div>
                          {!notification.read && <span className="notification__badge"></span>}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="settings__tab">
                    <div className="tab__header">
                      <h4>Account Settings</h4>
                    </div>
                    <div className="settings__grid">
                      <motion.div 
                        className="settings__card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        onClick={toggleProfileModal}
                      >
                        <div className="settings__icon">
                          <i className="ri-user-settings-line"></i>
                        </div>
                        <div className="settings__content">
                          <h5>Personal Information</h5>
                          <p>Update your profile details</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="settings__card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        onClick={togglePasswordModal}
                      >
                        <div className="settings__icon">
                          <i className="ri-lock-password-line"></i>
                        </div>
                        <div className="settings__content">
                          <h5>Change Password</h5>
                          <p>Update your account password</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Password Change Modal */}
      <Modal isOpen={isPasswordModalOpen} toggle={togglePasswordModal} centered>
        <ModalHeader toggle={togglePasswordModal}>Change Password</ModalHeader>
        <Form onSubmit={handlePasswordChange}>
          <ModalBody>
            <FormGroup>
              <Label for="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={togglePasswordModal}>Cancel</Button>
            <Button color="primary" type="submit">Update Password</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Profile Update Modal */}
      <Modal isOpen={isProfileModalOpen} toggle={toggleProfileModal} centered>
        <ModalHeader toggle={toggleProfileModal}>Update Profile</ModalHeader>
        <Form onSubmit={handleProfileUpdate}>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleProfileModal}>Cancel</Button>
            <Button color="primary" type="submit">Update Profile</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default UserDashboard; 
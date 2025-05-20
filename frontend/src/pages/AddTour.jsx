import React from 'react';
import axios from 'axios';
import TourForm from '../components/TourForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AddTour.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1';

const AddTour = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddTour = async (data) => {
    try {
      if (!user) {
        alert('Please login to add a tour');
        navigate('/login');
        return;
      }

      const response = await axios.post(`${BASE_URL}/tours`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.data.success) {
        alert('Tour added successfully!');
        navigate('/tours'); // Redirect to tours list page
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add tour. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="add-tour-container">
      <h2>Add New Tour</h2>
      <TourForm onSubmit={handleAddTour} />
    </div>
  );
};

export default AddTour; 
import React from 'react';
import axios from 'axios';
import TourForm from '../components/TourForm';
import { useNavigate } from 'react-router-dom';
import './AddTour.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1';

const AddTour = () => {
  const navigate = useNavigate();

  const handleAddTour = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/tours`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
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
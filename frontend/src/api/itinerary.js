import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1';

// Create new itinerary
export const createItinerary = async (itineraryData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/itinerary`,
      itineraryData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create itinerary');
  }
};

// Get user's itineraries
export const getUserItineraries = async (userId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/itinerary/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch itineraries');
  }
};

// Get single itinerary
export const getItinerary = async (idOrSlug, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/itinerary/${idOrSlug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch itinerary');
  }
};

// Update itinerary
export const updateItinerary = async (id, itineraryData, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/itinerary/${id}`,
      itineraryData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update itinerary');
  }
};

// Delete itinerary
export const deleteItinerary = async (id, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/itinerary/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete itinerary');
  }
}; 
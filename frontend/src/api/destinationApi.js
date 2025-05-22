import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/destinations';

export const getAllDestinations = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch destinations');
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch destination');
  }
};

export const createDestination = async (destinationData) => {
  try {
    const response = await axios.post(API_BASE_URL, destinationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create destination');
  }
};

export const updateDestination = async (id, destinationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, destinationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update destination');
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete destination');
  }
}; 
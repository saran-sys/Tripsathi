import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/weather';

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${latitude}/${longitude}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
}; 
import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY;

// Route: /api/weather/:lat/:lon
router.get('/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  
  if (!API_KEY) {
    console.error('Weather API key is missing');
    return res.status(500).json({ 
      message: 'Weather API configuration error', 
      error: 'API key is not configured' 
    });
  }

  try {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'WeatherAPI error', 
      error: error.response?.data?.error?.message || error.message 
    });
  }
});

export default router;

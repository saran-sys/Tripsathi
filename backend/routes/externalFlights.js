// routes/externalFlights.js
import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    
    const response = await axios.get('https://api.aviationstack.com/v1/flights', {
      params: {
        access_key: 'efa3de6aa10caf420f7aacab1a61c67d',
        // dep_iata: departure,
        // arr_iata: arrival,
        // flight_date: date
      }
    });
    console.log(response.data);

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'External API error', error: error.message });
  }
});

export default router;

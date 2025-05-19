const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tourRoutes = require('./routes/tours');
const bookingRoutes = require('./routes/bookings');
const itineraryRoutes = require('./routes/itinerary');

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 
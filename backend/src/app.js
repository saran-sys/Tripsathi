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
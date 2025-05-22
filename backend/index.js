import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tour.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import externalFlights from './routes/externalFlights.js';
import tourBookingRoute from './routes/tourBookingRoutes.js';
import itineraryRoute from './routes/itinerary.js';
import adminRoute from './routes/admin.js';
import groqRoute from './routes/groq.js';
import weatherRoutes from './routes/weather.js';
import destinationRoutes from './routes/destinationRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database not connected");
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/tour-bookings", tourBookingRoute);
app.use('/api/external-flights', externalFlights);
app.use('/api/v1/itinerary', itineraryRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/groq', groqRoute);
app.use('/api/weather', weatherRoutes);
app.use('/api/destinations', destinationRoutes);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(port, () => {
  connect();
  console.log("Server listing on port", port);
});
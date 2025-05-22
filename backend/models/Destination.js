// backend/models/Destination.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const destinationSchema = new mongoose.Schema({
  destinationId: {
    type: String,
    default: uuidv4, // auto-generate unique ID
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  },
  bestTimeToVisit: {
    type: String,
    required: true,
  },
  activities: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
    enum: ['adventure', 'cultural', 'romantic', 'relaxing', 'nature', 'other'],
    default: 'other',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Destination', destinationSchema);

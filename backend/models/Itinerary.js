// models/Itinerary.js
import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  destinations: [{
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    }
  }],
  sharedSlug: {
    type: String,
    unique: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);

export default Itinerary;

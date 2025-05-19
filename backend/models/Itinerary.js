// models/Itinerary.js
import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: String,
  description: String,
  destinations: [String],
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

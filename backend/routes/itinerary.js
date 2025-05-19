// // routes/itinerary.js
import express from 'express';
import {
  createItinerary,
  getUserItineraries,
  getSingleItinerary,
  updateItinerary
} from '../controllers/itineraryController.js';

const router = express.Router();

router.post('/', createItinerary);
router.get('/user/:userId', getUserItineraries);
router.get('/:idOrSlug', getSingleItinerary);
router.put('/:id', updateItinerary);

export default router;

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItinerary,
  getUserItineraries,
  getSingleItinerary,
  updateItinerary,
} from '../controllers/itineraryController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/', createItinerary);
router.get('/user', getUserItineraries);
router.get('/:idOrSlug', getSingleItinerary);
router.put('/:id', updateItinerary);

export default router;

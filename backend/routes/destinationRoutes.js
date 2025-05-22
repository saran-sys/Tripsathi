// backend/routes/destinationRoutes.js
import express from 'express';
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';

const router = express.Router();

router.post('/', createDestination);
router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;

import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBysearch,
  getFeaturedTour,
  getTourCount,
} from "./../controlles/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//create new tour
router.post("/", protect, createTour);
//update tour
router.put("/:id", protect, updateTour);
// //delete tour

router.delete("/:id", protect, deleteTour);

// //getSingleTour
router.get("/:id", getSingleTour);

// //getAllTour
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBysearch);

// //get tour by search
router.get("/search/getFeaturedTours", getFeaturedTour);
// //get tour by search
router.get("/search/getTourCount", getTourCount);

export default router;

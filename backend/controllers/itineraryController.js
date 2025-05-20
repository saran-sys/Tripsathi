// controllers/itineraryController.js

import Itinerary from '../models/Itinerary.js';
import generateSlug from '../utils/generateSlug.js';

// @desc Create itinerary
export const createItinerary = async (req, res) => {
  try {
    const { title, description, destinations } = req.body;
    const userId = req.user._id; // Get user ID from auth middleware
    const sharedSlug = generateSlug();

    const itinerary = await Itinerary.create({
      userId,
      title,
      description,
      destinations,
      sharedSlug,
    });

    res.status(201).json({
      success: true,
      data: itinerary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create itinerary',
      error: err.message 
    });
  }
};

// @desc Get all itineraries for a user
export const getUserItineraries = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware

    const itineraries = await Itinerary.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: itineraries.length,
      data: itineraries
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch itineraries',
      error: err.message 
    });
  }
};

// @desc Get itinerary by ID or slug
export const getSingleItinerary = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const userId = req.user._id; // Get user ID from auth middleware

    const itinerary = await Itinerary.findOne({
      $or: [
        { _id: idOrSlug, userId },
        { sharedSlug: idOrSlug, isPublic: true }
      ],
    });

    if (!itinerary) {
      return res.status(404).json({ 
        success: false,
        message: 'Itinerary not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch itinerary',
      error: err.message 
    });
  }
};

// @desc Update itinerary
export const updateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Get user ID from auth middleware
    const { title, description, destinations, isPublic } = req.body;

    const updated = await Itinerary.findOneAndUpdate(
      { _id: id, userId },
      { title, description, destinations, isPublic },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false,
        message: 'Itinerary not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update itinerary',
      error: err.message 
    });
  }
};

// @desc Delete itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Get user ID from auth middleware

    const deleted = await Itinerary.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: 'Itinerary not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete itinerary',
      error: err.message 
    });
  }
};

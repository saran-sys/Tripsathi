import Itinerary from '../models/Itinerary.js';
import generateSlug from '../utils/generateSlug.js';
import mongoose from 'mongoose';

// @desc    Create new itinerary
// @route   POST /api/v1/itinerary
// @access  Private
export const createItinerary = async (req, res) => {
  try {
    const { title, description, destinations } = req.body;
    const userId = req.user._id; // From auth middleware

    const sharedSlug = generateSlug();
    
    const itinerary = await Itinerary.create({
      userId,
      title,
      description,
      destinations,
      sharedSlug
    });

    res.status(201).json({
      success: true,
      message: 'Itinerary created successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create itinerary',
      error: error.message
    });
  }
};

// @desc    Get all itineraries for a user
// @route   GET /api/v1/itinerary/user/:userId
// @access  Private
export const getUserItineraries = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching itineraries for user:', userId);

    const itineraries = await Itinerary.find({ userId })
      .sort({ createdAt: -1 });
    
    console.log('Found itineraries:', itineraries.length);

    res.status(200).json({
      success: true,
      count: itineraries.length,
      data: itineraries
    });
  } catch (error) {
    console.error('Error in getUserItineraries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch itineraries',
      error: error.message
    });
  }
};

// @desc    Get single itinerary by ID or slug
// @route   GET /api/v1/itinerary/:idOrSlug
// @access  Private
export const getItinerary = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const userId = req.user._id;

    let query;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      query = { _id: idOrSlug, userId };
    } else {
      query = { 
        $or: [
          { sharedSlug: idOrSlug, userId },
          { sharedSlug: idOrSlug, isPublic: true }
        ]
      };
    }

    const itinerary = await Itinerary.findOne(query);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch itinerary',
      error: error.message
    });
  }
};

// @desc    Update itinerary
// @route   PUT /api/v1/itinerary/:id
// @access  Private
export const updateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { title, description, destinations, isPublic } = req.body;

    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: id, userId },
      { title, description, destinations, isPublic },
      { new: true, runValidators: true }
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Itinerary updated successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update itinerary',
      error: error.message
    });
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/v1/itinerary/:id
// @access  Private
export const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const itinerary = await Itinerary.findOneAndDelete({ _id: id, userId });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete itinerary',
      error: error.message
    });
  }
}; 
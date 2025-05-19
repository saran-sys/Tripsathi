// controllers/itineraryController.js

import Itinerary from '../models/Itinerary.js';
import generateSlug from '../utils/generateSlug.js';
import mongoose from 'mongoose';
// @desc Create itinerary
export const createItinerary = async (req, res) => {
  try {
    const { userId, title, description, destinations } = req.body;
    const sharedSlug = generateSlug();

    const itinerary = await Itinerary.create({
      userId,
      title,
      description,
      destinations,
      sharedSlug,
    });

    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
};

// @desc Get all itineraries for a user
export const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.params.userId });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch itineraries' });
  }
};

// @desc Get itinerary by ID or slug
export const getSingleItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      $or: [
        { _id: req.params.idOrSlug },
        { sharedSlug: req.params.idOrSlug, isPublic: true },
      ],
    });

    if (!itinerary)
      return res.status(404).json({ error: 'Itinerary not found' });

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch itinerary' });
  }
};

// @desc Update itinerary
export const updateItinerary = async (req, res) => {
  try {
    const { title, description, destinations, isPublic } = req.body;

    const updated = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { title, description, destinations, isPublic },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update itinerary' });
  }
};

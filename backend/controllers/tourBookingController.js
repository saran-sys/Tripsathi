import TourBooking from '../models/TourBooking.js';
import Tour from '../models/Tour.js';

// Get current bookings (pending and confirmed)
export const getCurrentBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();

    const currentBookings = await TourBooking.find({
      userId,
      status: { $in: ['pending', 'confirmed'] },
      endDate: { $gte: currentDate }
    }).populate('tourId', 'title photo price');

    res.status(200).json({
      success: true,
      message: 'Current bookings retrieved successfully',
      data: currentBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve current bookings',
      error: error.message
    });
  }
};

// Get past bookings (completed and cancelled)
export const getPastBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();

    const pastBookings = await TourBooking.find({
      userId,
      $or: [
        { status: { $in: ['completed', 'cancelled'] } },
        { endDate: { $lt: currentDate } }
      ]
    }).populate('tourId', 'title photo price');

    res.status(200).json({
      success: true,
      message: 'Past bookings retrieved successfully',
      data: pastBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve past bookings',
      error: error.message
    });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tourId, startDate, endDate, numberOfPeople } = req.body;

    // Get tour details
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Calculate total price
    const totalPrice = tour.price * numberOfPeople;

    const newBooking = await TourBooking.create({
      userId,
      tourId,
      destination: tour.city,
      startDate,
      endDate,
      numberOfPeople,
      totalPrice
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
}; 
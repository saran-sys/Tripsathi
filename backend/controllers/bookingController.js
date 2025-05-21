import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/v1/booking
// @access  Private
export const createBooking = async (req, res) => {
  try {
    // Validate required fields
    const { tourId, userId, userEmail, fullName, phoneNumber, bookAt, guestsSize, totalAmount } = req.body;
    
    if (!tourId || !userId || !userEmail || !fullName || !phoneNumber || !bookAt || !guestsSize || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create the booking
    const booking = await Booking.create({
      tourId,
      userId,
      userEmail,
      fullName,
      phoneNumber,
      bookAt,
      guestsSize,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Tour booked successfully',
      data: booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/v1/bookings/user/:userId
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId })
      .populate('tourId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tourId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/v1/booking/:id
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    const { status, paymentDetails } = req.body;
    
    const updateData = { status };
    if (paymentDetails) {
      updateData.paymentDetails = paymentDetails;
      updateData.paymentDate = new Date();
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('tourId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    });
  }
};

// @desc    Confirm payment and update booking status
// @route   PUT /api/v1/booking/:id/confirm-payment
// @access  Private
export const confirmPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update booking status to confirmed
    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    booking.paymentDate = new Date();
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message
    });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'userId',
        select: 'username email phone photo createdAt'
      })
      .populate({
        path: 'tourId',
        select: 'title price photo city maxGroupSize featured reviews'
      })
      .sort({ createdAt: -1 });

    // Format the response data
    const formattedBookings = bookings.map(booking => ({
      _id: booking._id,
      status: booking.status,
      bookAt: booking.bookAt,
      guestsSize: booking.guestsSize,
      totalAmount: booking.totalAmount,
      createdAt: booking.createdAt,
      user: {
        _id: booking.userId._id,
        username: booking.userId.username,
        email: booking.userId.email,
        phone: booking.userId.phone,
        photo: booking.userId.photo,
        joinedAt: booking.userId.createdAt
      },
      tour: {
        _id: booking.tourId._id,
        title: booking.tourId.title,
        price: booking.tourId.price,
        photo: booking.tourId.photo,
        city: booking.tourId.city,
        maxGroupSize: booking.tourId.maxGroupSize,
        featured: booking.tourId.featured,
        rating: booking.tourId.reviews?.length > 0 
          ? booking.tourId.reviews.reduce((acc, review) => acc + review.rating, 0) / booking.tourId.reviews.length 
          : 0
      }
    }));

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: formattedBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: error.message
    });
  }
};

// Update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'username email')
     .populate('tourId', 'title price');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

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

// Delete booking (admin)
export const deleteBookingAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    });
  }
};

// @desc    Mark booking as complete
// @route   PUT /api/v1/bookings/:id/complete
// @access  Private
export const markAsComplete = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only allow marking confirmed bookings as complete
    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed bookings can be marked as complete'
      });
    }

    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking marked as complete',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark booking as complete',
      error: error.message
    });
  }
}; 
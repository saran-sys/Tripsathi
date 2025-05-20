import Review from '../models/Review.js';
import Tour from '../models/Tour.js';

// @desc    Create new review
// @route   POST /api/v1/review/:tourId
// @access  Private
export const createReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.user._id;

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Check if user has already reviewed this tour
    const existingReview = await Review.findOne({ tourId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this tour'
      });
    }

    // Create new review
    const newReview = new Review({
      userId,
      tourId,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });

    // Save review
    const savedReview = await newReview.save();

    // Update tour's reviews array
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id }
    });

    // Populate user details
    const populatedReview = await Review.findById(savedReview._id)
      .populate('userId', 'username photo');

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: populatedReview
    });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review',
      error: err.message
    });
  }
};

// @desc    Get all reviews for a tour
// @route   GET /api/v1/review/:tourId
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const reviews = await Review.find({ tourId })
      .populate('userId', 'username photo')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reviews',
      error: err.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/v1/review/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner of the review
    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this review'
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        rating: req.body.rating,
        reviewText: req.body.reviewText
      },
      { new: true }
    ).populate('userId', 'username photo');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: err.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/review/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner of the review
    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this review'
      });
    }

    // Remove review from tour's reviews array
    await Tour.findByIdAndUpdate(review.tourId, {
      $pull: { reviews: reviewId }
    });

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: err.message
    });
  }
}; 
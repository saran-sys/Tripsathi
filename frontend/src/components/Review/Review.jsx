import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import './review.css';

const Review = () => {
  const { tourId } = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    reviewText: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/review/${tourId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setReviews(result.data);
      
      // Find user's review if exists
      if (user) {
        const userReview = result.data.find(review => review.userId._id === user._id);
        setUserReview(userReview);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/review/${tourId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...newReview,
          userId: user._id,
          tourId
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setNewReview({ rating: 5, reviewText: '' });
      fetchReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/review/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      fetchReviews();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (reviewId, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/review/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      fetchReviews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="review__container">
      <h3>Reviews</h3>
      
      {error && <div className="review__error">{error}</div>}

      {user && !userReview && (
        <form onSubmit={handleSubmit} className="review__form">
          <div className="form__group">
            <label>Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <div className="form__group">
            <label>Review</label>
            <textarea
              value={newReview.reviewText}
              onChange={(e) => setNewReview(prev => ({ ...prev, reviewText: e.target.value }))}
              placeholder="Write your review here..."
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn primary__btn">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="review__list">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review__card">
              <div className="review__header">
                <div className="review__user">
                  <img src={review.userId.photo || '/default-avatar.png'} alt={review.userId.username} />
                  <span>{review.userId.username}</span>
                </div>
                <div className="review__rating">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < review.rating ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="review__text">{review.reviewText}</p>
              <div className="review__footer">
                <span className="review__date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                {user && review.userId._id === user._id && (
                  <div className="review__actions">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn danger__btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review; 
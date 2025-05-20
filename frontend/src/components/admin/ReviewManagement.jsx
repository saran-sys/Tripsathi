import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/v1/reviews', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setSelectedReview(null);
      setReplyText('');
    }
  };

  const handleReply = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || '');
    setModal(true);
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/api/v1/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/api/v1/reviews/${selectedReview._id}/reply`,
        { reply: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Reply submitted successfully');
      toggleModal();
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit reply');
    }
  };

  return (
    <div className="admin-card">
      <h4 className="mb-4">Review Management</h4>
      <Table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Tour</th>
            <th>Rating</th>
            <th>Review Text</th>
            <th>Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.user?.username}</td>
              <td>{review.tour?.title}</td>
              <td>{review.rating}</td>
              <td>{review.reviewText}</td>
              <td>{review.reply || 'No reply yet'}</td>
              <td>
                <Button
                  color="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleReply(review)}
                >
                  Reply
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Reply to Review</ModalHeader>
        <ModalBody>
          {selectedReview && (
            <div className="mb-4">
              <h6>Review Details:</h6>
              <p><strong>User:</strong> {selectedReview.user?.username}</p>
              <p><strong>Tour:</strong> {selectedReview.tour?.title}</p>
              <p><strong>Rating:</strong> {selectedReview.rating}</p>
              <p><strong>Review:</strong> {selectedReview.reviewText}</p>
            </div>
          )}
          <Form onSubmit={handleSubmitReply}>
            <FormGroup>
              <Label for="reply">Your Reply</Label>
              <Input
                type="textarea"
                name="reply"
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit Reply
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ReviewManagement; 
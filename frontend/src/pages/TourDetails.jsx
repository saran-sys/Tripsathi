import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "./../context/AuthContext";

export default function TourDetails() {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  //fetch data from database
  const { data: tour, loading: tourLoading, error: tourError } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/review/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setReviews(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          rating: tourRating,
          reviewText: reviewMsgRef.current.value
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setTourRating(5);
      reviewMsgRef.current.value = '';
      fetchReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {tourLoading && <h4 className="text-center pt-5">Loading......</h4>}
          {tourError && <h4 className="text-center pt-5">{tourError}</h4>}
          {!tourLoading && !tourError && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt="" />

                  <div className="tour_info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--primary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>

                    <div className="tour_extra-details">
                      <span>
                        <i className="ri-map-pin-fill"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-fill"></i> ${" "}
                        {price} / per person
                      </span>
                      <span>
                        <i className="ri-pin-distance-fill"></i> {distance} km
                      </span>
                      <span>
                        <i className="ri-group-2-fill"></i> {maxGroupSize}{" "}
                        people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* tour review section start */}
                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {user && (
                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <span
                              key={rating}
                              onClick={() => setTourRating(rating)}
                              className={tourRating === rating ? 'active' : ''}
                            >
                              {rating} <i className="ri-star-s-fill"></i>
                            </span>
                          ))}
                        </div>

                        <div className="review_input">
                          <input
                            type="text"
                            ref={reviewMsgRef}
                            placeholder="Share your thoughts"
                            required
                          />
                          <button
                            className="btn primary__btn text-white"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </Form>
                    )}

                    <ListGroup className="user_review">
                      {reviews?.map((review) => (
                        <div key={review._id} className="review_item">
                          <img src={review.userId?.photo || avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.userId?.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* tour review section end */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
}



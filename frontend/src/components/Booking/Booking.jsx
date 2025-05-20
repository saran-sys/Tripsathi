import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, _id: tourId } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    fullName: "",
    phoneNumber: "",
    bookAt: "",
    guestsSize: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError("");
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.guestsSize) + serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) {
      setError("Please login to book a tour");
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        tourId,
        userId: user._id,
        userEmail: user.email,
        fullName: credentials.fullName,
        phoneNumber: credentials.phoneNumber,
        bookAt: credentials.bookAt,
        guestsSize: credentials.guestsSize,
        totalAmount,
      };

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to book tour");
      }

      navigate("/thank-you");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} (
          {reviews?.length} )
        </span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone number"
              id="phoneNumber"
              required
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="number"
              placeholder="Guests"
              id="guestsSize"
              required
              min="1"
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-fill"></i> 1 person{" "}
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charges </h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="total border-0 px-0">
            <h5>Total </h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button
          className="btn primary__btn w-100 mb-1 mt-4"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </div>
  );
};

export default Booking;

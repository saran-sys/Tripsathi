import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { getAllDestinations } from '../../api/destinationApi';
import '../../styles/featured-destinations.css';

const FeaturedDestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await getAllDestinations();
      // Get top 3 destinations by rating
      const featuredDestinations = data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      setDestinations(featuredDestinations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading destinations...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <>
      {destinations.map((destination) => (
        <Col lg="4" md="6" sm="6" key={destination._id} className="mb-4">
          <div className="featured__destination-card">
            <div className="featured__destination-img">
              <img src={destination.imageUrl} alt={destination.name} />
              <span className="featured__destination-category">
                {destination.category}
              </span>
            </div>
            <div className="featured__destination-content">
              <h4>{destination.name}</h4>
              <p className="featured__destination-location">
                <i className="ri-map-pin-line"></i> {destination.location}
              </p>
              <p className="featured__destination-description">
                {destination.description}
              </p>
              <div className="featured__destination-info">
                <p className="featured__destination-best-time">
                  <i className="ri-time-line"></i> Best Time: {destination.bestTimeToVisit}
                </p>
                <div className="featured__destination-rating">
                  <i className="ri-star-fill"></i>
                  <span>{destination.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default FeaturedDestinationList; 
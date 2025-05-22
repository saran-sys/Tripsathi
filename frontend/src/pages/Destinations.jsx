import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'reactstrap';
import { getAllDestinations } from '../api/destinationApi';
import '../styles/destinations.css';

const Destinations = () => {
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
      setDestinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="pt-0">
        <Container>
          <div className="text-center">Loading destinations...</div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-0">
        <Container>
          <div className="text-center text-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-0">
      <Container>
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <h2 className="featured__tour-title">Popular Destinations</h2>
          </Col>
          {destinations.map((destination) => (
            <Col lg="4" md="6" sm="6" key={destination._id} className="mb-4">
              <Card className="destination__card">
                <div className="destination__img">
                  <img src={destination.imageUrl || 'https://via.placeholder.com/300x200'} alt={destination.name} />
                  <Badge color="primary" className="destination__category">
                    {destination.category}
                  </Badge>
                </div>
                <div className="destination__content">
                  <h4>{destination.name}</h4>
                  <p className="destination__location">
                    <i className="ri-map-pin-line"></i> {destination.location}
                  </p>
                  <p className="destination__description">{destination.description}</p>
                  <div className="destination__info">
                    <p className="destination__best-time">
                      <i className="ri-time-line"></i> Best Time: {destination.bestTimeToVisit}
                    </p>
                    <div className="destination__activities">
                      <h6>Activities:</h6>
                      <ul>
                        {destination.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="destination__rating">
                    <i className="ri-star-fill"></i>
                    <span>{destination.rating}</span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Destinations; 
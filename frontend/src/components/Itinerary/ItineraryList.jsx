import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import './itinerary.css';

const ItineraryList = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const { data, loading, error } = useFetch(`${BASE_URL}/itinerary/user/${user?._id}`);

  useEffect(() => {
    if (data) {
      setItineraries(data);
    }
  }, [data]);

  if (loading) return <h4 className="text-center">Loading...</h4>;
  if (error) return <h4 className="text-center">{error}</h4>;

  return (
    <section className="itinerary__list">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="itinerary__header">
              <h2>My Itineraries</h2>
              <Link to="/itinerary/create">
                <Button className="btn primary__btn">Create New Itinerary</Button>
              </Link>
            </div>
          </Col>
          {itineraries.length === 0 ? (
            <Col lg="12">
              <div className="text-center">
                <h4>No itineraries found. Create your first itinerary!</h4>
              </div>
            </Col>
          ) : (
            itineraries.map(itinerary => (
              <Col lg="4" md="6" sm="12" key={itinerary._id}>
                <Card className="itinerary__card">
                  <div className="itinerary__img">
                    <img src={itinerary.image || "https://via.placeholder.com/300x200"} alt={itinerary.title} />
                  </div>
                  <div className="itinerary__content">
                    <h5>{itinerary.title}</h5>
                    <p>{itinerary.description}</p>
                    <div className="itinerary__info">
                      <span>
                        <i className="ri-map-pin-line"></i> {itinerary.destinations.length} Destinations
                      </span>
                      <span>
                        <i className="ri-calendar-line"></i> {new Date(itinerary.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="itinerary__actions">
                      <Link to={`/itinerary/${itinerary._id}`}>
                        <Button className="btn primary__btn">View Details</Button>
                      </Link>
                      {itinerary.isPublic && (
                        <Link to={`/itinerary/share/${itinerary.sharedSlug}`}>
                          <Button className="btn secondary__btn">Share</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ItineraryList; 
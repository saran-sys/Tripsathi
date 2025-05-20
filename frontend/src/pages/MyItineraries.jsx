import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import "../styles/my-itineraries.css";
import { BASE_URL } from "../utils/config";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const MyItineraries = () => {
  const { user } = useContext(AuthContext);
  
  // Debug: Log the user and token
  useEffect(() => {
    console.log('Current user:', user);
    console.log('Token:', user?.token);
  }, [user]);

  const { data: itineraries, loading, error } = useFetch(
    user ? `${BASE_URL}/itinerary/user/${user._id}` : null,
    {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    }
  );

  // Debug: Log the API response
  useEffect(() => {
    console.log('Itineraries:', itineraries);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [itineraries, loading, error]);

  if (loading) return <h4 className="text-center">Loading...</h4>;
  if (error) return <h4 className="text-center">{error}</h4>;

  return (
    <section className="my-itineraries">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="d-flex justify-content-between align-items-center">
              <h2>My Itineraries</h2>
              <Link to="/itinerary/create" className="btn primary__btn">
                <FaPlus /> Create New Itinerary
              </Link>
            </div>
          </Col>
          {itineraries?.length === 0 ? (
            <Col lg="12">
              <div className="text-center">
                <h4>No itineraries found</h4>
                <p>Start by creating your first itinerary!</p>
              </div>
            </Col>
          ) : (
            itineraries?.map(itinerary => (
              <Col lg="4" md="6" key={itinerary._id}>
                <div className="itinerary__card">
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
                      <button className="btn primary__btn">View Details</button>
                    </Link>
                    {itinerary.isPublic && (
                      <Link to={`/itinerary/share/${itinerary.sharedSlug}`}>
                        <button className="btn secondary__btn">Share</button>
                      </Link>
                    )}
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default MyItineraries; 
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

  const { data: itineraries, loading, error } = useFetch(`${BASE_URL}/itinerary/user`);

  // Debug: Log the API response
  useEffect(() => {
    console.log('Itineraries:', itineraries);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [itineraries, loading, error]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <h2 className="featured__tour-title">My Itineraries</h2>
          </Col>
          <Col lg="12" className="mb-4">
            <Link to="/create-itinerary" className="btn btn-primary">
              <FaPlus /> Create New Itinerary
            </Link>
          </Col>
          {loading && <h4 className="text-center">Loading...</h4>}
          {error && <h4 className="text-center">{error}</h4>}
          {!loading &&
            !error &&
            itineraries?.map((itinerary) => (
              <Col lg="4" md="6" sm="6" className="mb-4" key={itinerary._id}>
                <div className="itinerary__card">
                  <div className="itinerary__img">
                    <img src={itinerary.destinations[0]?.image} alt="" />
                  </div>
                  <div className="itinerary__content">
                    <h5>{itinerary.title}</h5>
                    <p>{itinerary.description}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <Link to={`/itinerary/${itinerary._id}`} className="btn btn-primary">
                        View Details
                      </Link>
                      <Link to={`/edit-itinerary/${itinerary._id}`} className="btn btn-outline-primary">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default MyItineraries; 
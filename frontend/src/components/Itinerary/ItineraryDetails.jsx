import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { useAuth } from '../../context/AuthContext';
import './itinerary.css';

const ItineraryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItinerary();
  }, [id]);

  const fetchItinerary = async () => {
    try {
      const res = await fetch(`${BASE_URL}/itinerary/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setItinerary(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch itinerary');
      }
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/itinerary/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        const res = await fetch(`${BASE_URL}/itinerary/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (res.ok) {
          navigate('/itinerary');
        } else {
          throw new Error('Failed to delete itinerary');
        }
      } catch (error) {
        console.error('Error deleting itinerary:', error);
        alert('Failed to delete itinerary');
      }
    }
  };

  if (loading) return <h4 className="text-center">Loading...</h4>;
  if (error) return <h4 className="text-center">{error}</h4>;
  if (!itinerary) return <h4 className="text-center">Itinerary not found</h4>;

  return (
    <section className="itinerary__details">
      <Container>
        <Row>
          <Col lg="12">
            <div className="itinerary__item">
              <div className="itinerary__header">
                <h2 className="itinerary__title">{itinerary.title}</h2>
                <div className="itinerary__actions">
                  <Button 
                    className="btn edit__btn"
                    onClick={handleEdit}
                  >
                    <i className="ri-edit-line"></i> Edit
                  </Button>
                  <Button 
                    className="btn delete__btn"
                    onClick={handleDelete}
                  >
                    <i className="ri-delete-bin-line"></i> Delete
                  </Button>
                  <Button 
                    className="btn secondary__btn"
                    onClick={() => navigate('/itinerary')}
                  >
                    <i className="ri-arrow-left-line"></i> Back to List
                  </Button>
                </div>
              </div>
              <p className="itinerary__description">{itinerary.description}</p>
              <ListGroup className="itinerary__destinations">
                {itinerary.destinations.map((destination, index) => (
                  <ListGroupItem key={index} className="destination__item">
                    <div className="destination__header">
                      <h5>{destination.location}</h5>
                      <span className="destination__date">
                        {new Date(destination.date).toLocaleDateString()}
                      </span>
                    </div>
                    {destination.notes && (
                      <p className="destination__notes">{destination.notes}</p>
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <div className="itinerary__footer">
                <span className="itinerary__date">
                  <i className="ri-calendar-line"></i> Created: {new Date(itinerary.createdAt).toLocaleDateString()}
                </span>
                {itinerary.isPublic && (
                  <span className="itinerary__public">
                    <i className="ri-global-line"></i> Public Itinerary
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ItineraryDetails; 
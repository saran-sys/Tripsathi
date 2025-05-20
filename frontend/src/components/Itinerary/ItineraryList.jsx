import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import './itinerary.css';

const ItineraryList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const { data, loading, error, refetch } = useFetch(`${BASE_URL}/itinerary/user/${user?._id}`);

  useEffect(() => {
    if (data) {
      setItineraries(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        const res = await fetch(`${BASE_URL}/itinerary/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (res.ok) {
          // Remove the deleted itinerary from the state
          setItineraries(prev => prev.filter(item => item._id !== id));
        } else {
          throw new Error('Failed to delete itinerary');
        }
      } catch (error) {
        console.error('Error deleting itinerary:', error);
        alert('Failed to delete itinerary');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/itinerary/edit/${id}`);
  };

  const handleShare = async (id) => {
    const shareUrl = `${window.location.origin}/itinerary/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess('URL copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear success message after 2 seconds
    } catch (err) {
      console.error('Failed to copy URL:', err);
      alert('Failed to copy URL to clipboard');
    }
  };

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
              <Col lg="12" key={itinerary._id} className="mb-4">
                <div className="itinerary__item">
                  <div className="itinerary__header">
                    <h2 className="itinerary__title">{itinerary.title}</h2>
                    <div className="itinerary__actions">
                      <Button 
                        className="btn edit__btn"
                        onClick={() => handleEdit(itinerary._id)}
                      >
                        <i className="ri-edit-line"></i> Edit
                      </Button>
                      <Button 
                        className="btn delete__btn"
                        onClick={() => handleDelete(itinerary._id)}
                      >
                        <i className="ri-delete-bin-line"></i> Delete
                      </Button>
                      <Link to={`/itinerary/${itinerary._id}`}>
                        <Button className="btn primary__btn">View Details</Button>
                      </Link>
                      {itinerary.isPublic && (
                        <Button 
                          className="btn secondary__btn"
                          onClick={() => handleShare(itinerary._id)}
                        >
                          <i className="ri-share-line"></i> Share
                        </Button>
                      )}
                    </div>
                  </div>
                  {copySuccess && (
                    <div className="copy__success">
                      {copySuccess}
                    </div>
                  )}
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

export default ItineraryList; 
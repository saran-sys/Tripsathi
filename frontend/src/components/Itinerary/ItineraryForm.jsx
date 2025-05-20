import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { useAuth } from '../../context/AuthContext';
import './itinerary.css';

const ItineraryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destinations: [{ location: '', date: '', notes: '' }],
    isPublic: false
  });

  useEffect(() => {
    if (id) {
      fetchItinerary();
    }
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
        setFormData(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      alert('Failed to fetch itinerary details');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDestinationChange = (index, field, value) => {
    const newDestinations = [...formData.destinations];
    newDestinations[index] = {
      ...newDestinations[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      destinations: newDestinations
    }));
  };

  const addDestination = () => {
    setFormData(prev => ({
      ...prev,
      destinations: [...prev.destinations, { location: '', date: '', notes: '' }]
    }));
  };

  const removeDestination = (index) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!user?.token) {
        alert('Please log in to create an itinerary');
        navigate('/login');
        return;
      }

      // Format the destinations data
      const formattedDestinations = formData.destinations.map(dest => ({
        ...dest,
        date: new Date(dest.date).toISOString() // Convert date to ISO string
      }));

      const url = id ? `${BASE_URL}/itinerary/${id}` : `${BASE_URL}/itinerary`;
      const method = id ? 'PUT' : 'POST';
      
      console.log('Making request to:', url);
      console.log('With token:', user.token);
      console.log('Request body:', { ...formData, destinations: formattedDestinations });

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...formData,
          destinations: formattedDestinations
        })
      });

      console.log('Response status:', res.status);
      const responseData = await res.json();
      console.log('Response data:', responseData);

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to save itinerary');
      }

      navigate('/my-itineraries');
    } catch (error) {
      console.error('Error saving itinerary:', error);
      alert(error.message);
    }
  };

  return (
    <section className="itinerary__form">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="itinerary__form-container">
              <h2>{id ? 'Edit Itinerary' : 'Create New Itinerary'}</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Itinerary Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <div className="destinations__section">
                  <h4>Destinations</h4>
                  {formData.destinations.map((destination, index) => (
                    <div key={index} className="destination__item">
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Input
                              type="text"
                              placeholder="Location"
                              value={destination.location}
                              onChange={(e) => handleDestinationChange(index, 'location', e.target.value)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Input
                              type="date"
                              value={destination.date}
                              onChange={(e) => handleDestinationChange(index, 'date', e.target.value)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <Input
                              type="text"
                              placeholder="Notes"
                              value={destination.notes}
                              onChange={(e) => handleDestinationChange(index, 'notes', e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="1">
                          <Button
                            type="button"
                            className="btn danger__btn"
                            onClick={() => removeDestination(index)}
                            disabled={formData.destinations.length === 1}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Button
                    type="button"
                    className="btn secondary__btn"
                    onClick={addDestination}
                  >
                    Add Destination
                  </Button>
                </div>

                <FormGroup check className="mt-4">
                  <Input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                  />
                  <span> Make this itinerary public</span>
                </FormGroup>

                <Button type="submit" className="btn primary__btn mt-4">
                  {id ? 'Update Itinerary' : 'Create Itinerary'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ItineraryForm; 
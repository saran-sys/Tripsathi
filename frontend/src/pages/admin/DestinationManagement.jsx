import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllDestinations, createDestination, updateDestination, deleteDestination } from '../../api/destinationApi';
import { toast } from 'react-toastify';

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    bestTimeToVisit: '',
    activities: [''],
    category: 'other',
    rating: 0
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await getAllDestinations();
      setDestinations(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setEditingDestination(null);
      setFormData({
        name: '',
        description: '',
        location: '',
        imageUrl: '',
        coordinates: {
          lat: '',
          lng: ''
        },
        bestTimeToVisit: '',
        activities: [''],
        category: 'other',
        rating: 0
      });
    }
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      description: destination.description,
      location: destination.location,
      imageUrl: destination.imageUrl,
      coordinates: {
        lat: destination.coordinates.lat,
        lng: destination.coordinates.lng
      },
      bestTimeToVisit: destination.bestTimeToVisit,
      activities: destination.activities,
      category: destination.category,
      rating: destination.rating
    });
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(id);
        toast.success('Destination deleted successfully');
        fetchDestinations();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDestination) {
        await updateDestination(editingDestination._id, formData);
        toast.success('Destination updated successfully');
      } else {
        await createDestination(formData);
        toast.success('Destination created successfully');
      }
      toggleModal();
      fetchDestinations();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: parseFloat(value)
        }
      }));
    } else if (name.startsWith('activity-')) {
      const index = parseInt(name.split('-')[1]);
      const newActivities = [...formData.activities];
      newActivities[index] = value;
      setFormData(prev => ({
        ...prev,
        activities: newActivities
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, '']
    }));
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center">Loading destinations...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Destination Management</h2>
        </Col>
        <Col className="text-end">
          <Button color="primary" onClick={toggleModal}>
            Add New Destination
          </Button>
        </Col>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination._id}>
              <td>{destination.name}</td>
              <td>{destination.location}</td>
              <td>{destination.category}</td>
              <td>{destination.rating}</td>
              <td>
                <Button color="primary" size="sm" className="me-2" onClick={() => handleEdit(destination)}>
                  Edit
                </Button>
                <Button color="danger" size="sm" onClick={() => handleDelete(destination._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingDestination ? 'Edit Destination' : 'Add New Destination'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="imageUrl">Image URL</Label>
              <Input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="lat">Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    name="lat"
                    id="lat"
                    value={formData.coordinates.lat}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lng">Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    name="lng"
                    id="lng"
                    value={formData.coordinates.lng}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="bestTimeToVisit">Best Time to Visit</Label>
              <Input
                type="text"
                name="bestTimeToVisit"
                id="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Activities</Label>
              {formData.activities.map((activity, index) => (
                <div key={index} className="d-flex mb-2">
                  <Input
                    type="text"
                    name={`activity-${index}`}
                    value={activity}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    color="danger"
                    className="ms-2"
                    onClick={() => removeActivity(index)}
                    disabled={formData.activities.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button color="secondary" onClick={addActivity} className="mt-2">
                Add Activity
              </Button>
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="romantic">Romantic</option>
                <option value="relaxing">Relaxing</option>
                <option value="nature">Nature</option>
                <option value="other">Other</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                type="number"
                name="rating"
                id="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              {editingDestination ? 'Update' : 'Create'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default DestinationManagement; 
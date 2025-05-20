import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    price: '',
    maxGroupSize: '',
    desc: '',
    photo: ''
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/v1/tours', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTours(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tours');
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setSelectedTour(null);
      setFormData({
        title: '',
        city: '',
        address: '',
        distance: '',
        price: '',
        maxGroupSize: '',
        desc: '',
        photo: ''
      });
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setFormData({
      title: tour.title,
      city: tour.city,
      address: tour.address,
      distance: tour.distance,
      price: tour.price,
      maxGroupSize: tour.maxGroupSize,
      desc: tour.desc,
      photo: tour.photo
    });
    setModal(true);
  };

  const handleDelete = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/api/v1/tours/${tourId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Tour deleted successfully');
        fetchTours();
      } catch (error) {
        toast.error('Failed to delete tour');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (selectedTour) {
        await axios.put(
          `http://localhost:4000/api/v1/tours/${selectedTour._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success('Tour updated successfully');
      } else {
        await axios.post(
          'http://localhost:4000/api/v1/tours',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success('Tour created successfully');
      }
      toggleModal();
      fetchTours();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Tour Management</h4>
        <Button color="primary" onClick={toggleModal}>
          Add New Tour
        </Button>
      </div>

      <Table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Max Group Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>${tour.price}</td>
              <td>{tour.maxGroupSize}</td>
              <td>
                <Button
                  color="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(tour)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          {selectedTour ? 'Edit Tour' : 'Add New Tour'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="distance">Distance</Label>
              <Input
                type="number"
                name="distance"
                id="distance"
                value={formData.distance}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size</Label>
              <Input
                type="number"
                name="maxGroupSize"
                id="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo URL</Label>
              <Input
                type="text"
                name="photo"
                id="photo"
                value={formData.photo}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">
              {selectedTour ? 'Update' : 'Create'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TourManagement; 
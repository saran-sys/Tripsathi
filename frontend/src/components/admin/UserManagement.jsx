import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token); // Debug log
    if (!token) {
      throw new Error('No token found');
    }
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchUsers = async () => {
    try {
      const headers = getAuthHeader();
      console.log('Request headers:', headers); // Debug log

      const response = await axios.get(`${BASE_URL}/admin/users`, { headers });
      console.log('Fetch users response:', response.data); // Debug log
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.message === 'No token found') {
        toast.error('Please log in again');
        // Optionally redirect to login
        // window.location.href = '/login';
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch users');
      }
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setSelectedUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user'
      });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't show password in edit mode
      role: user.role
    });
    setModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const headers = getAuthHeader();
        const response = await axios.delete(`${BASE_URL}/admin/users/${userId}`, { headers });

        if (response.data.success) {
          toast.success('User deleted successfully');
          fetchUsers();
        } else {
          toast.error(response.data.message || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.message === 'No token found') {
          toast.error('Please log in again');
        } else {
          toast.error(error.response?.data?.message || 'Failed to delete user');
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeader();
      const submitData = { ...formData };
      
      // If editing, don't send password if it's empty
      if (selectedUser && !submitData.password) {
        delete submitData.password;
      }

      console.log('Submitting data:', submitData); // Debug log
      console.log('With headers:', headers); // Debug log

      let response;
      if (selectedUser) {
        response = await axios.put(
          `${BASE_URL}/admin/users/${selectedUser._id}`,
          submitData,
          { headers }
        );
      } else {
        // For new users, ensure password is provided
        if (!submitData.password) {
          toast.error('Password is required for new users');
          return;
        }
        response = await axios.post(
          `${BASE_URL}/admin/users`,
          submitData,
          { headers }
        );
      }

      console.log('Submit response:', response.data); // Debug log

      if (response.data.success) {
        toast.success(selectedUser ? 'User updated successfully' : 'User created successfully');
        toggleModal();
        fetchUsers();
      } else {
        toast.error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.message === 'No token found') {
        toast.error('Please log in again');
      } else {
        toast.error(error.response?.data?.message || 'Operation failed');
      }
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
        <h4>User Management</h4>
        <Button color="primary" onClick={toggleModal}>
          Add New User
        </Button>
      </div>

      <Table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  color="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                Password {selectedUser && '(leave blank to keep current)'}
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required={!selectedUser}
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserManagement; 
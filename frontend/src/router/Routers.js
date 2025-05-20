import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from './../pages/Home';
import About from './../pages/About';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import Thankyou from '../pages/Thankyou';
import FlightsPage from './../pages/FlightsPage';
import AddTour from './../pages/AddTour';
import UserDashboard from './../pages/UserDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import ItineraryList from '../components/Itinerary/ItineraryList';
import ItineraryForm from '../components/Itinerary/ItineraryForm';
import ItineraryDetails from '../components/Itinerary/ItineraryDetails';
import MyBookings from '../pages/MyBookings';
import AdminDashboard from '../pages/AdminDashboard';

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<Thankyou/>} />
        <Route path='/tours/search' element={<SearchResultList/>} />
        <Route path='/flights' element={<FlightsPage />} />
        <Route path='/add-tour' element={
          <ProtectedRoute>
            <AddTour />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path='/my-bookings' element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } />
        <Route path='/itinerary' element={
          <ProtectedRoute>
            <ItineraryList />
          </ProtectedRoute>
        } />
        <Route path='/itinerary/create' element={
          <ProtectedRoute>
            <ItineraryForm />
          </ProtectedRoute>
        } />
        <Route path='/itinerary/edit/:id' element={
          <ProtectedRoute>
            <ItineraryForm />
          </ProtectedRoute>
        } />
        <Route path='/itinerary/:id' element={
          <ProtectedRoute>
            <ItineraryDetails />
          </ProtectedRoute>
        } />
         <Route path='/admin' element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
    </Routes>
  ) 
}

export default Routers

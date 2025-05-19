// pages/FlightsPage.jsx
import React, { useEffect, useState } from 'react';
import FlightCard from './FlightCard'; // ✅ corrected relative import path

const FlightsPage = () => {
  const [flights, setFlights] = useState([]); // ✅ default to empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/search') // ✅ make sure this route is working on your server
      .then((res) => res.json()) // ✅ uncommented this to parse response
      .then((data) => {
        setFlights(data?.data || []); // ✅ safe access with fallback
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching flights:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>Available Flights</h2>
      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <div className="flight-list">
          {flights.map((flight) => (
            <FlightCard key={flight._id || flight.flightNumber} flight={flight} />
          ))}
        </div>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightsPage;

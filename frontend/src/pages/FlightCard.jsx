// components/FlightCard.jsx
import React from 'react';

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <h3>{flight.flightNumber}</h3>
      <p>{flight.departureCity} → {flight.arrivalCity}</p>
      <p>
        Departure: {new Date(flight.departureTime).toLocaleString()} <br />
        Arrival: {new Date(flight.arrivalTime).toLocaleString()}
      </p>
      <p>Seats Available: {flight.availableSeats}</p>
      <p>Price: ${flight.price}</p>
      <button>Book Now</button>
    </div>
  );
};

export default FlightCard;

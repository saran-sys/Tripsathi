import Flight from '../models/Flight.js';
import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { userId, flightId, numberOfSeats } = req.body;

    // Validate input
    if (!userId || !flightId || !numberOfSeats) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId, flightId, and numberOfSeats'
      });
    }

    // Find the flight and check seat availability
    const flight = await Flight.findById(flightId);
    
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    if (flight.availableSeats < numberOfSeats) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available'
      });
    }

    // Calculate total price
    const totalPrice = flight.price * numberOfSeats;

    // Create booking
    const booking = await Booking.create({
      userId,
      flightId,
      numberOfSeats,
      totalPrice
    });

    // Update available seats in flight
    flight.availableSeats -= numberOfSeats;
    await flight.save();

    // Return success response with booking details
    return res.status(201).json({
      success: true,
      message: 'Flight booked successfully',
      data: {
        booking,
        flight: {
          flightNumber: flight.flightNumber,
          departureCity: flight.departureCity,
          arrivalCity: flight.arrivalCity,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime
        }
      }
    });

  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
}; 
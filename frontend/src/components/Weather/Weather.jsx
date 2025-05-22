import React, { useState, useEffect } from 'react';
import { getWeather } from '../../api/weatherApi';
import { useParams } from 'react-router-dom';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lat, lon } = useParams();

  const fetchWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeather(latitude, longitude);
      setWeather(data);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      // If coordinates are provided in URL, use them
      fetchWeather(lat, lon);
    } else if ("geolocation" in navigator) {
      // Otherwise, try to get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError("Unable to get your location. Please enable location services and refresh the page.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="weather-container">
        <div className="weather-card">
          <div className="loading-spinner">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="weather-card error">
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Current Weather</h2>
        <div className="weather-info">
          <div className="temperature">
            <span className="temp">{weather.current.temp_c}°C</span>
            <span className="feels-like">Feels like: {weather.current.feelslike_c}°C</span>
          </div>
          <div className="weather-details">
            <p>Location: {weather.location.name}, {weather.location.country}</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 
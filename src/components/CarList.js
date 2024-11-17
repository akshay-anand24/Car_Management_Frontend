import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data } = await API.get('/api/cars');
      setCars(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      setCars('')
      const { data } = search? await API.get(`/api/cars/search?search=${search}`):await API.get(`/api/cars`);
      setCars(data);
    } catch (err) {
      console.error(err);
    }
  };
   if (!cars) return(<p>Loading...</p>)
  return (
    <div className="car-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car._id} className="car-item">
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            <Link to={`/cars/${car._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;

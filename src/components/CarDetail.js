import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const { data } = await API.get(`/api/cars/${id}`);
      setCar(data);
      setFormData({ title: data.title, description: data.description, tags: data.tags.join(', ') });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/api/cars/${id}`);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };
      await API.put(`/api/cars/${id}`, updatedData);
      setIsEditing(false);
      fetchCarDetails();
    } catch (err) {
      console.error(err);
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="car-detail-container">
      {isEditing ? (
        <form onSubmit={handleEdit} className="edit-form">
          <h2>Edit Car</h2>
          <input
            type="text"
            value={formData.title}
            placeholder='title'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            value={formData.description}
            placeholder='description'
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            value={formData.tags}
            placeholder='tags (comma-separated)'
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="car-detail">
          <h2>{car.title}</h2>
          <p>{car.description}</p>
          <p>
            <strong>Tags:</strong> {car.tags.join(', ')}
          </p>
          <div className="car-images">
            {car.images.map((image, index) => (
              <img key={index} src={image} alt={`Car ${index + 1}`} />
            ))}
          </div>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;

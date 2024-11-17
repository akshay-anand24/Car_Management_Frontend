import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './AddCar.css';

const AddCar = () => {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '',images:'' });
  const [error,setError]=useState('')
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
    formData.images =formData.images ? formData.images.split(',').map(image => image.trim()): [];

    try {
      await API.post('/api/cars', formData);
      navigate('/');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="add-car-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Car</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
        <input
          type="text"
          placeholder="Images (comma-separated)"
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;

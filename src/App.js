import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import CarCreate from './components/AddCar';
import { isAuthenticated } from './utils/auth';

const App = () => {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated() ? <CarList /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars/create" element={isAuthenticated() ? <CarCreate/> : <Login />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

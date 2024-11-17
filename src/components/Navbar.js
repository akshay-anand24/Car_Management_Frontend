import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1>Car Management</h1>
      <div className="nav-links">
        {isAuthenticated() ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/cars/create">Add Car</Link>
            <button onClick={() => logout(navigate)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

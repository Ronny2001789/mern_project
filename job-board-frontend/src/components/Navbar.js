import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
   <div className="navbar">
  <div>
    <Link to="/dashboard" style={{ fontWeight: "bold", fontSize: "18px", marginRight: "20px" }}>
       JobBoard
    </Link>
    <Link to="/create-job">Create Job</Link>
    {!token && (
      <>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </>
    )}
  </div>
  <a>
    {token && (
  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
)}

  </a>
 

</div>

  );
}

// Header.js
import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className='header-container' >
      <h1>
        <a className="heading" href='/'>
          <img src="/logo.png" alt="ChUTC" className="logo" />
          <span className="logo-text2">ChUTC</span>
          <span className="logo-text">ChUTC</span>
        </a>
      </h1>
      <ul className='navbar-container'>
        <li><Link to='/Appeal'>Appeal</Link></li>
        <li><Link to='/Departments'>Departments</Link></li>
        <li><Link to='/Map'>Map</Link></li>
        <li><Link to='/Infrastructure'>Infrastructure</Link></li>
        {!isLoggedIn && <li><Link to='/Authorization' className="auth-link">Authorization</Link></li>}
        {!isLoggedIn && <li><Link to='/SignUp' className="signup-link">SignUp</Link></li>}
        <li><Link to='/Search'>Search</Link></li>
        {isLoggedIn && <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>}
      </ul>
    </div>
  );
};

export default Header;

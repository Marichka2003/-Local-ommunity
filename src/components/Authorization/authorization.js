import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import './style.css';

function Authorization({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Welcome to ChUTC');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleAuthorization = (event) => {
    event.preventDefault();
    axios.post('https://localhost:44369/api/User/login', {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data);
        setConnectionStatus('You are logged in');
        setIsLoggedIn(true);
        setRedirectToHome(true);
      })
      .catch(error => {
        console.error(error);
        setConnectionStatus(' Incorrect data');
      });
    setEmail('');
    setPassword('');
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <form className='authorization-container' onSubmit={handleAuthorization}>
      <div className='status'>{connectionStatus}</div>
      <div className="buttom-down">
        <Link to="/Authorization">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/SignUp">
          <button className="registration-button">Register</button>
        </Link>
      </div>
      <label className="input-label">Your email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input-field"
      />
      <label className="input-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="input-field"
        />
        <i className="fa fa-eye-slash" aria-hidden="true"></i>
      <button type="submit" className="submit-button">Authorize</button>
    </form>
  );
}

export default Authorization;

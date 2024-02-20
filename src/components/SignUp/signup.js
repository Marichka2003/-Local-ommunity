import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

function SignUp({ setIsRegistered }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Welcome to ChUTC');
  const [setIsConnected] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setIsConnected(false);
      setConnectionStatus('Passwords do not match');
      return;
    }
    axios.post('https://localhost:44369/api/User', {
      username: username,
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data);
        setIsConnected(true);
        setConnectionStatus('You are registered and logged in');
        setIsRegistered(true);
        localStorage.setItem('isRegistered', true);
      })
      .catch(error => {
        console.error(error);
        setIsConnected(false);
        setConnectionStatus('Error occurred during registration');
      });
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <form className='signup-container' onSubmit={handleRegistration}>
      <div className='status_signup'>{connectionStatus}</div>
      <div className="buttom-down-s">
        <Link to="/Authorization">
          <button className="login-button-s">Login</button>
        </Link>
        <Link to="/SignUp">
          <button className="registration-button-s">Register</button>
        </Link>
      </div>
      <label htmlFor="username">Username:</label>
      <input
        type="name"
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
      />
      <button type="submit" className="submit-button">Register</button>
    </form>
  );
}

export default SignUp;

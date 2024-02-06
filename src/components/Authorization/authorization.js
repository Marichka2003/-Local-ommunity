import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Змінено імпорт на файл стилів CSS
import { Navigate } from 'react-router-dom';

function Authorization({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Log in');
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
        setIsLoggedIn(true); // Встановлюємо стан isLoggedId на true
        setRedirectToHome(true);
      })
      .catch(error => {
        console.error(error);
        setConnectionStatus(' Incorrect data');
      });
    setEmail(''); setPassword('');
  };
  if (redirectToHome) {
    return <Navigate to="/" />;
  }
  return (
    <form className='authorization-container' onSubmit={handleAuthorization}>
      <div className='status'>{connectionStatus}</div>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Authorize</button>
    </form>
  );
}

export default Authorization;

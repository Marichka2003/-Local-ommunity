import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Змінено імпорт на файл стилів CSS

function SignUp({ setIsRegistered }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [setIsConnected] = useState(false); // Змінено setIsConnected на useState
  const [connectionStatus, setConnectionStatus] = useState('Log in');

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
    setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
  };

  return (
    <form className='signup-container' onSubmit={handleRegistration}>
      <div className='status_signup'>{connectionStatus}</div>
      <label>Username:</label>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <label>Confirm Password:</label>
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default SignUp;

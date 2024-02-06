import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('https://localhost:44369/api/User/login', {
        email: email,
        password: password
      });
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Incorrect data');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.post('https://localhost:44369/api/User', {
        username: username,
        email: email,
        password: password
      });
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during registration');
    }
  };

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = ({ isLoggedIn, handleLogout, userId }) => {
  const [userName] = useState('');
  const [userData, setUserData] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('https://localhost:44369/api/User/1')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  console.log("Username in state:", userName);
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
            <li><Link to='/Appeal'>{t('Appeal')}</Link></li>
            <li><Link to='/Departments'>{t('Departments')}</Link></li>
            <li><Link to='/Map'>{t('Map')}</Link></li>
            <li><Link to='/Infrastructure'>{t('Infrastructure')}</Link></li>
            <li><Link to='/Search'>{t('Search')}</Link></li>
            <li><LanguageSelector /></li>
            {!isLoggedIn && <li><Link to='/Authorization' className="auth-link">{t('Log in')}</Link></li>}
            {isLoggedIn && <li><button className="logout-button" onClick={handleLogout}>{t('Logout')}</button></li>}
            {isLoggedIn && (
              <li>
               <Link to='/User' className="circular-link">{userData.userName ? userData.userName.charAt(0) : 'U'}</Link>
              </li>
            )}
          </ul>
    </div>
  );
};

export default Header;

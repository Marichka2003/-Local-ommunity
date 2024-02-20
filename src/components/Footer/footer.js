import React, { useState } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('https://localhost:44369/api/Subscribe', { email });
    setSubscribed(true);
    setEmail('');
  } catch (error) {
    setError(t('Subscription failed. Please try again later.'));
  }
};

  return (
    <div className="content-footer">
      <div className="footer">
        <div className="footer-text">
          <img src="/ChUTC.png" alt="" className="icon" />
          {!subscribed ? (
            <form onSubmit={handleSubmit}>
              <p>{t('Subscribe to get our Newsletter')}</p>
              <input type="email" placeholder={t('Your Email')} className="subscription-input" value={email} onChange={handleInputChange} />
              <button type="submit" className="subscription-button">{t('Subscribe')}</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          ) : (
            <p className="subscribed-message">{t('Thank you for subscribing!')}</p>
          )}
          <p>{t('Careers | Privacy Policy | Terms & Conditions')}</p>
          <p>{t('© 2024 Class Technologies Inc.')} </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

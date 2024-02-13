import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
const Footer = () => {
const { t } = useTranslation();
  return (
    <div className="content-footer">
      <div className="footer">
        <div className="footer-text">
            <img src="/ChUTC.png" alt="" className="icon"/>
            <p>{t('Subscribe to get our Newsletter')}</p>
            <input type="email" placeholder={t('Your Email')} className="subscription-input" />
            <button className="subscription-button">{t('Subscribe')}</button>
            <p>{t('Careers | Privacy Policy | Terms & Conditions')}</p>
            <p>{t('© 2024 Class Technologies Inc.')} </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

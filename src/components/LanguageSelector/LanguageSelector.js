// LanguageSelector.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <div className="language-buttons">
      <button className="language-button" onClick={() => changeLanguage('en')}>En</button>
      <button className="language-button" onClick={() => changeLanguage('uk')}>Uk</button>
    </div>
  );
};

export default LanguageSelector;

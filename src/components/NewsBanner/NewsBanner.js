import React, { useState, useEffect } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsBanner = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44369/api/News');
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [newsData]);

  const handlePrevClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  const handleNextClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const { name, description, imageName } = newsData[currentNewsIndex] || {}; // Для уникнення помилок при відсутності даних

  return (
    <div className="news-banner-container">
      <div className="news-wrapper">
        <div className="news-square-left"></div>
        {newsData.length > 0 && (
          <img src={imageName} alt={name} className="news-image" />
        )}
        <Link to="/AllNews" style={{ textDecoration: 'none' }}>
          <div className="news-content">
            {newsData.length > 0 && (
              <div className="news-text">
                <h2>{t(name)}</h2>
                <p>{t(description)}</p>
              </div>
            )}
          </div>
        </Link>
        <button className="news-arrow left" onClick={handlePrevClick}>&lt;</button>
        <button className="news-arrow right" onClick={handleNextClick}>&gt;</button>
      </div>
    </div>
  );
};

export default NewsBanner;

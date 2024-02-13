import React, { useState, useEffect } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

const newsData = [
  {
    id: 1,
    title: 'Purchase of generators for educational institutions',
    text: 'During the war, the issue of ensuring the functioning of educational institutions is extremely important. That is why gasoline generators were purchased with the funds of the local budget, which were handed over to the directors of educational institutions of the Chernoostriv settlement council. They will serve as a reliable assistant to ensure the operation of school boiler rooms in case of damage or interruption of the electricity supply.',
    imageUrl: '/news.jpg',
  },
  {
    id: 2,
    title: 'Breaking News 2',
    text: 'This is the second breaking news. More important updates!',
    imageUrl: '/news.jpg',
  },
  {
    id: 3,
    title: 'Breaking News 3',
    text: 'This is the second breaking news. More important updates!',
    imageUrl: '/news.jpg',
  },
];
const NewsBanner = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  const handleNextClick = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const { title, text, imageUrl } = newsData[currentNewsIndex];
  const { t } = useTranslation();
  return (
    <div className="news-banner-container">
      <div className="news-wrapper">
        <div className="news-square-left"></div>
        <img src={imageUrl} alt={title} className="news-image" />
        <div className="news-content">
          <div className="news-text">
            <h2>{t(title)}</h2>
            <p>{t(text)}</p>
          </div>
        </div>
        <div className="news-square-right"></div>
        <button className="news-arrow left" onClick={handlePrevClick}>&lt;</button>
        <button className="news-arrow right" onClick={handleNextClick}>&gt;</button>
      </div>
    </div>
  );
};

export default NewsBanner;

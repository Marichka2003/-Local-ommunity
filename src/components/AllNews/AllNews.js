import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AllNews = () => {
  const [newsData, setNewsData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/api/News');
      setNewsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container-allnews">
        <div className="square-container-top">
          <p>
            {t('News')} <br />
          </p>
          <Link to="/" className="see-previous-btn-news">{t('Back')}</Link>
        </div>
        <div className="square-container-allnews">
          {newsData.map(item => (
            <div key={item.id} className="square-white-all">
              <h2>{t(item.name)}</h2>
              <img src={item.imageName} alt={item.name} />
              <p>{t(item.description)}</p>
            </div>
          ))}
        </div>
        <div className="square-space"></div>
        <Footer />
    </div>
  );
};

export default AllNews;

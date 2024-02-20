import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AllFuture = () => {
  const [newsData, setNewsData] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState(false); // Додали змінну для позначення того, чи вже проголосував користувач
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/api/ProjectInfrastructure');
      setNewsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleVote = () => {
    // Опрацьовуйте голосування тут
    setAlreadyVoted(true); // Позначте, що користувач вже проголосував
  };

  return (
    <div className="container-allnews">
        <div className="square-container-top">
          <p>
            {t('Vote for community development')} <br />
          </p>
          <Link to="/" className="see-previous-btn-news">{t('Previous page')}</Link>
        </div>
        <div className="square-container-allnews">
          {newsData.map(item => (
            <div key={item.id} className="square-white-future">
              <h2>{t(item.name)}</h2>

              <div className="voted">
                <img src={item.imageName} alt={item.name} />
                <p className="future-votes">{t('Voted')}: <strong>{item.votes}</strong></p>
                <p>{t('Support the project')}: </p>
                <div className="vote-buttom-enter">
                    <button className="vote-button" onClick={handleVote}>{t('Vote')}</button>
                    {alreadyVoted && <p className="already-voted-message">{t('You have already voted for this project')}</p>}
                </div>
              </div>
              <p>{t(item.description)}</p>
            </div>
          ))}
        </div>
        <div className="square-space"></div>
        <Footer />
    </div>
  );
};

export default AllFuture;

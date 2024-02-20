import React, { useState, useEffect } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FutureProgram = () => {
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [futurePrograms, setFuturePrograms] = useState([]);
  const [votedPrograms, setVotedPrograms] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44369/api/ProjectInfrastructure');
        setFuturePrograms(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setCurrentProgramIndex((prevIndex) => (prevIndex + 1) % futurePrograms.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [futurePrograms]);

  const handlePrevClick = () => {
    setCurrentProgramIndex((prevIndex) => (prevIndex - 1 + futurePrograms.length) % futurePrograms.length);
  };

  const handleNextClick = () => {
    setCurrentProgramIndex((prevIndex) => (prevIndex + 1) % futurePrograms.length);
  };

  const handleVote = async () => {
    if (!votedPrograms.includes(futurePrograms[currentProgramIndex].id)) {
      try {
        await axios.put(`https://localhost:44369/api/ProjectInfrastructure/${futurePrograms[currentProgramIndex].id}`, {
          ...futurePrograms[currentProgramIndex],
          votes: futurePrograms[currentProgramIndex].votes + 1
        });
        setVotedPrograms([...votedPrograms, futurePrograms[currentProgramIndex].id]);
        setAlreadyVoted(false);
      } catch (error) {
        console.error('Error voting:', error);
      }
    } else {
      setAlreadyVoted(true);
    }
  };

  const { name, description, imageName, votes } = futurePrograms[currentProgramIndex] || {};
  const { t } = useTranslation();

  return (
    <div className="future-program-banner-container">
      <div className="future-program-wrapper">
        <div className="future-program-square-left"></div>
        {futurePrograms.length > 0 && (
          <div >
            <img src={imageName} alt={name} className="future-program-image" />

            <div className="vote-section">
            <p className="future-votes">Voted: <strong>{votes}</strong></p>
                <p>{t('Support the project')}: </p>
                <button className="vote-button" onClick={handleVote}>{t('Vote')}</button>
            </div>
             {alreadyVoted && <p className="already-voted-message">{t('You have already voted for this project')}</p>}
          </div>
        )}
        <Link to="/AllFuture" style={{ textDecoration: 'none' }}>
        <div className="future-program-content">
          {futurePrograms.length > 0 && (
            <div className="future-program-text">
              <h2>{t(name)}</h2>
              <p>{t(description)}</p>
            </div>
          )}
        </div>
        </Link>
        <button className="future-program-arrow left" onClick={handlePrevClick}>&lt;</button>
        <button className="future-program-arrow right" onClick={handleNextClick}>&gt;</button>
      </div>
    </div>
  );
};

export default FutureProgram;

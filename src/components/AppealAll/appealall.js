import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AppealAll = () => {
  const [data, setData] = useState([]);
  const appealTypes = ['Appeal', 'Complaints', 'Statements', 'Proposal'];
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://localhost:44369/api/Appeal');
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-container">
        <div className="square-container-all">
          <p>
            <br />
          </p>
          <Link to="/Appeal" className="see-previous-btn">Previous page</Link>
        </div>
        <div className="square-space"></div>
        <div className="columns-container">
          {data.map(item => (
            <div key={item.id} className="square-white-all">
              <p className="text-header-appeal">{t('Heads of the Chornoostrivska')} <br /> {t('settlement council')} <br />
                {t('Dzysya Mykhailo Semenovych')} <br />
                {t('legal person')}<br />
                {t(item.fullName)}
              </p>
              <p className="type-centre">{t(appealTypes[item.type])}</p>
              <p className="text-appeal"> {t('I')} {t(item.fullName)} {t('living in')} {t(item.adress)} {t('and will ask about')} {t(item.description)}
              </p>
              <p className="appeal-footer">{t('Phone Number')}: 0{item.phoneNumber} <br /></p>
              <p className="appeal-footer-left">{t('Signature')}: M.Svee</p>
            </div>
          ))}
        </div>
        <div className="square-space"></div>
        <div className="footer-app">
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppealAll;

import React, { useEffect, useState } from "react";
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/api/Departments');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const councilApparatusTypes = [
    'Head',
    'Village elders',
    'Department of accounting and reporting',
    'Financial department',
    'Legal department',
    'Department of Education, Culture, Youth and Sports',
    'Department of organizational and information work',
    'Department of land relations',
    'Department of labor and social protection of the population',
    'Sector of civil protection of the population and housing and communal services',
    'Children`s Service of Chornoostrivsk settlement council',
    'Center for the provision of administrative services of the Chernoostrivsk settlement council'
  ];
  const images = [
  'leadar.png',
  'elder.png',
  'financial.png',
  'accounting.png',
  'law.png',
  'education.png',
  'organization.png',
  'lend.png',
  'protection.png',
  'civilprot.png',
  'kids.png',
  'administration.png'
];
const groupedData = {};

data.forEach(item => {
  const type = councilApparatusTypes[item.type];

  if (!groupedData[type]) {
    groupedData[type] = [];
  }

  groupedData[type].push(item);
});
  return (
    <div className="container">
      <div className="content-container">
         <div className="square">
            <ul>
                <p className="header-text">{t('Head of the community')}</p>
                <li>{t('This is Mykhailo Semenovych')}</li>
                <li>{t('He was born on March 9, 1963 in the village of Shchaslyva, Lypovetsky district, Vinnytsia region.')}</li>
                <li>{t('In 1978, he graduated from the Shchaslyvetsk eight-year school.')}</li>
                <li>{t('In 1980, he graduated from the Lukashiv Secondary School.')}</li>
                <li>{t('In 1989-1990, he studied at an internship in the specialty of surgery at the Khmelnytskyi City Hospital and received the qualification of a surgeon.')}</li>
                <li>{t('Since 1990, he has been working as a surgeon in Chornoostrivska District Hospital No. 2.')}</li>
                <li>{t('On October 25, 2015, he was elected to the post of the head of the village council of the Chornoostrivska united territorial community.')}</li>
                <li>{t('He was elected a deputy of the Chornoostriv settlement council of the 4th and 5th convocations and the Khmelnytskyi regional council of the 6th convocation.')}</li>
                <li>{t('Married. Has two sons.')}</li>
                <li>{t('Since December 1, 2015, he has been the acting head of the village.')}</li>
            </ul>
            <img src="headcommunity.png" alt="" className="image-head" />
        </div>
        <div className="square-space"></div>
        <div className="square-container-dep">
          {Object.entries(groupedData).map(([type, items]) => (
            <div key={type} className="type-block">
              <h2>{t(type)}</h2>
              {items.map((item, index) => (
                <div key={item.id} >
                  {index === 0 && <img src={images[item.type]} alt="" className="image-dep" />}
                  <p>{t(item.description)} - {t(item.name)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="square-space"></div>
        <div className="footer-dep">
            <Footer />
        </div>
      </div>

    </div>
  );
};

export default Departments;

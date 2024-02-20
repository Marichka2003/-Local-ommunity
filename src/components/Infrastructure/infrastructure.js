import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Infrastructure = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const { t } = useTranslation();
  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://localhost:44369/api/Infrastructure');
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="container">
      <div className="content-container">
        <div className="square-container-inf">
           <h1>{t('Historical and present infrastructure of Black Island')}<br/></h1>
           <p><br/>{t('Black Island is located 16 km from Khmelnytskyi at the confluence of the Mshanets River with the Southern Bug River. The first written mention of this area dates back to the middle of the 14th century. Then it was called Black Town. Already at the end of the 15th century, the settlement appears as Black Island. Such a mysterious and somewhat gloomy name is associated with the location.')}</p>
           {data.map(item => (
                <div key={item.id} >
                   <p><br/><br/><span className="centered-text">{t(item.name)}</span><br/>
                   <br/>{t(item.description)}</p>
                   <img src={item.imageName} alt="" />
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

export default Infrastructure;

import React, { useEffect, useState } from "react";
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Settlements = () => {
const [data, setData] = useState([]);
const { t } = useTranslation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:44369/api/Map');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <div className="container">
          <div className="content-container">
              <div className="block-blue">
                <div className="container-settlement">
                    <button onClick={() => window.location.href = '/'} className="buttom-set">Back</button>
                    {data.map(item => (
                        <div key={item.id} className="square-white-settlements">
                            <img src={item.imageName} alt={item.name} />
                            <p>{t(item.name)}<br/>{t(item.description)}</p>
                        </div>
                    ))}
                </div>
              </div>
            <div className="square-space"></div>
            <div className="footer-app">
                <Footer />
            </div>
          </div>
    </div>
  );
};

export default Settlements;
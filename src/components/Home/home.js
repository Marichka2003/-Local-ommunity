import React, { useEffect, useState, useRef } from "react";
import NewsBanner from '../NewsBanner/NewsBanner';
import Footer from '../Footer/footer';
import FutureProgram from '../FutureProject/FutureProgram';
import './style.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const aboutUsRef = useRef(null);
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 4) % data.length); // Оновлюємо індекс з урахуванням довжини масиву
        }, 30000);
        return () => clearInterval(interval);
    }, [data]); // Додаємо data до залежності useEffect, щоб оновлювати інтервал при зміні даних

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:44369/api/Map');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const scrollToAboutUs = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container">
            <div className="content-container">
                <div className="rectangle-with-bottom-curve">
                    <img src="/Chornyi.jpg" alt="Your" className="overlay-image" />
                   <p className="text-caption">{t('Learn more')} <span style={{ color: 'white' }}>{t('about Chornyi Ostriv')}</span></p>
                    <p className="text-caption3">{t('ChUTC interesting application to keep up with')}<br /> {t('news and communication')}</p>
                    <p className="oval-button" onClick={scrollToAboutUs}>{t('About us')}</p>
                    <div className="circle-with-triangle" onClick={() => window.open('https://drive.google.com/drive/u/0/folders/1_FYtsUlbj40CyRCtfdlOu8gwhIuyAw4Z', '_blank')}></div>
                    <p className="text-caption4">{t('Watch photo and video from event')}</p>

                    <div className="square-container-banner-news">
                        <NewsBanner />
                    </div>

                    <div className="container-map">
                        {data.slice(currentIndex, currentIndex + 4).map(item => (
                            <div key={item.id} className="square-white-homeMap">
                                <img src={item.imageName} alt={item.name} />
                                <h2>{t(item.name)}</h2>
                                <p>{t(item.description)}</p>
                                <button onClick={() => window.location.href = '/Settlements'}>{t('Learn More')}</button>
                            </div>
                        ))}
                    </div>
                     <div className="square-container-banner">
                        <FutureProgram />
                    </div>
                    <div id="aboutUs" ref={aboutUsRef} className="square-container-home">
                        <h2>{t('About us')}</h2>
                        <p>{t('We are the Chornoostrivska United Territorial Community. We provide management and accounting of the territorial community, which is a key factor in ensuring the effectiveness and efficiency of local government and meeting the needs of citizens. And our site greatly simplifies the work of residents and has the following goal:')}</p>
                        <ul>
                            <li>{t('to improve management and provision of services to the community at the territorial community level;')}</li>
                            <li>{t('to improve the efficiency and transparency of management;')}</li>
                            <li>{t('providing convenience for citizens;')}</li>
                            <li>{t('creation of tools for interaction between the community and authorities;')}</li>
                            <li>{t('planning and tracking of projects for development, infrastructure, education, health care, etc;')}</li>
                            <li>{t('communication.')}</li>
                        </ul>
                        <p>
                            {t('Here you will find a description of all territories in our community, maps, necessary interesting information, voting on projects. There also a separate section showing the organizational structure of the OTG and management. Registered users can easily submit claims for refunds, complaints, etc. and receive an immediate response to their email account.')}
                            <br /> {t('The community is trying to make better conditionals for you!')}<br/>
                            <br />{t('And here you can read history of the village Black Island of Khmelnytskyi region from ancient times to 1917.')}
                        </p>
                        <div className="pdf-container">
                            <embed src="ChornyiOstrivHistory.pdf" width="600" height="700" />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

    );
};

export default Home;

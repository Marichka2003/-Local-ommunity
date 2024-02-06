import React, { useEffect, useState, useRef } from "react";
import NewsBanner from '../NewsBanner/NewsBanner';
import Footer from '../Footer/footer';
import './style.css'; // Імпортуйте ваш файл стилів
import axios from 'axios';

const Home = () => {
const aboutUsRef = useRef(null);
const [data, setData] = useState([]);

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
          <p className="text-caption">Learn more</p>
          <p className="text-caption2">about Chornyi Ostriv</p>
          <p className="text-caption3">ChUTC interesting application to keep up with<br/> news and communication</p>
          <p className="oval-button" onClick={scrollToAboutUs}>About us</p>
          <div className="circle-with-triangle"></div>
          <p className="text-caption4">Watch photo and video from event</p>

            <div className="square-container-banner">
            <NewsBanner />
            </div>
            <div className="container-map">
                {data.map(item => (
                    <div key={item.id} className="square-white-homeMap">
                        <img src={item.imageName} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.description.length > 150 ? item.description.slice(0, 150) + '...' :
                         item.description}</p>
                        <button onClick={() => window.location.href = '/Settlements'}>Learn More</button>
                    </div>
                ))}
            </div>
            <div id="aboutUs" ref={aboutUsRef} className="square-container-home">
                <h2>About us</h2>
                <p>We are the Chornoostrivska United Territorial Community. We provide management and
                accounting of the territorial community, which is a key factor in ensuring the effectiveness
                and efficiency of local government and meeting the needs of citizens.
                And our site greatly simplifies the work of residents and has the following goal:</p>
                <ul>
                      <li>to improve management and provision of services to the community at the territorial
                      community level;</li>
                      <li>to improve the efficiency and transparency of management;</li>
                      <li>providing convenience for citizens;</li>
                      <li>creation of tools for interaction between the community and authorities;</li>
                      <li>planning and tracking of projects for development, infrastructure, education, health care,
                      etc;</li>
                      <li>communication.</li>
                </ul>
                <p>
                Here you will find a description of all territories in our community, maps, necessary interesting
                information, voting on projects. There also a separate section showing the organizational structure
                of the OTG and management.Registered users can easily submit claims for refunds, complaints,
                etc. and receive an immediate response to their email account.<br/>
                The community is trying to make better conditionals for you!<br/>
                <br/>And here you can read history of the village Black Island of Khmelnytskyi region from ancient times
                to 1917.
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

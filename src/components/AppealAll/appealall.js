import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';

const AppealAll = () => {
  const [data, setData] = useState([]);
  const appealTypes = ['Appeal', 'Complaints', 'Statements', 'Proposal'];

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
              <p className="text-header-appeal">Heads of the Chornoostrivska <br /> settlement council <br />
                Dzysya Mykhailo Semenovych <br />
                legal person<br />
                {item.fullName}
              </p>
              <p className="type-centre">{appealTypes[item.type]}</p>
              <p className="text-appeal"> I {item.fullName} living in {item.adress} and will ask about {item.description}
              </p>
              <p className="appeal-footer">Phone Number: 0{item.phoneNumber} <br /></p>
              <p className="appeal-footer-left">Signature: M.Svee</p>
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

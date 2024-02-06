import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from '../Footer/footer';
import './style.css';
import axios from 'axios';

const Appeal = () => {
  const [data, setData] = useState([]);
const appealTypes = ['Appeal', 'Complaints', 'Statements', 'Proposal'];
  const [formData, setFormData] = useState({
    fullName: '',
    type: '',
    address: '',
    description: '',
    phoneNumber: '',
    image: null,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/api/Appeal');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitForm = async () => {
    try {
      const form = new FormData();
      form.append('fullName', formData.fullName);
      form.append('type', formData.type);
      form.append('address', formData.address);
      form.append('description', formData.description);
      form.append('phoneNumber', parseInt(formData.phoneNumber, 10));
      form.append('ImageName', formData.image.name);

      const response = await axios.post('https://localhost:44369/api/Appeal', form);
      console.log('Data sent successfully:', response.data);
      fetchData();
      setShowForm(false);
    } catch (error) {
      if (error.response) {
        console.error('Error sending data. Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('Error sending data. No response received from the server.');
      } else {
        console.error('Error sending data:', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  console.log('Rendering Appeal component');

  return (
    <div className="container">
      <div className="content-container">
        <div className="square-container">
            <div className="square-container-white">
              <h2>
                Here you can leave a statement, suggestions, complaints, and appeals. To leave a complaint, log in
                to your account, upload a photo if necessary, and describe the problem in detail<br/>
              </h2>
              <p>
                <br/>1. A citizens complaint  is one of the types of citizens appeals with a demand for restoration
                 of rights and protection of the legitimate interests of citizens violated by actions (inaction), decisions
                 of state bodies, local self-government bodies, enterprises, institutions, organizations, associations of
                 citizens, officials.<br/>

                 <br/>2. An application is a document in which a private or official person makes a request with a specific
                 proposal to the institution or official.<br/>

                 <br/>3. Appeal provides citizens with the opportunity to defend their rights and legitimate interests
                 and to restore them in case of violation, to participate in the management of state and public affairs
                 and to influence the improvement of the work of state and local self-government bodies, institutions,
                 enterprises, and organizations.<br/>

                 <br/>4. Proposal (remarks) - citizens appeals, where advice and recommendations are expressed regarding the
                 activities of state authorities and local self-government bodies, deputies of all levels, officials,
                 as well as opinions are expressed regarding the regulation of social relations and living conditions
                 of citizens, improvement of the legal basis of state and public life, socio-cultural and other spheres
                 of activity of the state and society.
              </p>
            </div>
        </div>
        <div className="square-space"></div>
        <div className="square-container-appeal">
          <div className="square-white">
            {data.map(item => (
              <div key={item.id}>
                <img src={item.imageName} alt="" className="image" />
              </div>
            ))}
          </div>
          <div className="square-text-appeal">
              {data.length > 0 && (
                <div key={data[data.length - 1].id}>
                  <p className="text-header-appeal">Heads of the Chornoostrivska <br /> settlement council <br />
                    Dzysya Mykhailo Semenovych <br />
                    legal person<br />
                    {data[data.length - 1].fullName}
                  </p>
                  <p className="type-centre">{appealTypes[data[data.length - 1].type]}</p>
                  <p className="text-appeal"> I {data[data.length - 1].fullName} living in {data[data.length - 1].adress} and will ask about {data[data.length - 1].description}
                  </p>
                  <p className="appeal-footer">Phone Number: 0{data[data.length - 1].phoneNumber} <br /></p>
                  <p className="appeal-footer-left">Signature: M.Svee</p>
                </div>
              )}
            <div>
              <button onClick={toggleForm} className="open-modal-btn">Add another one</button>
              <Link to="/AppealAll" className="see-all-btn">See all</Link>
              {showForm && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                      <label>
                        Full Name:
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                      </label>
                      <label>
                      Type:
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        style={{ width: '105%', boxSizing: 'border-box' }}
                      >
                        <option value="">Select Type</option>
                        <option value="Appeal">Appeal</option>
                        <option value="Complaints">Complaints</option>
                        <option value="Statements">Statements</option>
                        <option value="Proposal">Proposal</option>
                      </select>
                    </label>

                      <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                      </label>
                      <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleInputChange} />
                      </label>
                      <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                      </label>
                      <label>
                        Image:
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <button type="submit">Submit</button>
                      <button type="button" onClick={toggleForm}>Close</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
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

export default Appeal;

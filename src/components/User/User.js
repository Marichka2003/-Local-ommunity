import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useTranslation } from 'react-i18next';

const User = ({handleLogout}) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:44369/api/User/1')
      .then(response => {
        setUserData(response.data);
        setUpdatedUserData(response.data); // Початкове значення для оновлених даних
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('https://localhost:44369/api/User/1', updatedUserData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
        setEditing(false);
        setUserData(updatedUserData); // Оновити дані користувача з оновленими даними
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div className="user-container">
      {userData && (
        <div>
          <h2>{t(userData.userName)}</h2>
          <p><strong>{t('Email')}:</strong> {userData.email}</p>
          <p><strong>{t('Password')}:</strong> {userData.password}</p>
          <p><strong>{t('User Name')}:</strong> {userData.userName}</p>
          <p><strong>{t('Bio')}:</strong> {t(userData.bio)}</p>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <input type="text" name="email" value={updatedUserData.email} onChange={handleChange} />
              <input type="text" name="password" value={updatedUserData.password} onChange={handleChange} />
              <input type="text" name="userName" value={updatedUserData.userName} onChange={handleChange} />
              <input type="text" name="bio" value={updatedUserData.bio} onChange={handleChange} />
              <input type="text" name="imageName" value={updatedUserData.imageName} onChange={handleChange} />
              <button type="submit">{t('Save')}</button>
            </form>
          ) : (
            <button className="logout-button" onClick={handleEdit}>{t('Edit')}</button>

          )}
          <button className="logout-button" onClick={handleLogout}>{t('Logout')}</button>
        </div>
      )}
    </div>
  );
};

export default User;

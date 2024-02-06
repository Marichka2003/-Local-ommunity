import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Припустимо, що це ваш стан для перевірки автентифікації
  const profilePhotoUrl = '...'; // URL фотографії профілю, яку ви можете отримати під час автентифікації

  return (
    <ul className='navigation-container'>
      {isLoggedIn ? (
        <>
          <li><img src={profilePhotoUrl} alt='Profile' /></li>
          {/* Додайте інші пункти меню для автентифікованого користувача */}
        </>
      ) : (
        <>
          <li><Link to='/Authorization'>Authorization</Link></li>
          <li><Link to='/SignUp'>SignUp</Link></li>
        </>
      )}
    </ul>
  );
}

export default Navigation;

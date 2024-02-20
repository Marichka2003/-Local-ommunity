import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profilePhotoUrl = '...';

  return (
    <ul className='navigation-container'>
      {isLoggedIn ? (
        <>
          <li><img src={profilePhotoUrl} alt='Profile' /></li>
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

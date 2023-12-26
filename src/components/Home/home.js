// components/Home/Home.js
import React from 'react';
import Header from '../Header/header';
import './style.css';
const Home = () => {
  return (
    <div class="container">
      <Header />
        <div class="rectangle-with-bottom-curve">
        <img src="/Chornyi.jpg" alt="Your" className="overlay-image" />
         <p className="text-caption">Learm more</p>
         <p className="text-caption2">about Chornyi Ostriv</p>
         </div>
    </div>
  );
};

export default Home;

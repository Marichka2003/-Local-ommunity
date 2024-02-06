import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div className="content">
      <div className="footer">
        <div className="footer-text">
            <img src="/ChUTC.png" alt="" className="icon"/>
            <p>Subscribe to get our Newsletter</p>
            <input type="email" placeholder="Your Email" className="subscription-input" />
            <button className="subscription-button">Subscribe</button>
            <p>Careers | Privacy Policy | Terms & Conditions</p>
            <p>© 2024 Class Technologies Inc. </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
      <div className="copyright">
        2025, Bold Limited. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

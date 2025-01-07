import React from 'react';
import { FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href={`mailto:${process.env.REACT_APP_COMPANY_EMAIL}`} className="social-link">
            <FaEnvelope /> {process.env.REACT_APP_COMPANY_EMAIL}
          </a>
          <a href={`https://instagram.com/${process.env.REACT_APP_INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram /> @{process.env.REACT_APP_INSTAGRAM_HANDLE}
          </a>
          <a href={`https://youtube.com/@${process.env.REACT_APP_YOUTUBE_HANDLE}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <FaYoutube /> @{process.env.REACT_APP_YOUTUBE_HANDLE}
          </a>
        </div>
        <div className="footer-copyright">
          {new Date().getFullYear()} {process.env.REACT_APP_COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

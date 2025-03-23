import React from 'react';
import { FaEnvelope, FaInstagram, FaYoutube, FaComment } from 'react-icons/fa';
import { SiKakaotalk } from 'react-icons/si';
import '../../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href={`mailto:${process.env.REACT_APP_COMPANY_EMAIL}`} className="social-link">
            <FaEnvelope /> Email
          </a>
          <a href={`https://instagram.com/${process.env.REACT_APP_INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram /> Instagram
          </a>
          <a href={`https://youtube.com/@${process.env.REACT_APP_YOUTUBE_HANDLE}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <FaYoutube /> Youtube
          </a>
          <a 
            href={`https://pf.kakao.com/${process.env.REACT_APP_KAKAOTALK_PLUSFRIEND_ID}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
          >
            <SiKakaotalk /> Kakao
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

import React from 'react';
import { FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="mailto:geniusgamekorea@gmail.com" className="social-link">
            <FaEnvelope /> geniusgamekorea@gmail.com
          </a>
          <a href="https://instagram.com/genius_game_korea" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram /> @genius_game_korea
          </a>
          <a href="https://youtube.com/@GeniusGame-korea" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaYoutube /> @GeniusGame-korea
          </a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Genius Game Korea. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

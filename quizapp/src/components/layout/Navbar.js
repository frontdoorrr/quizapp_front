import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            HOME
          </Link>
          <Link to="/game" className={location.pathname === '/game' ? 'active' : ''}>
            GAME
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            ABOUT
          </Link>
          <Link to="/ranking" className={location.pathname === '/ranking' ? 'active' : ''}>
            RANKING
          </Link>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            PROFILE
          </Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

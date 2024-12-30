import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            HOME
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
      </div>
    </nav>
  );
}

export default Navbar;

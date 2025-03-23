import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import '../../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태 확인
    setIsLoggedIn(authService.isAuthenticated());
    
    // 경로가 변경될 때마다 로그인 상태 다시 확인
    const checkAuth = () => {
      setIsLoggedIn(authService.isAuthenticated());
    };
    
    checkAuth();
    
    // 경로가 변경될 때 메뉴 닫기
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

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
          {isLoggedIn ? (
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              PROFILE
            </Link>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              LOGIN
            </Link>
          )}
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

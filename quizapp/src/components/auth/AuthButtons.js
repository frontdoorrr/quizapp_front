import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';
import './AuthButtons.css';

function AuthButtons() {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="auth-buttons">
        <button 
          className="auth-button login-button"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    );
  }

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-buttons">
      <button 
        className="auth-button login-button"
        onClick={handleLogin}
      >
        LOGIN
      </button>
      <button 
        className="auth-button register-button"
        onClick={handleRegister}
      >
        REGISTER
      </button>
    </div>
  );
}

export default AuthButtons;

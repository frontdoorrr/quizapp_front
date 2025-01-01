import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import { useAPI } from '../hooks/useAPI';
import '../styles/Auth.css';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { loading, error, execute: register } = useAPI(authService.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await register(userData);
      navigate('/login');
    } catch (err) {
      // 에러는 useAPI에서 처리됨
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">REGISTER</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
          {error && <div className="auth-error">{error.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;

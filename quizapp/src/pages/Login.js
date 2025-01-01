import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import { useAPI } from '../hooks/useAPI';
import '../styles/Auth.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { loading, error, execute: login } = useAPI(authService.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      navigate('/profile');
    } catch (err) {
      // 에러는 useAPI에서 처리됨
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">LOGIN</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          {error && <div className="auth-error">{error.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../api';
import { useAPI } from '../hooks/useAPI';
import '../styles/Auth.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, execute: loginExecute } = useAPI(authService.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginExecute(credentials.email, credentials.password);
      // 이전 페이지가 있으면 그곳으로, 없으면 프로필 페이지로 이동
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
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
          {error && <p className="auth-error">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;

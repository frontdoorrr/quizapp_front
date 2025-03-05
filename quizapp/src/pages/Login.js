import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../api/services/authService';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.access_token);
      // 로그인 성공 후 이전 페이지로 리다이렉트
      navigate(from);
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('Login error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
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
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-submit">
            LOGIN
          </button>
          {error && <p className="auth-error">{error}</p>}
          <div className="auth-links">
            <Link to="/register" className="register-link">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

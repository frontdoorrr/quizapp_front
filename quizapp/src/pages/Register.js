import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import { useAPI } from '../hooks/useAPI';
import '../styles/Auth.css';

function Register() {
  const [userData, setUserData] = useState({
    nickname: '',
    email: '',
    name: '',
    birth: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const navigate = useNavigate();
  const { loading, error, execute: register } = useAPI(authService.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    if (name === 'nickname') {
      setIsNicknameChecked(false);
    }
  };

  const handleCheckNickname = async (e) => {
    e.preventDefault();
    if (!userData.nickname.trim()) {
      alert('닉네임을 입력해주세요');
      return;
    }

    setIsCheckingNickname(true);
    try {
      const isAvailable = await authService.checkNickname(userData.nickname);
      setIsNicknameChecked(isAvailable);
      if (isAvailable) {
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('이미 사용 중인 닉네임입니다.');
      }
    } catch (err) {
      setIsNicknameChecked(false);
      alert('닉네임 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNicknameChecked) {
      alert('닉네임 중복 확인을 해주세요');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    // confirmPassword는 API로 보내지 않음
    const { confirmPassword, ...registerData } = userData;

    try {
      await register(registerData);
      alert('회원가입이 완료되었습니다!');
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
          <div className="input-group">
            <input
              type="text"
              name="nickname"
              placeholder="NICKNAME"
              value={userData.nickname}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="check-button"
              onClick={handleCheckNickname}
              disabled={isCheckingNickname || !userData.nickname.trim()}
            >
              {isCheckingNickname ? 'CHECKING...' : 'CHECK'}
            </button>
          </div>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="NAME"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birth"
            placeholder="BIRTH"
            value={userData.birth}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="PHONE"
            value={userData.phone}
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
          <button type="submit" className="auth-submit" disabled={loading || !isNicknameChecked}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
          {error && <div className="auth-error">{error.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;

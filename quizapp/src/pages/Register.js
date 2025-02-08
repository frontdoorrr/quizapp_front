import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import { useAPI } from '../hooks/useAPI';
import '../styles/Auth.css';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phoneNumber: '',
    nickname: ''
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const { loading, error, execute: register } = useAPI(authService.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailVerification = async () => {
    if (!userData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      // 이메일 중복 체크
      await authService.verifyEmail(userData.email);
      // 인증 메일 발송
      await authService.sendVerificationEmail();
      setIsEmailSent(true);
      alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      alert(error.message || '이메일 인증에 실패했습니다.');
    }
  };

  const handleNicknameCheck = async () => {
    if (!userData.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (userData.nickname.length < 2 || userData.nickname.length > 10) {
      alert('닉네임은 2-10자 사이여야 합니다.');
      return;
    }

    try {
      const exists = await authService.checkNickname(userData.nickname);
      setIsNicknameAvailable(!exists);
      alert(exists ? '이미 사용 중인 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    } catch (error) {
      alert('닉네임 중복 확인에 실패했습니다.');
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const validateBirthDate = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
    
    return birthDate >= minDate && birthDate <= maxDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }

    if (!isNicknameAvailable) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validatePhoneNumber(userData.phoneNumber)) {
      alert('올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
      return;
    }

    if (!validateBirthDate(userData.birthDate)) {
      alert('생년월일이 올바르지 않습니다. (14세 이상만 가입 가능)');
      return;
    }

    try {
      const formData = {
        ...userData,
        phoneNumber: userData.phoneNumber.replace(/-/g, ''),
        birthDate: new Date(userData.birthDate).toISOString().split('T')[0]
      };
      delete formData.confirmPassword;
      
      await register(formData);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      // 에러는 useAPI에서 처리됨
    }
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setUserData(prev => ({ ...prev, phoneNumber: formatted }));
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">회원가입</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={userData.email}
              onChange={handleChange}
              required
              className={isEmailVerified ? 'verified' : ''}
            />
            <button
              type="button"
              onClick={handleEmailVerification}
              disabled={!userData.email || isEmailVerified}
              className="verify-button"
            >
              {isEmailVerified ? '✓ 인증완료' : isEmailSent ? '인증 대기중' : '이메일 인증'}
            </button>
          </div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={userData.password}
            onChange={handleChange}
            minLength="8"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={userData.confirmPassword}
            onChange={handleChange}
            minLength="8"
            required
          />
          <input
            type="date"
            name="birthDate"
            placeholder="생년월일"
            value={userData.birthDate}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="휴대폰 번호 (예: 010-1234-5678)"
            value={userData.phoneNumber}
            onChange={handlePhoneChange}
            pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
            required
          />
          <div className="input-group">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임 (2-10자)"
              value={userData.nickname}
              onChange={handleChange}
              minLength="2"
              maxLength="10"
              required
              className={isNicknameAvailable ? 'verified' : ''}
            />
            <button
              type="button"
              onClick={handleNicknameCheck}
              disabled={!userData.nickname || isNicknameAvailable}
              className="verify-button"
            >
              {isNicknameAvailable ? '✓ 사용가능' : '중복확인'}
            </button>
          </div>
          <button 
            type="submit" 
            className="auth-submit" 
            disabled={loading || !isEmailVerified || !isNicknameAvailable}
          >
            {loading ? '가입 중...' : '가입하기'}
          </button>
          {error && <div className="auth-error">{error.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;

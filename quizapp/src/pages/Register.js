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
  const [nicknameValidation, setNicknameValidation] = useState({ isValid: false, message: '' });
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [passwordMatch, setPasswordMatch] = useState({ isValid: true, message: '' });
  const navigate = useNavigate();
  const { loading, error, execute: register } = useAPI(authService.register);

  const commonEmailDomains = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'hanmail.net',
    'nate.com',
    'kakao.com'
  ];

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < emailSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(emailSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));

    // 비밀번호 일치 여부 확인
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : userData.password;
      const confirmPassword = name === 'confirmPassword' ? value : userData.confirmPassword;
      
      if (confirmPassword) {
        if (password === confirmPassword) {
          setPasswordMatch({ isValid: true, message: '비밀번호가 일치합니다.' });
        } else {
          setPasswordMatch({ isValid: false, message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        setPasswordMatch({ isValid: true, message: '' });
      }
    }

    // 이메일 입력 시 도메인 추천
    if (name === 'email') {
      setSelectedIndex(-1); // 입력 시 선택 초기화
      const [localPart, domain] = value.split('@');

      // 입력값이 있을 때만 처리
      if (value) {
        if (domain !== undefined) {
          // @ 이후에는 도메인 필터링하되 localPart는 유지
          const filteredSuggestions = commonEmailDomains
            .filter(d => d.toLowerCase().startsWith(domain.toLowerCase()))
            .map(d => `${localPart}@${d}`);
          setEmailSuggestions(filteredSuggestions);
          setShowSuggestions(filteredSuggestions.length > 0);
        } else {
          // @ 이전에는 실시간 업데이트
          const suggestions = commonEmailDomains.map(d =>
            value + '@' + d
          );
          setEmailSuggestions(suggestions);
          setShowSuggestions(true);
        }
      } else {
        setShowSuggestions(false);
      }
    }

    // 닉네임 입력 시 실시간 유효성 검사
    if (name === 'nickname') {
      setIsNicknameAvailable(false);
      if (value) {
        const validation = validateNickname(value);
        setNicknameValidation(validation);
      } else {
        setNicknameValidation({ isValid: false, message: '' });
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserData(prev => ({ ...prev, email: suggestion }));
    setShowSuggestions(false);
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
      await authService.sendVerificationEmail(userData.email);
      setIsEmailSent(true);
      alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      alert(error.message || '이메일 인증에 실패했습니다.');
    }
  };

  const validateNickname = (nickname) => {
    // 공백 체크
    if (nickname.includes(' ')) {
      return {
        isValid: false,
        message: '닉네임에 띄어쓰기를 사용할 수 없습니다.'
      };
    }

    const koreanRegex = /^[가-힣]+$/;
    const englishRegex = /^[a-zA-Z0-9]+$/;
    const mixedRegex = /^[a-zA-Z0-9가-힣]+$/;

    // 전체 길이 체크
    if (nickname.length < 3) {
      return {
        isValid: false,
        message: '닉네임은 최소 3자 이상이어야 합니다.'
      };
    }

    if (koreanRegex.test(nickname)) {
      // 한글 닉네임: 3-8자
      return {
        isValid: nickname.length >= 3 && nickname.length <= 8,
        message: '한글 닉네임은 3-8자여야 합니다.'
      };
    } else if (englishRegex.test(nickname)) {
      // 영어 닉네임: 3-15자
      return {
        isValid: nickname.length >= 3 && nickname.length <= 15,
        message: '영어 닉네임은 3-15자여야 합니다.'
      };
    } else if (mixedRegex.test(nickname)) {
      // 한글+영어 혼합
      const koreanCount = (nickname.match(/[가-힣]/g) || []).length;
      const nonKoreanCount = nickname.length - koreanCount;

      if (koreanCount > 8) {
        return {
          isValid: false,
          message: '한글은 최대 8자까지 사용 가능합니다.'
        };
      }

      if (nonKoreanCount > 7) {
        return {
          isValid: false,
          message: '영어/숫자는 최대 7자까지 사용 가능합니다.'
        };
      }

      return {
        isValid: nickname.length >= 3 && nickname.length <= 15,
        message: '닉네임은 3-15자여야 합니다.'
      };
    } else {
      return {
        isValid: false,
        message: '닉네임은 한글, 영어, 숫자만 사용 가능합니다.'
      };
    }
  };

  const handleNicknameCheck = async () => {
    if (!userData.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const validation = validateNickname(userData.nickname);
    if (!validation.isValid) {
      alert(validation.message);
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
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={userData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                className={isEmailVerified ? 'verified' : ''}
              />
              {showSuggestions && (
                <div className="email-suggestions">
                  {emailSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          {userData.confirmPassword && (
            <div className={`validation-message ${passwordMatch.isValid ? 'valid' : 'invalid'}`}>
              {passwordMatch.message}
            </div>
          )}
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
              placeholder="닉네임 (한글 3-8자/영어 3-15자)"
              value={userData.nickname}
              onChange={handleChange}
              maxLength="15"
              required
              className={`${isNicknameAvailable ? 'verified' : ''} ${
                userData.nickname && !nicknameValidation.isValid ? 'invalid' : ''
              }`}
            />
            <button
              type="button"
              onClick={handleNicknameCheck}
              disabled={!userData.nickname || !nicknameValidation.isValid || isNicknameAvailable}
              className="verify-button"
            >
              {isNicknameAvailable ? '✓ 사용가능' : '중복확인'}
            </button>
          </div>
          {userData.nickname && (
            <div className={`validation-message ${nicknameValidation.isValid ? 'valid' : 'invalid'}`}>
              {nicknameValidation.message}
            </div>
          )}
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

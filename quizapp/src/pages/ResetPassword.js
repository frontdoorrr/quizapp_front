import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../api/services/authService';
import '../styles/Auth.css';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState({ isValid: true, message: '' });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL에서 토큰과 이메일 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    const emailParam = queryParams.get('email');

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
      console.log('URL 파라미터:', { token: tokenParam, email: emailParam });
      verifyToken(tokenParam, emailParam);
    } else {
      setError('유효하지 않은 링크입니다. 비밀번호 재설정을 다시 요청해주세요.');
    }
  }, [location]);

  const verifyToken = async (token, email) => {
    try {
      // 토큰 검증 요청 전에 URL 디코딩
      const decodedToken = decodeURIComponent(token);
      const decodedEmail = decodeURIComponent(email);

      console.log('토큰 검증 요청:', { token: decodedToken, email: decodedEmail });
      await authService.verifyPasswordResetToken(decodedToken, decodedEmail);
      setIsTokenValid(true);
    } catch (err) {
      console.error('토큰 검증 오류:', err);
      setError(err.message || '유효하지 않은 토큰입니다. 비밀번호 재설정을 다시 요청해주세요.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 비밀번호 일치 여부 확인
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;

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
  };

  const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, message: '비밀번호를 입력해주세요.' };
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: '비밀번호는 최소 1개의 대문자를 포함해야 합니다.' };
    }

    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: '비밀번호는 최소 1개의 소문자를 포함해야 합니다.' };
    }

    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: '비밀번호는 최소 1개의 숫자를 포함해야 합니다.' };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: '비밀번호는 최소 1개의 특수문자를 포함해야 합니다.' };
    }

    return { isValid: true, message: '' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    // 비밀번호 검증
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setIsSubmitting(false);
      return;
    }

    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    try {
      // URL 디코딩된 값 사용
      const decodedToken = decodeURIComponent(token);
      const decodedEmail = decodeURIComponent(email);

      console.log('비밀번호 재설정 요청:', {
        email: decodedEmail,
        token: decodedToken,
        password: formData.password
      });

      await authService.resetPassword(
        decodedEmail,
        decodedToken,
        formData.password,
        formData.confirmPassword
      );
      setMessage('비밀번호가 성공적으로 재설정되었습니다.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('비밀번호 재설정 오류:', err);
      setError(err.message || '비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="page-container">
        <div className="auth-container">
          <h1 className="auth-title">비밀번호 재설정</h1>
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-links">
            <Link to="/forgot-password" className="auth-link">비밀번호 재설정 다시 요청하기</Link>
            <Link to="/login" className="auth-link">로그인 페이지로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">비밀번호 재설정</h1>
        <p className="auth-description">
          새로운 비밀번호를 입력해주세요.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="새 비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {formData.confirmPassword && (
            <div className={`validation-message ${passwordMatch.isValid ? 'valid' : 'invalid'}`}>
              {passwordMatch.message}
            </div>
          )}
          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '비밀번호 변경'}
          </button>

          {message && <div className="auth-success">{message}</div>}
          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

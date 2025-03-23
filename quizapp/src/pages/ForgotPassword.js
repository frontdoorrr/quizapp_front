import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../api/services/authService';
import '../styles/Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      await authService.requestPasswordReset(email);
      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
      setEmail('');
    } catch (err) {
      setError(err.message || '비밀번호 재설정 요청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">비밀번호 찾기</h1>
        <p className="auth-description">
          가입 시 등록한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '비밀번호 재설정 링크 받기'}
          </button>

          {message && <div className="auth-success">{message}</div>}
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-links">
            <Link to="/login" className="register-link">로그인 페이지로 돌아가기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

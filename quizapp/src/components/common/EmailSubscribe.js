import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { subscribeEmail } from '../../services/api';
import '../../styles/EmailSubscribe.css';

function EmailSubscribe() {
  const [emailValue, setEmailValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ref, isVisible] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailValue.trim();

    if (!email) {
      setStatusMessage('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('');

    try {
      await subscribeEmail(email);
      setStatusMessage('구독이 완료되었습니다!');
      setEmailValue('');
    } catch (error) {
      setStatusMessage('구독 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div ref={ref} className={`subscribe-container ${isVisible ? "visible" : "hidden"}`}>
      <form onSubmit={handleSubmit} className="email-form subscribe-form">
        <input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          className="email-input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="subscribe-button"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {statusMessage && (
        <div className="status-message">
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default EmailSubscribe;

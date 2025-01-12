import React, { useState } from 'react';
import { contactService } from '../api/services/contactService';
import '../styles/Main.css';

function Main() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'pending', message: '문의사항을 전송중입니다...' });

    try {
      await contactService.submitInquiry(formData);
      setStatus({
        type: 'success',
        message: '문의사항이 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.'
      });
      // 폼 초기화
      setFormData({ name: '', email: '', content: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: '문의사항 전송에 실패했습니다. 잠시 후 다시 시도해주세요.'
      });
    }
  };

  return (
    <div className="main-container">
      {/* 기업 소개 섹션 */}
      <section className="section company-section">
        <div className="content-wrapper">
          <h2>About Us</h2>
          <div className="company-content">
            <div className="company-text">
              <h3>GENIUS GAME</h3>
              <p>
                GENIUS GAME은 퀴즈 플랫폼입니다.
                우리는 높은 수준의 지식 퀴즈를 통해, 사용자들의 호기심을 자극하고 높은 지적 수준의 사용자를 선별합니다.
              </p>
              <p>
                2024년 팀 빌딩 이후, 지속적인 혁신을 통해 성장하고 있습니다.
                전 국민의 호기심을 자극하는 퀴즈를 통해 대한민국 최고의 화두로 자리매김할 것입니다.
              </p>
            </div>
            <div className="company-values">
              <div className="value-item">
                <h4>Challenge</h4>
                <p>도전적인 게임과 퀴즈를 통해 자신만의 한계를 시험하고 성취감을 느낄 수 있습니다.</p>
              </div>
              <div className="value-item">
                <h4>Creativity </h4>
                <p>플레이어들이 창의적인 전략을 통해 문제를 해결하며, 사고력을 키우는 경험을 제공합니다.</p>
              </div>
              <div className="value-item">
                <h4>Collaboration</h4>
                <p>다른 사용자들과의 협력을 통해 새로운 네트워킹 기회를 제공합니다.</p>
              </div>
              <div className="value-item">
                <h4>Competence</h4>
                <p>경쟁의 묘미를 경험하며, 자신의 능력을 입증하고 성장할 수 있는 기회를 제공합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="section service-section">
        <div className="content-wrapper">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>퀴즈 게임</h3>
              <p>다양한 주제의 퀴즈로 스스로의 한계에 도전하세요</p>
            </div>
            <div className="service-card">
              <h3>랭킹 시스템</h3>
              <p>다른 플레이어들과 경쟁하며 성장하세요</p>
            </div>
            <div className="service-card">
              <h3>포인트 시스템</h3>
              <p>게임 참여로 포인트를 얻고 보상을 받으세요</p>
            </div>
            <div className="service-card">
              <h3>커뮤니티</h3>
              <p>다른 플레이어들과 소통하고 정보를 공유하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="section contact-section">
        <div className="content-wrapper">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h4>Address</h4>
                <p>인천광역시 서구 청라커낼로288번길 26</p>
              </div>
              <div className="contact-item">
                <h4>Email</h4>
                <p>geniusgamekorea@gmail.com</p>
              </div>
              <div className="contact-item">
              </div>
            </div>
            {/* <div className="contact-form">
              <h3>문의하기</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder="문의사항을 입력해주세요"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit">보내기</button>
                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;

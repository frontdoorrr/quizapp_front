import React from 'react';
import '../styles/Main.css';

function Main() {
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
                GENIUS GAME은 혁신적인 교육 게임 플랫폼을 제공하는 기업입니다.
                우리는 게임을 통해 학습을 더욱 재미있고 효과적으로 만들어 갑니다.
              </p>
              <p>
                2025년 설립 이후, 지속적인 혁신과 발전을 통해
                교육 게임 분야의 선두주자로 자리매김하고 있습니다.
              </p>
            </div>
            <div className="company-values">
              <div className="value-item">
                <h4>Innovation</h4>
                <p>끊임없는 혁신을 추구합니다</p>
              </div>
              <div className="value-item">
                <h4>Education</h4>
                <p>교육의 가치를 높입니다</p>
              </div>
              <div className="value-item">
                <h4>Fun</h4>
                <p>즐거운 학습을 만듭니다</p>
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
              <p>다양한 주제의 퀴즈로 지식을 테스트하고 학습하세요</p>
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
                <p>서울특별시 강남구 테헤란로 123</p>
              </div>
              <div className="contact-item">
                <h4>Email</h4>
                <p>contact@geniusgame.com</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>02-123-4567</p>
              </div>
            </div>
            <div className="contact-form">
              <h3>문의하기</h3>
              <form>
                <input type="text" placeholder="이름" />
                <input type="email" placeholder="이메일" />
                <textarea placeholder="문의사항을 입력해주세요"></textarea>
                <button type="submit">보내기</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;

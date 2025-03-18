import React, { useState } from 'react';
import '../../styles/TermsAgreement.css';

function TermsAgreement({ onComplete }) {
  const [agreements, setAgreements] = useState({
    all: false,
    termsOfService: false,
    privacyPolicy: false,
    dataCollection: false
  });
  
  const [activeAccordion, setActiveAccordion] = useState(null);

  // 전체 동의 처리
  const handleAllAgreement = (e) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      termsOfService: checked,
      privacyPolicy: checked,
      dataCollection: checked
    });
  };

  // 개별 동의 처리
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    
    const newAgreements = {
      ...agreements,
      [name]: checked
    };
    
    // 모든 약관이 체크되었는지 확인하여 '전체 동의' 상태 업데이트
    const allChecked = 
      newAgreements.termsOfService && 
      newAgreements.privacyPolicy && 
      newAgreements.dataCollection;
    
    setAgreements({
      ...newAgreements,
      all: allChecked
    });
  };

  // 아코디언 토글
  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // 필수 약관에 모두 동의했는지 확인
  const allRequiredAgreed = agreements.termsOfService && agreements.privacyPolicy && agreements.dataCollection;

  return (
    <div className="terms-agreement-container">
      <h2>약관 동의</h2>
      <p className="terms-intro">서비스 이용을 위해 다음 약관에 동의해 주세요.</p>
      
      {/* 전체 동의 체크박스 */}
      <div className="all-agreement-section">
        <label className="agreement-label all">
          <input 
            type="checkbox" 
            name="all" 
            checked={agreements.all} 
            onChange={handleAllAgreement} 
          />
          <span>모든 약관에 동의합니다</span>
        </label>
      </div>
      
      <div className="divider"></div>
      
      {/* 이용약관 */}
      <div className="agreement-section">
        <div className="agreement-header">
          <label className="agreement-label">
            <input 
              type="checkbox" 
              name="termsOfService" 
              checked={agreements.termsOfService} 
              onChange={handleAgreementChange} 
            />
            <span>이용약관 동의 <span className="required">(필수)</span></span>
          </label>
          <button 
            className="view-terms-btn" 
            onClick={() => toggleAccordion('termsOfService')}
          >
            {activeAccordion === 'termsOfService' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'termsOfService' && (
          <div className="terms-content">
            <p>이용약관 내용이 여기에 표시됩니다...</p>
            <p>
              본 약관은 [회사명]이 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              회원은 본 약관을 읽고 동의함으로써 서비스를 이용할 수 있습니다.
            </p>
            <p>
              1. 서비스 이용 계약의 성립<br />
              2. 서비스 이용 및 변경<br />
              3. 회원의 의무<br />
              4. 서비스 제공 및 중단<br />
              5. 지적재산권<br />
              6. 손해배상<br />
              7. 기타
            </p>
          </div>
        )}
      </div>
      
      {/* 개인정보 처리방침 */}
      <div className="agreement-section">
        <div className="agreement-header">
          <label className="agreement-label">
            <input 
              type="checkbox" 
              name="privacyPolicy" 
              checked={agreements.privacyPolicy} 
              onChange={handleAgreementChange} 
            />
            <span>개인정보 처리방침 동의 <span className="required">(필수)</span></span>
          </label>
          <button 
            className="view-terms-btn" 
            onClick={() => toggleAccordion('privacyPolicy')}
          >
            {activeAccordion === 'privacyPolicy' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'privacyPolicy' && (
          <div className="terms-content">
            <p>개인정보 처리방침 내용이 여기에 표시됩니다...</p>
            <p>
              [회사명]은 이용자의 개인정보를 중요시하며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다.
            </p>
            <p>
              1. 수집하는 개인정보 항목 및 수집방법<br />
              2. 개인정보의 수집 및 이용목적<br />
              3. 개인정보의 보유 및 이용기간<br />
              4. 개인정보의 파기절차 및 방법<br />
              5. 개인정보 보호책임자 및 연락처
            </p>
          </div>
        )}
      </div>
      
      {/* 개인정보 수집 및 이용 동의 */}
      <div className="agreement-section">
        <div className="agreement-header">
          <label className="agreement-label">
            <input 
              type="checkbox" 
              name="dataCollection" 
              checked={agreements.dataCollection} 
              onChange={handleAgreementChange} 
            />
            <span>개인정보 수집 및 이용 동의 <span className="required">(필수)</span></span>
          </label>
          <button 
            className="view-terms-btn" 
            onClick={() => toggleAccordion('dataCollection')}
          >
            {activeAccordion === 'dataCollection' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'dataCollection' && (
          <div className="terms-content">
            <p>개인정보 수집 및 이용 동의 내용이 여기에 표시됩니다...</p>
            <p>
              [회사명]은 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.
            </p>
            <p>
              1. 수집항목: 이름, 이메일 주소, 비밀번호, 생년월일, 휴대폰 번호, 닉네임<br />
              2. 이용목적: 회원 식별, 서비스 제공, 공지사항 전달<br />
              3. 보유기간: 회원 탈퇴 시까지
            </p>
          </div>
        )}
      </div>
      
      <div className="terms-actions">
        <button 
          className="next-btn" 
          disabled={!allRequiredAgreed} 
          onClick={onComplete}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default TermsAgreement;

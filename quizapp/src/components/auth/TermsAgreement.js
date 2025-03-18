import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../styles/TermsAgreement.css';
import { loadAllTerms } from '../../utils/termsLoader';

function TermsAgreement({ onComplete }) {
  const [agreements, setAgreements] = useState({
    all: false,
    termsOfService: false,
    privacyPolicy: false,
    dataCollection: false
  });
  
  const [viewedTerms, setViewedTerms] = useState({
    termsOfService: false,
    privacyPolicy: false,
    dataCollection: false
  });
  
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [termsContent, setTermsContent] = useState({
    termsOfService: '로딩 중...',
    privacyPolicy: '로딩 중...',
    dataCollection: '로딩 중...'
  });
  const [loading, setLoading] = useState(true);

  // 약관 내용 로드
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const terms = await loadAllTerms();
        setTermsContent(terms);
      } catch (error) {
        console.error('약관 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

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
    // 내용 보기 버튼을 클릭하면 해당 약관을 읽은 것으로 표시
    if (activeAccordion !== section) {
      setViewedTerms({
        ...viewedTerms,
        [section]: true
      });
    }
    
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // 필수 약관에 모두 동의했는지 확인
  const allRequiredAgreed = agreements.termsOfService && agreements.privacyPolicy && agreements.dataCollection;
  
  // 모든 약관을 열어서 확인했는지 확인
  const allTermsViewed = viewedTerms.termsOfService && viewedTerms.privacyPolicy && viewedTerms.dataCollection;
  
  // 모든 약관에 동의하고 모든 약관을 확인했는지 확인
  const canProceed = allRequiredAgreed && allTermsViewed;

  return (
    <div className="terms-agreement-container">
      <h2>약관 동의</h2>
      <p className="terms-intro">서비스 이용을 위해 다음 약관에 동의해 주세요.</p>
      <p className="terms-notice">모든 약관에 동의하고 내용을 확인해야 다음 단계로 진행할 수 있습니다.</p>
      
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
            className={`view-terms-btn ${viewedTerms.termsOfService ? 'viewed' : ''}`}
            onClick={() => toggleAccordion('termsOfService')}
          >
            {activeAccordion === 'termsOfService' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'termsOfService' && (
          <div className="terms-content">
            {loading ? (
              <p>약관 내용을 불러오는 중...</p>
            ) : (
              <ReactMarkdown>{termsContent.termsOfService}</ReactMarkdown>
            )}
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
            className={`view-terms-btn ${viewedTerms.privacyPolicy ? 'viewed' : ''}`}
            onClick={() => toggleAccordion('privacyPolicy')}
          >
            {activeAccordion === 'privacyPolicy' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'privacyPolicy' && (
          <div className="terms-content">
            {loading ? (
              <p>약관 내용을 불러오는 중...</p>
            ) : (
              <ReactMarkdown>{termsContent.privacyPolicy}</ReactMarkdown>
            )}
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
            className={`view-terms-btn ${viewedTerms.dataCollection ? 'viewed' : ''}`}
            onClick={() => toggleAccordion('dataCollection')}
          >
            {activeAccordion === 'dataCollection' ? '내용 접기' : '내용 보기'}
          </button>
        </div>
        
        {activeAccordion === 'dataCollection' && (
          <div className="terms-content">
            {loading ? (
              <p>약관 내용을 불러오는 중...</p>
            ) : (
              <ReactMarkdown>{termsContent.dataCollection}</ReactMarkdown>
            )}
          </div>
        )}
      </div>
      
      <div className="terms-actions">
        <button 
          className="next-btn" 
          disabled={!canProceed} 
          onClick={onComplete}
        >
          다음
        </button>
        {!canProceed && (
          <p className="terms-validation-message">
            {!allRequiredAgreed && !allTermsViewed && '모든 약관에 동의하고 내용을 확인해주세요.'}
            {!allRequiredAgreed && allTermsViewed && '모든 약관에 동의해주세요.'}
            {allRequiredAgreed && !allTermsViewed && '모든 약관 내용을 확인해주세요.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default TermsAgreement;

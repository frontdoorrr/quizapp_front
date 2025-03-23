/**
 * 약관 내용을 로드하는 유틸리티 함수
 */

/**
 * 지정된 약관 파일을 불러옵니다.
 * @param {string} termType - 약관 유형 (termsOfService, privacyPolicy, dataCollection)
 * @returns {Promise<string>} - 약관 내용을 담은 Promise
 */
export const loadTerms = async (termType) => {
  try {
    const response = await fetch(`/terms/${termType}.md`);
    if (!response.ok) {
      throw new Error(`약관을 불러오는데 실패했습니다: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('약관 로딩 오류:', error);
    return '약관 내용을 불러올 수 없습니다. 나중에 다시 시도해주세요.';
  }
};

/**
 * 모든 약관 내용을 불러옵니다.
 * @returns {Promise<Object>} - 모든 약관 내용을 담은 객체
 */
export const loadAllTerms = async () => {
  try {
    const [termsOfService, privacyPolicy, dataCollection] = await Promise.all([
      loadTerms('termsOfService'),
      loadTerms('privacyPolicy'),
      loadTerms('dataCollection')
    ]);
    
    return {
      termsOfService,
      privacyPolicy,
      dataCollection
    };
  } catch (error) {
    console.error('약관 로딩 오류:', error);
    return {
      termsOfService: '이용약관을 불러올 수 없습니다.',
      privacyPolicy: '개인정보 처리방침을 불러올 수 없습니다.',
      dataCollection: '데이터 수집 동의를 불러올 수 없습니다.'
    };
  }
};

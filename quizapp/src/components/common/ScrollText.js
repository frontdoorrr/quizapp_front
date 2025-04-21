import React from 'react';
import { useInView } from 'react-intersection-observer';
import noneMainLogo from '../../assets/logos/none_main_logo.png';
import '../../styles/ScrollText.css';

function ScrollText({ children }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="scroll-text-wrapper">
      <div ref={ref} className={`scroll-text ${inView ? "visible" : "hidden"}`}>
        <img src={noneMainLogo} alt="GENIUS GAME" className="main-logo" />
        <p className="signup-text" style={{textAlign: 'center', wordBreak: 'keep-all', marginTop: '15px'}}>
          첫 <span style={{color: '#d8c27c'}}>게임</span>의 도전자가 되어보세요.
        </p>
        <p className="signup-text" style={{textAlign: 'center', wordBreak: 'keep-all'}}>
          정해진 규칙에 따라 <span style={{color: '#d8c27c'}}>회원가입</span>이 종료됩니다.
        </p>
      </div>
      {children}
    </div>
  );
}

export default ScrollText;

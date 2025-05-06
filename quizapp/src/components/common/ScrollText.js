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
          제 <span style={{color: '#d8c27c'}}>2게임</span> 이 곧 시작됩니다.
        </p>
        {/* <p className="signup-text" style={{textAlign: 'center', wordBreak: 'keep-all'}}>
          참여해주셔서 <span style={{color: '#d8c27c'}}>감사</span>합니다.
        </p> */}
      </div>
      {children}
    </div>
  );
}

export default ScrollText;

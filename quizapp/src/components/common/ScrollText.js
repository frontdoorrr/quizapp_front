import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/ScrollText.css';

function ScrollText({ children }) {
  const [ref, inView] = useInView({
    threshold: 0.1, // 스크롤 감지 임계치
    triggerOnce: true,
  });

  return (
    <div className="scroll-text-wrapper">
          <div ref={ref} className={`scroll-text ${inView ? "visible" : "hidden"}`}>
        <h6>당신의 실력을 증명하세요. 곧 제 1게임이 시작됩니다.</h6>
        <h1>GENIUS GAME</h1>
      </div>
      {children} {/* 자식 요소를 여기에 렌더링 */}
    </div>
  );
}

export default ScrollText;

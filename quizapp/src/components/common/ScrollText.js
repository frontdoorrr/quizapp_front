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
      </div>
      {children}
    </div>
  );
}

export default ScrollText;

import React, { useEffect } from 'react';
import '../styles/About.css';

function About() {
  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">About GENIUS GAME</h1>
      <div className="content-container">
        <h3>Overview</h3>
        <h6>Welcome to our GENIUS GAME! Test your knowledge and challenge yourself.</h6>
        <h3>ABOUT GAME</h3>
        <h6>Welcome to our GENIUS GAME! Test your knowledge and challenge yourself.</h6>
        <h3>Coin AND Point</h3>
        <h6>Welcome to our GENIUS GAME! Test your knowledge and challenge yourself.</h6>
      </div>
    </div>
  );
}

export default About;

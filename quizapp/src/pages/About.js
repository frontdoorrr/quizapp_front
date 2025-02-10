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
      <div className="content-grid">
        <div className="content-box">
          <h3>Overview</h3>
          <h6>
            이 게임을 참여하는 당신은 플레이어입니다.<br></br>
            당신은 제시된 게임을 풀고, 점수를 획득할 수 있습니다.<br></br>
            게임의 종류와 규칙은, 매번 달라집니다.<br></br>
          </h6>
        </div>

        <div className="content-box">
          <h3>Game Type</h3>
          <h6>
            게임 공개와 함께 업데이트됩니다.<br></br>
          </h6>
        </div>

        <div className="content-box">
          <h3>Point</h3>
          <h6>
            랭킹 산정을 위해 문제를 맞추면 포인트가 지급됩니다. <br></br>
            게임 종료 후 해당 게임의 규칙에 따라 포인트가 차등지급됩니다.<br></br>
          </h6>
        </div>

        <div className="content-box">
          <h3>Coin</h3>
          <h6>
            Genius Game 접속 시 2코인이 지급됩니다.<br></br>
            사용자는 최대 5코인까지 보유할 수 있습니다.<br></br>
            게임 진행을 위해서 코인이 필요합니다.<br></br>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default About;

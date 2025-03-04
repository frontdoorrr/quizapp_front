import React, { useEffect } from 'react';
import '../styles/About.css';

function About() {
  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, );

  return (
    <div className="page-container">
      <h1 className="page-title">About GENIUS GAME</h1>
      <div className="content-grid">
        <div className="content-box">
          <h3>Overview</h3>
          <h6>
            이 게임을 참여하는 당신은 플레이어입니다.<br></br>
            당신은 제시된 게임을 풀고, 점수를 획득할 수 있습니다.<br></br>
          </h6>
        </div>

        <div className="content-box">
          <h3>게임의 시작</h3>
          <h6>
          게임은 예고 된 시간 또는 예고되지 않은 시간에 시작될 수 있습니다.<br></br>
          </h6>
        </div>

        <div className="content-box">
          <h3>게임 플레이</h3>
          <h6>
          게임이 시작되면, 모든 플레이어에게 정답을 제출할 수 있는 기회가 부여되며, 기회가 모두 소진되기 전에 문제를 해결한다면 정답자가 될 수 있습니다. <br></br>
          </h6>
        </div>
        <div className="content-box">
          <h3>게임의 종료</h3>
          <h6>
          게임은 첫 번째 정답자가 발생하면 일정 시간 후 자동 종료 됩니다. 하지만 이 규칙 또한 게임에 따라 변경될 수 있습니다. <br></br>
          </h6>
        </div>  

        {/* <div className="content-box">
          <h3>코인</h3>
          <h6>
            해당 기능은 추후 업데이트됩니다.<br></br>
            
          </h6> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default About;

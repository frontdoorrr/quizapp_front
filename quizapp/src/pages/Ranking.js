import React from 'react';
import '../styles/Ranking.css';

function Ranking() {
  return (
    <div className="page-container">
      <h1 className="page-title">RANKING</h1>
      <div className="content-container ranking-content">
        <div className="ranking-list">
          <div className="ranking-item">
            <span className="rank">1</span>
            <span className="username">JOHN DOE</span>
            <span className="score">95.5</span>
          </div>
          <div className="ranking-item">
            <span className="rank">2</span>
            <span className="username">JANE SMITH</span>
            <span className="score">92.0</span>
          </div>
          <div className="ranking-item">
            <span className="rank">3</span>
            <span className="username">ALEX WILSON</span>
            <span className="score">88.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;

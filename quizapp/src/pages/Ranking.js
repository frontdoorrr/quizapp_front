import React, { useState, useEffect } from 'react';
import TotalRanking from '../components/ranking/TotalRanking';
import GameRanking from '../components/ranking/GameRanking';
import '../styles/Ranking.css';

function Ranking() {
  const [activeTab, setActiveTab] = useState('total');

  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">RANKING</h1>
      <div className="content-container ranking-content">
        <div className="ranking-tabs">
          <button
            className={`tab-button ${activeTab === 'total' ? 'active' : ''}`}
            onClick={() => setActiveTab('total')}
          >
            TOTAL RANKING
          </button>
          <button
            className={`tab-button ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            GAME RANKING
          </button>
        </div>
        
        <div className="ranking-container">
          {activeTab === 'total' ? <TotalRanking /> : <GameRanking />}
        </div>
      </div>
    </div>
  );
}

export default Ranking;

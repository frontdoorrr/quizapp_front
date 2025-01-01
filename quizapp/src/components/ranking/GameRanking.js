import React from 'react';
import RankingTable from './RankingTable';

// 임시 데이터 (10명)
const mockGameRankings = [
  { id: 1, username: "SPEED MASTER", score: 2500 },
  { id: 2, username: "QUICK MIND", score: 2350 },
  { id: 3, username: "FAST THINKER", score: 2200 },
  { id: 4, username: "QUIZ SOLVER", score: 2100 },
  { id: 5, username: "GAME PLAYER", score: 2000 },
  { id: 6, username: "QUICK SOLVER", score: 1900 },
  { id: 7, username: "GAME MASTER", score: 1850 },
  { id: 8, username: "SPEED RUNNER", score: 1800 },
  { id: 9, username: "QUIZ ACE", score: 1750 },
  { id: 10, username: "GAME PRO", score: 1700 },
];

function GameRanking() {
  return (
    <div className="ranking-section">
      <h2 className="ranking-title">GAME RANKING</h2>
      <p className="ranking-description">
        Highest scores in quiz games
      </p>
      <RankingTable rankings={mockGameRankings} type="game" />
    </div>
  );
}

export default GameRanking;

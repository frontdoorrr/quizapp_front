import React from 'react';
import RankingTable from './RankingTable';

// 임시 데이터 (10명)
const mockTotalRankings = [
  { id: 1, username: "MASTER QUIZ", score: "955" },
  { id: 2, username: "QUIZ KING", score: "920" },
  { id: 3, username: "QUIZ PRO", score: "885" },
  { id: 4, username: "QUIZ EXPERT", score: "870" },
  { id: 5, username: "QUIZ MASTER", score: "855" },
  { id: 6, username: "QUIZ WIZARD", score: "840" },
  { id: 7, username: "QUIZ CHAMPION", score: "825" },
  { id: 8, username: "QUIZ GENIUS", score: "810" },
  { id: 9, username: "QUIZ STAR", score: "795" },
  { id: 10, username: "QUIZ PLAYER", score: "780" },
];

function TotalRanking() {
  return (
    <div className="ranking-section">
      <h2 className="ranking-title">TOTAL RANKING</h2>
      <p className="ranking-description">
        Overall performance across all quizzes
      </p>
      <RankingTable rankings={mockTotalRankings} type="total" />
    </div>
  );
}

export default TotalRanking;

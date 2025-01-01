import React from 'react';
import '../../styles/RankingTable.css';

function RankingTable({ rankings, type }) {
  return (
    <div className="ranking-table">
      <div className="ranking-header">
        <span className="rank-header">RANK</span>
        <span className="username-header">USERNAME</span>
        <span className="score-header">SCORE</span>
      </div>
      <div className="ranking-list">
        {rankings && rankings.map((user, index) => (
          <div key={user.id} className="ranking-item">
            <span className="rank">
              {index + 1}
              {index < 3 && <span className="crown">👑</span>}
            </span>
            <span className="username">{user.username}</span>
            <span className="score">{type === 'game' ? `${user.score} pts` : user.score}</span>
          </div>
        ))}
        {!rankings?.length && (
          <div className="no-rankings">No rankings available yet.</div>
        )}
      </div>
    </div>
  );
}

export default RankingTable;

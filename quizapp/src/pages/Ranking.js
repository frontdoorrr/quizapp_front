import React, { useState, useEffect } from 'react';
import { rankingService } from '../api/services/rankingService';
import '../styles/Ranking.css';

function Ranking() {
  const [activeTab, setActiveTab] = useState('total');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
    fetchRankings();
  }, [activeTab]); // activeTab이 변경될 때마다 다시 fetch

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const params = {
        order_by: 'point',
        order: 'desc'
      };
      
      const response = await rankingService.getRankings(params);
      console.log('Fetched rankings response:', response);

      // API 응답이 배열이 아닌 경우, users 필드를 사용하거나 객체를 배열로 변환
      const rankingsArray = Array.isArray(response) ? response :
                          response.users ? response.users :
                          Object.values(response);

      console.log('Processed rankings:', rankingsArray);
      setRankings(rankingsArray);
    } catch (err) {
      console.error('Fetch rankings error:', err);
      setError(err.message || '랭킹을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getCrownColor = (rank) => {
    switch(rank) {
      case 1: return '👑'; // 금관
      case 2: return '👑'; // 은관
      case 3: return '👑'; // 동관
      default: return null;
    }
  };

  const renderRankings = () => {
    if (!Array.isArray(rankings)) {
      console.error('Rankings is not an array:', rankings);
      return <div className="no-rankings">랭킹 데이터 형식이 올바르지 않습니다.</div>;
    }

    if (rankings.length === 0) {
      return <div className="no-rankings">랭킹 데이터가 없습니다.</div>;
    }

    return rankings.map((user, index) => {
      const rank = index + 1;
      const crown = getCrownColor(rank);

      return (
        <div key={user.id || index} className={`ranking-item ${rank <= 3 ? `top-${rank}` : ''}`}>
          <div className="rank">
            {rank}
            {crown && <span className={`crown rank-${rank}`}>{crown}</span>}
          </div>
          <div className="username">{user.nickname || user.email || 'STRING'}</div>
          <div className="score">{user.point || 0}</div>
        </div>
      );
    });
  };

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
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="ranking-list">
              {renderRankings()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ranking;

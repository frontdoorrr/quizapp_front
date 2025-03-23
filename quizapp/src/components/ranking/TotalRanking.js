import React, { useState, useEffect } from 'react';
import RankingTable from './RankingTable';
import { rankingService } from '../../api/services/rankingService';

// 임시 데이터 (로딩 중이거나 오류 발생 시 대체 표시용)
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
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTotalRankings();
  }, []);

  // 전체 랭킹 데이터 가져오기
  const fetchTotalRankings = async () => {
    try {
      setLoading(true);
      const params = {
        order_by: 'point',
        order: 'desc'
      };

      const response = await rankingService.getTotalRankings(params);
      console.log('Fetched total rankings response:', response);

      // API 응답이 배열인 경우 그대로 사용
      // 배열이 아닌 경우 적절한 변환 처리
      let rankingsArray;
      if (Array.isArray(response)) {
        rankingsArray = response;
      } else if (response.users) {
        rankingsArray = response.users;
      } else {
        rankingsArray = Object.values(response);
      }

      console.log('Processed total rankings:', rankingsArray);
      setRankings(rankingsArray);
    } catch (err) {
      console.error('Fetch total rankings error:', err);
      setError(err.message || '랭킹을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ranking-section">
      <h2 className="ranking-title">TOTAL RANKING</h2>
      <p className="ranking-description">
        Overall performance across all quizzes
      </p>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <RankingTable rankings={rankings.length > 0 ? rankings : mockTotalRankings} type="total" />
      )}
    </div>
  );
}

export default TotalRanking;

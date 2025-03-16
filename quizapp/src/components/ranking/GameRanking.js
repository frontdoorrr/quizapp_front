import React, { useState, useEffect } from 'react';
import RankingTable from './RankingTable';
import { rankingService } from '../../api/services/rankingService';

// 임시 데이터 (로딩 중이거나 오류 발생 시 대체 표시용)
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
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);

  useEffect(() => {
    // 현재 게임 정보 가져오기
    fetchCurrentGame();
  }, []);

  useEffect(() => {
    // 게임 ID가 있을 때만 랭킹 데이터 가져오기
    if (currentGameId) {
      fetchGameRankings(currentGameId);
    }
  }, [currentGameId]);

  // 현재 게임 정보 가져오기
  const fetchCurrentGame = async () => {
    try {
      const gameData = await rankingService.getCurrentGame();
      console.log('Current game data:', gameData);
      
      if (gameData && gameData.id) {
        setCurrentGameId(gameData.id);
      } else {
        console.error('No game ID found in the response');
        setError('현재 진행중인 게임을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error('Fetch current game error:', err);
      setError(err.message || '현재 게임 정보를 가져오는데 실패했습니다.');
    }
  };

  // 게임 랭킹 데이터 가져오기
  const fetchGameRankings = async (gameId) => {
    try {
      setLoading(true);
      
      if (!gameId) {
        throw new Error('게임 ID가 필요합니다.');
      }

      const response = await rankingService.getGameRankings(gameId);
      console.log('Fetched game rankings response:', response);

      // 응답이 배열인지 확인
      let rankingsArray = Array.isArray(response) ? response : 
                         (response.users ? response.users : Object.values(response));
      
      // 응답 데이터 형식에 맞게 가공
      // API 응답 예시:
      // {
      //   "id": "01JNNNC7FYJYM6AJQ1PDS9STN5",
      //   "game_id": "01JNJXS08YVV10NHH6NG4HFKAX",
      //   "user_id": "01JNGG6B1WVQVR4X5VDFKFXQF8",
      //   "answer": "string",
      //   "is_correct": true,
      //   "solved_at": "2025-03-08T01:31:54.369053",
      //   "created_at": "2025-03-06T12:02:40.752733",
      //   "updated_at": "2025-03-08T01:31:54.369053",
      //   "point": 0,
      //   "user": {
      //     "id": "01JNGG6B1WVQVR4X5VDFKFXQF8",
      //     "name": "",
      //     "nickname": "heyheyhey"
      //   }
      // }
      const processedRankings = rankingsArray.map(item => ({
        id: item.id,
        username: item.user?.nickname || item.user?.name || 'who',
        score: item.point || 0,
        // 원본 데이터도 유지
        originalData: item
      }));

      console.log('Processed game rankings:', processedRankings);
      setRankings(processedRankings);
    } catch (err) {
      console.error('Fetch game rankings error:', err);
      setError(err.message || '게임 랭킹을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ranking-section">
      <h2 className="ranking-title">GAME RANKING</h2>
      <p className="ranking-description">
        Highest scores in quiz games
      </p>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <RankingTable rankings={rankings.length > 0 ? rankings : mockGameRankings} type="game" />
      )}
    </div>
  );
}

export default GameRanking;

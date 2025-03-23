import React, { useState, useEffect } from 'react';
import RankingTable from './RankingTable';
import { rankingService } from '../../api/services/rankingService';

// 임시 데이터 (로딩 중이거나 오류 발생 시 대체 표시용)
const mockGameRankings = [
  { id: 1, username: "랭킹 1위", score: 2500 },
  { id: 2, username: "랭킹 2위", score: 2350 },
  { id: 3, username: "랭킹 3위", score: 2200 },
  { id: 4, username: "랭킹 4위", score: 2100 },
  { id: 5, username: "랭킹 5위", score: 2000 },
  { id: 6, username: "랭킹 6위", score: 1900 },
  { id: 7, username: "랭킹 7위", score: 1850 },
  { id: 8, username: "랭킹 8위", score: 1800 },
  { id: 9, username: "랭킹 9위", score: 1750 },
  { id: 10, username: "랭킹 10위", score: 1700 },
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
      if (!response || !Array.isArray(response)) {
        console.error('Invalid response format. Expected array:', response);
        setRankings([]);
        setLoading(false);
        return;
      }
      
      // 응답 데이터 형식에 맞게 가공
      const processedRankings = response.map((item, index) => {
        console.log(`Processing item ${index}:`, item);
        
        // user 객체 확인
        if (!item.user) {
          console.error(`Item ${index} has no user object:`, item);
          return {
            id: item.id || `temp-${index}`,
            username: '사용자 정보 없음',
            score: item.point || 0,
            originalData: item
          };
        }
        
        // nickname 확인
        const nickname = item.user.nickname;
        console.log(`Item ${index} nickname:`, nickname);
        
        return {
          id: item.id || `temp-${index}`,
          username: nickname || '이름 없음',
          score: item.point || 0,
          originalData: item
        };
      });

      console.log('Final processed rankings:', processedRankings);
      setRankings(processedRankings);
    } catch (err) {
      console.error('Fetch game rankings error:', err);
      setError(err.message || '게임 랭킹을 불러오는데 실패했습니다.');
      setRankings([]);
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
        <RankingTable rankings={rankings} type="game" />
      )}
    </div>
  );
}

export default GameRanking;

import React, { useState, useEffect } from 'react';
import { rankingService } from '../api/services/rankingService';
import { useNavigate } from 'react-router-dom';
import '../styles/Ranking.css';

function Ranking() {
  const [activeTab, setActiveTab] = useState('total');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/ranking' } });
      return;
    }

    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
    
    // 현재 게임 정보 가져오기
    fetchCurrentGame();
    
    // 탭에 따라 다른 API 호출
    if (activeTab === 'total') {
      fetchTotalRankings();
    } else if (activeTab === 'game') {
      if (currentGameId) {
        fetchGameRankings(currentGameId);
      } else {
        // 게임 ID가 없는 경우 먼저 게임 정보를 가져온 후 랭킹 조회
        fetchCurrentGame().then(() => {
          if (currentGameId) {
            fetchGameRankings(currentGameId);
          }
        });
      }
    }
  }, [activeTab, navigate, currentGameId]);

  // 현재 게임 정보 가져오기
  const fetchCurrentGame = async () => {
    try {
      const gameData = await rankingService.getCurrentGame();
      console.log('Current game data:', gameData);
      
      if (gameData && gameData.id) {
        setCurrentGameId(gameData.id);
        return gameData.id;
      } else {
        console.error('No game ID found in the response');
        const customError = new Error('현재 진행중인 게임을 찾을 수 없습니다.');
        customError.code = 'NO_CURRENT_GAME';  // 커스텀 코드 추가
        handleFetchError(customError);
        return null;
      }
    } catch (err) {
      console.error('Fetch current game error:', err);
      handleFetchError(err);
      return null;
    }
  };

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

      // API 응답이 배열이 아닌 경우, users 필드를 사용하거나 객체를 배열로 변환
      const rankingsArray = Array.isArray(response) ? response :
                          response.users ? response.users :
                          Object.values(response);

      console.log('Processed total rankings:', rankingsArray);
      setRankings(rankingsArray);
    } catch (err) {
      console.error('Fetch total rankings error:', err);
      handleFetchError(err);
    } finally {
      setLoading(false);
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

      // API 응답이 배열이 아닌 경우, users 필드를 사용하거나 객체를 배열로 변환
      const rankingsArray = Array.isArray(response) ? response :
                          response.users ? response.users :
                          Object.values(response);

      console.log('Processed game rankings:', rankingsArray);
      setRankings(rankingsArray);
    } catch (err) {
      console.error('Fetch game rankings error:', err);
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  // 기존 fetchRankings 함수는 하위 호환성을 위해 유지
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
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  // 에러 처리 공통 함수
  const handleFetchError = (err) => {
    if (err.response && err.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      localStorage.removeItem('token');
      navigate('/login', { state: { from: '/ranking' } });
    } else if (err.code === 'NO_CURRENT_GAME') {
      // 현재 진행 중인 게임이 없는 경우 특별 처리
      setError(err.message);
      // 게임 탭을 선택한 상태에서 게임이 없는 경우 전체 랭킹으로 전환
      if (activeTab === 'game') {
        setActiveTab('total');
      }
    } else {
      setError(err.message || '랭킹을 불러오는데 실패했습니다.');
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
      
      // 게임 랭킹과 전체 랭킹에 따라 표시할 점수 필드 결정
      // 게임 랭킹은 score 또는 point 필드 사용 (API 응답에 따라 다를 수 있음)
      const scoreField = activeTab === 'game' ? (user.score !== undefined ? 'score' : 'point') : 'point';
      const scoreValue = user[scoreField] || 0;

      // user 객체 확인 (게임 랭킹의 경우 user 객체 내에 nickname이 있을 수 있음)
      let displayName = '이름 없음';
      
      if (user.user && user.user.nickname) {
        // 게임 랭킹 API 응답 형식 (user 객체 내에 nickname이 있는 경우)
        displayName = user.user.nickname;
      } else if (user.nickname) {
        // 일반적인 경우 (user 객체 자체에 nickname이 있는 경우)
        displayName = user.nickname;
      } else if (user.email) {
        // 이메일이 있는 경우
        displayName = user.email;
      } else if (user.username) {
        // username이 있는 경우
        displayName = user.username;
      }

      return (
        <div key={user.id || index} className={`ranking-item ${rank <= 3 ? `top-${rank}` : ''}`}>
          <div className="rank">
            {rank}
          </div>
          <div className="username">{displayName}</div>
          <div className="score">{scoreValue}</div>
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

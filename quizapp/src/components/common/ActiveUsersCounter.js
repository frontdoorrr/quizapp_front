import React, { useState, useEffect } from 'react';
import '../../styles/ActiveUsersCounter.css';
import { rankingService } from '../../api/services/rankingService';

const ActiveUsersList = ({ apiUrl = process.env.REACT_APP_API_BASE_URL }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [currentGameId, setCurrentGameId] = useState(null);

  // 활성 사용자 목록 가져오기 함수
  const fetchActiveUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/active-users/list`);
      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }
      
      const data = await response.json();
      setActiveUsers(data.users || []);
    } catch (error) {
      console.error('활성 사용자 목록 조회 실패:', error);
      setActiveUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 초기 로드
    fetchActiveUsers();
    
    // 30초마다 갱신
    const interval = setInterval(fetchActiveUsers, 30000);
    console.log('활성 사용자 목록 갱신 간격 설정: 30초');
    
    return () => {
      console.log('활성 사용자 목록 갱신 중단');
      clearInterval(interval);
    };
  }, [apiUrl]);

  // 게임 랭킹 데이터 가져오기 함수
  const fetchGameRankings = async () => {
    try {
      console.log('게임 랭킹 데이터 가져오기 시작');
      setRankingLoading(true);
      
      // 1. 현재 게임 정보 가져오기
      const gameData = await rankingService.getCurrentGame();
      if (gameData && gameData.id) {
        setCurrentGameId(gameData.id);
        console.log(`현재 게임 ID: ${gameData.id}`);
        
        // 2. 게임 랭킹 데이터 가져오기
        const response = await rankingService.getGameRankings(gameData.id);
        
        // API 응답이 배열이 아닌 경우, users 필드를 사용하거나 객체를 배열로 변환
        const rankingsArray = Array.isArray(response) ? response :
                            response.users ? response.users :
                            Object.values(response);
        
        // 상위 5개만 표시
        setRankings(rankingsArray.slice(0, 5));
        console.log(`랭킹 데이터 ${rankingsArray.length}개 중 5개 로드 완료`);
      }
    } catch (error) {
      console.error('게임 랭킹 조회 실패:', error);
      setRankings([]);
    } finally {
      setRankingLoading(false);
    }
  };
  
  // 랭킹 데이터는 컴포넌트 마운트 시 한 번만 가져옴
  useEffect(() => {
    fetchGameRankings();
    
    // 컴포넌트 언마운트 시 로그 출력
    return () => {
      console.log('랭킹 컴포넌트 언마운트');
    };
  }, []); // 빈 의존성 배열로 한 번만 실행
  
  // 시간 포맷팅 함수
  const formatTime = (timestamp) => {
    if (!timestamp) return '알 수 없음';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch (e) {
      return '알 수 없음';
    }
  };
  
  return (
    <div className="stats-container">
      {/* 현재 접속자 목록 */}
      <div className="stats-box">
        <h3 className="stats-title">온라인 플레이어 [{activeUsers.length}명]</h3>
        <div className="active-users-wrapper">
          {loading ? (
            <p className="empty-message">로딩 중...</p>
          ) : activeUsers.length > 0 ? (
            <ul className="users-list">
              {activeUsers.map((user) => (
                <li className="active-users-item" key={user.id}>
                  <span className="user-name">{user.nickname || user.name || `사용자 ${user.id}`}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">현재 접속자가 없습니다</p>
          )}
        </div>
      </div>
      
      {/* 게임 랭킹 */}
      <div className="stats-box">
        <h3 className="stats-title">게임 랭킹</h3>
        {rankingLoading ? (
          <p className="empty-message">랭킹 로딩 중...</p>
        ) : rankings.length > 0 ? (
          <ul className="active-users-ranking-list">
            {rankings.map((item, index) => (
              <li className="active-users-ranking-item" key={index}>
                <span className="rank">{index + 1}</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span className="player-name">
                    {item.user?.nickname || item.nickname || item.name || `사용자 ${item.user_id || item.id}`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">랭킹 정보가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default ActiveUsersList;

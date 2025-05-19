import React, { useState, useEffect } from 'react';
import '../../styles/ActiveUsersCounter.css';



const ActiveUsersList = ({ apiUrl = process.env.REACT_APP_API_BASE_URL }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/active-users/list`);
        if (!response.ok) {
          throw new Error('서버 응답 오류');
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
    
    // 초기 로드
    fetchActiveUsers();
    
    // 30초마다 갱신
    const interval = setInterval(fetchActiveUsers, 30000);
    
    return () => clearInterval(interval);
  }, [apiUrl]);
  
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
    <div className="active-users-wrapper">
      <h3 className="active-users-title">현재 접속자 : {activeUsers.length}명</h3>
      
      {loading ? (
        <p className="empty-message">로딩 중...</p>
      ) : activeUsers.length > 0 ? (
        <ul className="users-list">
          {activeUsers.map((user) => (
            <li className="user-item" key={user.id}>
              <span className="user-name">{user.nickname || user.name || `사용자 ${user.id}`}</span>
              <span className="last-activity"> {formatTime(user.last_activity)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">현재 접속자가 없습니다</p>
      )}
    </div>
  );
};

export default ActiveUsersList;

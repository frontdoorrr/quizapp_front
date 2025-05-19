import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ActiveUsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 15px;
  background-color: rgba(28, 22, 22, 0.7);
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const ActiveUsersTitle = styled.h3`
  font-family: 'MaruBuri', serif;
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 10px;
`;

const UsersList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  word-break: keep-all;
`;

const UserItem = styled.li`
  font-family: 'MaruBuri', serif;
  font-size: 0.9rem;
  color: #fff;
  padding: 8px 5px;
  border-bottom: 1px solid rgba(216, 194, 124, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  &:last-child {
    border-bottom: none;
  }
`;

const UserName = styled.span`
  color: #d8c27c;
  font-weight: bold;
`;

const LastActivity = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const EmptyMessage = styled.p`
  font-family: 'MaruBuri', serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 10px 0;
`;

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
    <ActiveUsersWrapper>
      <ActiveUsersTitle>현재 접속자 목록 ({activeUsers.length}명)</ActiveUsersTitle>
      
      {loading ? (
        <EmptyMessage>로딩 중...</EmptyMessage>
      ) : activeUsers.length > 0 ? (
        <UsersList>
          {activeUsers.map((user) => (
            <UserItem key={user.id}>
              <UserName>{user.nickname || user.name || `사용자 ${user.id}`}</UserName>
              <LastActivity>마지막 활동: {formatTime(user.last_activity)}</LastActivity>
            </UserItem>
          ))}
        </UsersList>
      ) : (
        <EmptyMessage>현재 접속자가 없습니다</EmptyMessage>
      )}
    </ActiveUsersWrapper>
  );
};

export default ActiveUsersList;

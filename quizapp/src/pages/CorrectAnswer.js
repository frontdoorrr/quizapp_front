import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'MaruBuri', serif;
  font-size: 2.5rem;
  color: #d8c27c;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-family: 'MaruBuri', serif;
  font-size: 1.5rem;
  margin: 10px 0;
`;

const Points = styled.div`
  font-family: 'MaruBuri', serif;
  font-size: 2rem;
  color: #d8c27c;
  margin: 20px 0;
`;

const NextButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-family: 'MaruBuri', serif;
  background-color: #d8c27c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background-color: #c4af6e;
  }
`;

function CorrectAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { points } = location.state || { points: 0 };

  useEffect(() => {
    // 3초 후 자동으로 다음 게임으로 이동
    const timer = setTimeout(() => {
      handleNextGame();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextGame = () => {
    navigate('/game');
  };

  return (
    <Container>
      <Title>정답입니다! 🎉</Title>
      <Message>축하합니다!</Message>
      <Points>+{points} 포인트</Points>

    </Container>
  );
}

export default CorrectAnswer;

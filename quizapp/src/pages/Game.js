import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VideoPlayer from '../components/game/VideoPlayer';
import '../styles/Game.css';
import { getCurrentGame } from '../api/services/gameService';

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const AnswerForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

const AnswerInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  font-family: 'MaruBuri', serif;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 3;
  min-width: 0;
  background: transparent;
  color: white;

  &:focus {
    outline: none;
    border-color: #d8c27c;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'MaruBuri', serif;
  background-color: #d8c27c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 100px;
  white-space: nowrap;

  &:hover {
    background-color: #c4af6e;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function Game() {
  const [game, setGame] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getCurrentGame();
        console.log('Received game data:', data);
        console.log('Video URL:', data.question_link);
        // 응답 헤더도 확인
        console.log('Response headers:', data.headers);
        setGame(data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: 정답 제출 API 연동
      console.log('제출된 정답:', answer);
      setAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="game-container">
      {game && <VideoPlayer videoUrl={game.question_link} />}
      <AnswerSection>
        <AnswerForm onSubmit={handleSubmit}>
          <AnswerInput
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            disabled={isSubmitting}
          />
          <SubmitButton type="submit" disabled={isSubmitting || !answer.trim()}>
            {isSubmitting ? '제출 중...' : 'Submit'}
          </SubmitButton>
        </AnswerForm>
      </AnswerSection>
      {/* 추가적인 게임 관련 컴포넌트들이 여기에 위치하게 됩니다 */}
    </div>
  );
}

export default Game;

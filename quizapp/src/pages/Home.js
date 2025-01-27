import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentGame, submitAnswer } from '../services/api';
import VideoPlayer from '../components/game/VideoPlayer';
import AnswerForm from '../components/game/AnswerForm';

const GameContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const FeedbackMessage = styled.div`
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease-in;

  ${({ type }) => type === 'success' && `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}

  ${({ type }) => type === 'error' && `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorMessage = styled.div`
  color: #721c24;
  text-align: center;
  margin: 20px;
  padding: 10px;
`;

function Home() {
  const [currentGame, setCurrentGame] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const fetchCurrentGame = async () => {
    try {
      setError(null);
      const game = await getCurrentGame();
      setCurrentGame(game);
    } catch (err) {
      setError('게임을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      console.error('Error fetching game:', err);
    }
  };

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const handleSubmitAnswer = async (answer) => {
    setIsSubmitting(true);
    setFeedback(null);
    
    try {
      const result = await submitAnswer(currentGame.id, answer);
      setFeedback({
        type: result.is_correct ? 'success' : 'error',
        message: result.is_correct 
          ? `정답입니다! ${result.point}포인트를 획득하셨습니다.`
          : '틀렸습니다. 다시 시도해보세요.',
      });

      if (result.is_correct) {
        // 잠시 후 새로운 게임 불러오기
        setTimeout(() => {
          fetchCurrentGame();
          setFeedback(null);
        }, 3000);
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: '답변 제출에 실패했습니다. 다시 시도해주세요.',
      });
      console.error('Error submitting answer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!currentGame) {
    return <div>Loading...</div>;
  }

  return (
    <GameContainer>
      <VideoPlayer videoUrl={currentGame.videoUrl} />
      <AnswerForm onSubmit={handleSubmitAnswer} isSubmitting={isSubmitting} />
      {feedback && (
        <FeedbackMessage type={feedback.type}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </GameContainer>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import VideoPlayer from '../components/game/VideoPlayer';
import '../styles/Game.css';
import { getCurrentGame, submitAnswer, getAnswerByGame } from '../api/services/gameService';

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

const FeedbackMessage = styled.div`
  margin-top: 10px;
  font-family: 'MaruBuri', serif;
  color: ${props => props.isCorrect ? '#4CAF50' : '#f44336'};
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const CorrectAnswerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CorrectTitle = styled.h1`
  font-family: 'MaruBuri', serif;
  font-size: 2.5rem;
  color: #d8c27c;
  margin-bottom: 20px;
  animation: ${scaleIn} 0.7s ease-out;
`;

const CorrectMessage = styled.p`
  font-family: 'MaruBuri', serif;
  font-size: 1.5rem;
  margin: 10px 0;
  animation: ${slideUp} 0.5s ease-out 0.3s backwards;
`;

const Points = styled.div`
  font-family: 'MaruBuri', serif;
  font-size: 2rem;
  color: #d8c27c;
  margin: 20px 0;
  animation: ${slideUp} 0.5s ease-out 0.5s backwards;
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
  animation: ${slideUp} 0.5s ease-out 0.7s backwards;

  &:hover {
    background-color: #c4af6e;
  }
`;

function Game() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: null });
  const [showCorrectScreen, setShowCorrectScreen] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [previousAnswer, setPreviousAnswer] = useState(null);

  useEffect(() => {
    const fetchGameAndAnswer = async () => {
      try {
        const gameData = await getCurrentGame();
        setGame(gameData);

        // 이전 답변 확인
        const answerData = await getAnswerByGame(gameData.id);
        setPreviousAnswer(answerData);

        // 이미 맞춘 문제면 입력 비활성화
        if (answerData && answerData.is_correct) {
          setFeedback({
            message: `이미 맞춘 문제입니다. (획득 포인트: ${answerData.point})`,
            isCorrect: true
          });
        }
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGameAndAnswer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || !game || (previousAnswer && previousAnswer.is_correct)) return;

    setIsSubmitting(true);
    setFeedback({ message: '', isCorrect: null });

    try {
      const response = await submitAnswer(game.id, answer.trim());
      
      if (response.is_correct) {
        setEarnedPoints(response.point);
        setShowCorrectScreen(true);
        setPreviousAnswer(response);
        // 3초 후 자동으로 다음 게임 불러오기
        setTimeout(loadNextGame, 3000);
      } else {
        setFeedback({
          message: '틀렸습니다. 다시 시도해주세요.',
          isCorrect: false
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setFeedback({
        message: error.message || '오류가 발생했습니다. 다시 시도해주세요.',
        isCorrect: false
      });
      setIsSubmitting(false);
    }
  };

  const loadNextGame = async () => {
    try {
      const newGame = await getCurrentGame();
      setGame(newGame);
      setAnswer('');
      setFeedback({ message: '', isCorrect: null });
      setShowCorrectScreen(false);
      setEarnedPoints(0);
      setPreviousAnswer(null);
      
      // 새 게임의 이전 답변 확인
      const answerData = await getAnswerByGame(newGame.id);
      setPreviousAnswer(answerData);
      
      if (answerData && answerData.is_correct) {
        setFeedback({
          message: `이미 맞춘 문제입니다. (획득 포인트: ${answerData.point})`,
          isCorrect: true
        });
      }
    } catch (error) {
      console.error('Error loading next game:', error);
    }
  };

  const isAnswerDisabled = isSubmitting || (previousAnswer && previousAnswer.is_correct);

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
            disabled={isAnswerDisabled}
          />
          <SubmitButton
            type="submit"
            disabled={isAnswerDisabled || !answer.trim()}
          >
            {isSubmitting ? '제출 중...' : 'Submit'}
          </SubmitButton>
        </AnswerForm>
        {feedback.message && (
          <FeedbackMessage isCorrect={feedback.isCorrect}>
            {feedback.message}
          </FeedbackMessage>
        )}
      </AnswerSection>

      {showCorrectScreen && (
        <CorrectAnswerOverlay>
          <CorrectTitle>정답입니다! 🎉</CorrectTitle>
          <CorrectMessage>축하합니다!</CorrectMessage>
          <Points>+{earnedPoints} 포인트</Points>
        </CorrectAnswerOverlay>
      )}
    </div>
  );
}

export default Game;

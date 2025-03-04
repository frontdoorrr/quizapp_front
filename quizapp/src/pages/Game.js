import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import VideoPlayer from '../components/game/VideoPlayer';
import '../styles/Game.css';
import { getCurrentGame, submitAnswer, getAnswerByGame, getRemainingChances } from '../api/services/gameService';

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

const Timer = styled.div`
  font-family: 'MaruBuri', serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-align: center;
  color: #ffffff;
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
  const [error, setError] = useState(null);
  const [isNoActiveGame, setIsNoActiveGame] = useState(false);
  const [remainingChances, setRemainingChances] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchGameAndAnswer = async () => {
      try {
        setIsNoActiveGame(false);
        setError(null);
        const gameData = await getCurrentGame();
        setGame(gameData);

        // 이전 답변 확인
        const answerData = await getAnswerByGame(gameData.id);
        setPreviousAnswer(answerData);

        // 정답을 맞추지 않은 경우에만 남은 기회 조회
        if (!answerData?.is_correct) {
          try {
            const chances = await getRemainingChances(gameData.id);
            console.log('Received chances:', chances);
            setRemainingChances(chances);
          } catch (error) {
            console.error('Failed to fetch remaining chances:', error);
          }
        }

        // 이미 맞춘 문제면 입력 비활성화
        if (answerData && answerData.is_correct) {
          setFeedback({
            message: `이미 문제를 맞추셨습니다. 다음 게임을 기다려주세요.`,
            isCorrect: true
          });
        }
      } catch (error) {
        if (error.message === 'NO_ACTIVE_GAME') {
          setIsNoActiveGame(true);
          setGame(null);
        } else {
          setError('현재 활성화된 게임이 없습니다.  오픈을 기다려주세요.');
        }
      }
    };

    fetchGameAndAnswer();
  }, []);

  useEffect(() => {
    if (game?.closed_at) {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const closedTime = new Date(game.closed_at).getTime();
        const difference = closedTime - now;

        if (difference <= 0) {
          setTimeLeft(null);
          return;
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [game]);

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
      } else {
        setFeedback({
          message: '틀렸습니다. 다시 시도해주세요.',
          isCorrect: false
        });
        // 오답인 경우에도 남은 기회 업데이트
        const updatedChances = await getRemainingChances(game.id);
        setRemainingChances(updatedChances);
        setIsSubmitting(false);
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || '오류가 발생했습니다. 다시 시도해주세요.'
      });
      // 에러 발생시에도 남은 기회 업데이트
      try {
        const updatedChances = await getRemainingChances(game.id);
        setRemainingChances(updatedChances);
      } catch (e) {
        console.error('Failed to update remaining chances:', e);
      }
      setIsSubmitting(false);
    }
  };

  const isAnswerDisabled = isSubmitting || (previousAnswer && previousAnswer.is_correct) || isNoActiveGame;

  return (
    <div className="game-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : isNoActiveGame ? (
        <div className="no-game-message">다음 게임을 기다려주세요</div>
      ) : game ? (
        <>
          {game && timeLeft && (
            <Timer>
              남은 시간: {timeLeft.hours > 0 ? `${timeLeft.hours}시간 ` : ''}
              {timeLeft.minutes}분 {timeLeft.seconds}초
            </Timer>
          )}
          <VideoPlayer videoUrl={game.question_link} />
          <AnswerSection>
            {!previousAnswer?.is_correct && (
              <div className="remaining-chances">
                남은 기회: {remainingChances}회
              </div>
            )}
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
        </>
      ) : null}
      {showCorrectScreen && (
        <CorrectAnswerOverlay>
          <CorrectTitle>정답입니다.</CorrectTitle>
          <CorrectMessage>축하합니다</CorrectMessage>
          <Points> 포인트는 게임이 모두 종료된 후 지급됩니다. </Points>
        </CorrectAnswerOverlay>
      )}
    </div>
  );
}

export default Game;

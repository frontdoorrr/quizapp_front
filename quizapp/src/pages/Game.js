import React, { useState, useEffect } from 'react';
import VideoPlayer from '../components/game/VideoPlayer';
import '../styles/Game.css';
import { getCurrentGame } from '../api/services/gameService';

function Game() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getCurrentGame();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, []);

  return (
    <div className="game-container">
      {game && <VideoPlayer videoUrl={game.question_link} />}
      {/* 추가적인 게임 관련 컴포넌트들이 여기에 위치하게 됩니다 */}
    </div>
  );
}

export default Game;

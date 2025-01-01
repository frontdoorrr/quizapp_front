import React, { useEffect } from 'react';
import '../styles/Profile.css';

function Profile() {
  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">PROFILE</h1>
      <div className="content-container profile-content">
        <div className="profile-info">
          <h2>USER INFORMATION</h2>
          <p>USERNAME: JOHN DOE</p>
          <p>EMAIL: JOHN@EXAMPLE.COM</p>
        </div>
        <div className="quiz-history">
          <h2>QUIZ HISTORY</h2>
          <p>TOTAL QUIZZES TAKEN: 10</p>
          <p>AVERAGE SCORE: 85.5</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

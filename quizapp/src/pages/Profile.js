import React from 'react';

function Profile() {
  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-content">
        <div className="profile-info">
          <h2>User Information</h2>
          <p>Username: John Doe</p>
          <p>Email: john@example.com</p>
        </div>
        <div className="quiz-history">
          <h2>Quiz History</h2>
          <p>Total Quizzes Taken: 10</p>
          <p>Average Score: 85%</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

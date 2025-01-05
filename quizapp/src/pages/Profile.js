import React, { useState, useEffect } from 'react';
import { userService } from '../api';
import '../styles/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      console.log('Fetched profile:', data);
      setProfile(data);
      setEditedProfile(data);
    } catch (err) {
      console.error('Fetch profile error:', err);
      setError(err.message || '프로필을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // 변경된 필드만 전송
      const updatedFields = {};
      if (editedProfile.nickname !== profile.nickname) {
        updatedFields.nickname = editedProfile.nickname;
      }

      console.log('Sending update with fields:', updatedFields);

      const updatedProfile = await userService.updateProfile(updatedFields);
      console.log('Profile updated:', updatedProfile);

      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
        console.error('Update profile error:', err);
        const token = localStorage.getItem('token');
        console.log('Token:', token);
      setError(err.message || '프로필 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container error">{error}</div>;
  }

  if (!profile) {
    return <div className="profile-container">프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-field">
            <label>이메일:</label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              disabled
            />
          </div>
          <div className="profile-field">
            <label>닉네임:</label>
            <input
              type="text"
              name="nickname"
              value={editedProfile.nickname || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-buttons">
            <button type="submit" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </button>
            <button type="button" onClick={handleCancel} disabled={loading}>
              취소
            </button>
          </div>
          {error && <p className="profile-error">{error}</p>}
        </form>
      ) : (
        <div className="profile-info">
          <div className="profile-field">
            <label>이메일:</label>
            <span>{profile.email}</span>
          </div>
          <div className="profile-field">
            <label>닉네임:</label>
            <span>{profile.nickname || '-'}</span>
          </div>
          <div className="profile-field">
            <label>총 점수:</label>
            <span>{profile.total_score || 0}</span>
          </div>
          <div className="profile-field">
            <label>랭킹:</label>
            <span>{profile.rank || '-'}</span>
          </div>
          <div className="profile-buttons">
            <button onClick={handleEdit}>
              프로필 수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

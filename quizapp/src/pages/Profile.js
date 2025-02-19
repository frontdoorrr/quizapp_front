import React, { useState, useEffect } from 'react';
import { userService } from '../api';
import '../styles/Profile.css';
import '../styles/Auth.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [coinCount, setCoinCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [nicknameValidation, setNicknameValidation] = useState({ isValid: true, message: '' });
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  const koreanRegex = /^[가-힣]+$/;
  const englishRegex = /^[a-zA-Z0-9]+$/;
  const mixedRegex = /^[a-zA-Z0-9가-힣]+$/;

  const validateNickname = (nickname) => {
    if (!nickname) {
      return { isValid: false, message: '닉네임을 입력해주세요.' };
    }

    if (koreanRegex.test(nickname)) {
      return {
        isValid: nickname.length >= 3 && nickname.length <= 8,
        message: '한글 닉네임은 3-8자여야 합니다.'
      };
    } else if (englishRegex.test(nickname)) {
      return {
        isValid: nickname.length >= 3 && nickname.length <= 15,
        message: '영어 닉네임은 3-15자여야 합니다.'
      };
    } else if (mixedRegex.test(nickname)) {
      const koreanCount = (nickname.match(/[가-힣]/g) || []).length;
      const nonKoreanCount = nickname.length - koreanCount;

      if (koreanCount > 8) {
        return {
          isValid: false,
          message: '한글은 최대 8자까지 사용 가능합니다.'
        };
      }

      if (nonKoreanCount > 7) {
        return {
          isValid: false,
          message: '영어/숫자는 최대 7자까지 사용 가능합니다.'
        };
      }

      return {
        isValid: nickname.length >= 3 && nickname.length <= 15,
        message: '닉네임은 3-15자여야 합니다.'
      };
    } else {
      return {
        isValid: false,
        message: '닉네임은 한글, 영어, 숫자만 사용 가능합니다.'
      };
    }
  };

  const handleNicknameCheck = async () => {
    if (!editedProfile.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const validation = validateNickname(editedProfile.nickname);
    if (!validation.isValid) {
      setNicknameValidation(validation);
      return;
    }

    try {
      const response = await userService.checkNickname(editedProfile.nickname);
      setIsNicknameAvailable(!response.exists);
      if (response.exists) {
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      alert(error.message || '닉네임 중복 확인에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    // 닉네임이 변경되었고, 중복 확인이 되지 않았다면
    if (editedProfile.nickname !== profile.nickname && !isNicknameAvailable) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    // 닉네임 유효성 검사
    const nicknameValidation = validateNickname(editedProfile.nickname);
    if (!nicknameValidation.isValid) {
      alert(nicknameValidation.message);
      return;
    }

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

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      fetchCoinWallet();
    }
  }, [profile]);

  const fetchCoinWallet = async () => {
    try {
      const response = await userService.getCoinWallet(profile.id);
      setCoinCount(response.coins?.length || 0);
    } catch (err) {
      console.error('Fetch coin wallet error:', err);
    }
  };

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
        <form onSubmit={handleSave} className="profile-form">
          <div className="profile-field">
            <label>이메일:</label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              disabled
            />
          </div>
          <div className="input-group" style={{ fontFamily: 'var(--font-primary)' }}>
            <input
              type="text"
              name="nickname"
              value={editedProfile.nickname}
              onChange={handleChange}
              placeholder="닉네임 (한글 3-8자/영어 3-15자)"
              maxLength="15"
              required
              style={{ 
                padding: '0.8rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem'
              }}
              className={`${isNicknameAvailable ? 'verified' : ''} ${
                editedProfile.nickname && !nicknameValidation.isValid ? 'invalid' : ''
              }`}
            />
            <button
              type="button"
              onClick={handleNicknameCheck}
              disabled={!editedProfile.nickname || !nicknameValidation.isValid || isNicknameAvailable}
              style={{
                padding: '10px 15px',
                backgroundColor: '#d8c27c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem'
              }}
            >
              {isNicknameAvailable ? '✓ 사용가능' : '중복확인'}
            </button>
          </div>
          {editedProfile.nickname && (
            <div 
              className={`validation-message ${nicknameValidation.isValid ? 'valid' : 'invalid'}`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {nicknameValidation.message}
            </div>
          )}
          <div className="profile-buttons" style={{ fontFamily: 'var(--font-primary)' }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                backgroundColor: '#d8c27c',
                color: 'white',
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem'
              }}
            >
              {loading ? '저장 중...' : '저장'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem'
              }}
            >
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
            <label>코인:</label>
            <span>{coinCount}</span>
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

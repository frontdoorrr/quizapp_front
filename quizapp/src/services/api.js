const API_BASE_URL = 'http://localhost:80'; // 백엔드 서버 URL을 여기에 설정

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const getCurrentGame = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/game`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to fetch current game: ' + error.message);
  }
};

export const submitAnswer = async (gameId, answer) => {
  try {
    const response = await fetch(`${API_BASE_URL}/answer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: gameId,
        answer: answer,
      }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Failed to submit answer: ' + error.message);
  }
};

export const subscribeEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const API_BASE_URL = 'http://localhost:8000'; // 백엔드 서버 URL을 여기에 설정

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

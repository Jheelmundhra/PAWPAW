const API_BASE_URL = 'http://localhost:5004/api';

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Pet endpoints
  getPets: async () => {
    const response = await fetch(`${API_BASE_URL}/pets`);
    return response.json();
  },

  // Add more API endpoints as needed
};

export default api; 
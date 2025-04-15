const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  // Shelters
  getShelters: async () => {
    const response = await fetch(`${API_URL}/shelters`);
    return response.json();
  },

  createShelter: async (shelterData, token) => {
    const response = await fetch(`${API_URL}/shelters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(shelterData)
    });
    return response.json();
  },

  // Donations
  createDonation: async (donationData, token) => {
    const response = await fetch(`${API_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(donationData)
    });
    return response.json();
  },

  // Image Upload
  uploadImage: async (imageFile, token) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'x-auth-token': token
      },
      body: formData
    });
    return response.json();
  }
};

export default api; 
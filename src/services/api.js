const API_URL = 'http://localhost:5004/api';

// Helper function to handle authentication headers
const getAuthHeaders = (token, includeContentType = true) => {
  const headers = {};
  
  if (token) {
    // Only use the Authorization header format since x-auth-token is blocked by CORS
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

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

  getShelterById: async (shelterId) => {
    const response = await fetch(`${API_URL}/shelters/${shelterId}`);
    return response.json();
  },

  createShelter: async (shelterData, token) => {
    // Check if we're sending form data with a file or just JSON
    if (shelterData instanceof FormData) {
      const response = await fetch(`${API_URL}/shelters/add`, {
        method: 'POST',
        headers: getAuthHeaders(token, false), // No Content-Type for FormData
        body: shelterData
      });
      
      // Check for non-OK responses and throw the response for error handling
      if (!response.ok) {
        throw response;
      }
      
      return response.json();
    } else {
      // For JSON data without file
      const response = await fetch(`${API_URL}/shelters/add-json`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(shelterData)
      });
      
      // Check for non-OK responses and throw the response for error handling
      if (!response.ok) {
        throw response;
      }
      
      return response.json();
    }
  },

  updateShelter: async (shelterId, shelterData, token) => {
    const response = await fetch(`${API_URL}/shelters/${shelterId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(shelterData)
    });
    return response.json();
  },

  deleteShelter: async (shelterId, userId, token) => {
    const response = await fetch(`${API_URL}/shelters/${shelterId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ userId })
    });
    return response.json();
  },

  // Donations
  createDonation: async (donationData, token) => {
    const response = await fetch(`${API_URL}/donations`, {
      method: 'POST',
      headers: getAuthHeaders(token),
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
      headers: getAuthHeaders(token, false), // No Content-Type for FormData
      body: formData
    });
    return response.json();
  },

  // Pets
  getPets: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.featured) queryParams.append('featured', params.featured);
    if (params.userId) queryParams.append('userId', params.userId);
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_URL}/pets${queryString}`);
    return response.json();
  },

  getPetById: async (petId) => {
    const response = await fetch(`${API_URL}/pets/${petId}`);
    return response.json();
  },

  getPetsByUser: async (userId, token) => {
    const response = await fetch(`${API_URL}/pets?userId=${userId}`, {
      headers: getAuthHeaders(token)
    });
    
    if (!response.ok) {
      throw response;
    }
    
    return response.json();
  },

  getFeaturedPets: async () => {
    const response = await fetch(`${API_URL}/pets?featured=true`);
    return response.json();
  },

  createPet: async (petData, token) => {
    // Check if we're sending form data with a file or just JSON
    if (petData instanceof FormData) {
      const response = await fetch(`${API_URL}/pets/add`, {
        method: 'POST',
        headers: getAuthHeaders(token, false), // No Content-Type for FormData
        body: petData
      });
      
      // Check for non-OK responses and throw the response for error handling
      if (!response.ok) {
        throw response;
      }
      
      return response.json();
    } else {
      // For JSON data without file
      const response = await fetch(`${API_URL}/pets/add-json`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(petData)
      });
      
      // Check for non-OK responses and throw the response for error handling
      if (!response.ok) {
        throw response;
      }
      
      return response.json();
    }
  },

  togglePetFeatured: async (petId, token) => {
    const response = await fetch(`${API_URL}/pets/${petId}/toggle-featured`, {
      method: 'PATCH',
      headers: getAuthHeaders(token)
    });
    
    if (!response.ok) {
      throw response;
    }
    
    return response.json();
  }
};

export default api; 
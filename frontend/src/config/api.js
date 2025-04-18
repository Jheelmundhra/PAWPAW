// API configuration constants
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5004/api";

// Helper function to handle authentication headers
export const getAuthHeaders = (token, includeContentType = true) => {
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

// Helper function to handle API responses
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json();
};

// Base API service
export const apiService = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return handleApiResponse(response);
    },

    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return handleApiResponse(response);
    },

    getProfile: async (token) => {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(token),
      });
      return handleApiResponse(response);
    },
  },

  // Pet endpoints
  pets: {
    getAll: async (params = {}) => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value);
      });

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";
      const response = await fetch(`${API_BASE_URL}/pets${queryString}`);
      return handleApiResponse(response);
    },

    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/pets/${id}`);
      return handleApiResponse(response);
    },

    create: async (petData, token) => {
      // Handle both FormData and JSON submissions
      if (petData instanceof FormData) {
        const response = await fetch(`${API_BASE_URL}/pets/add`, {
          method: "POST",
          headers: getAuthHeaders(token, false),
          body: petData,
        });
        return handleApiResponse(response);
      } else {
        const response = await fetch(`${API_BASE_URL}/pets/add-json`, {
          method: "POST",
          headers: getAuthHeaders(token),
          body: JSON.stringify(petData),
        });
        return handleApiResponse(response);
      }
    },

    toggleFeatured: async (id, token) => {
      const response = await fetch(
        `${API_BASE_URL}/pets/${id}/toggle-featured`,
        {
          method: "PATCH",
          headers: getAuthHeaders(token),
        }
      );
      return handleApiResponse(response);
    },
  },

  // Donation endpoints
  donations: {
    create: async (donationData, token) => {
      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(donationData),
      });
      return handleApiResponse(response);
    },

    getHistory: async (token) => {
      const response = await fetch(`${API_BASE_URL}/donations/user`, {
        headers: getAuthHeaders(token),
      });
      return handleApiResponse(response);
    },

    createPaymentIntent: async (paymentData, token) => {
      const response = await fetch(
        `${API_BASE_URL}/donations/create-payment-intent`,
        {
          method: "POST",
          headers: getAuthHeaders(token),
          body: JSON.stringify(paymentData),
        }
      );
      return handleApiResponse(response);
    },
  },
};

export default apiService;

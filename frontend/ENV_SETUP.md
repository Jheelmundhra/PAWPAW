# Environment Variables Setup

## Frontend Environment Variables

The frontend application uses environment variables to configure API endpoints and other settings. This allows for different configurations in development, staging, and production environments.

### Required Environment Variables

Create a `.env` file in the frontend root directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:5004/api
```

For production deployment, you would change this to your production API URL:

```
VITE_API_BASE_URL=https://your-production-api.com/api
```

### How Environment Variables Work in Vite

- Vite automatically loads environment variables from `.env` files
- Only variables prefixed with `VITE_` are exposed to your application code
- These variables are accessed via `import.meta.env.VITE_VARIABLE_NAME`

### Centralized API Configuration

All API calls in the application use the centralized configuration from `src/config/api.js`, which reads the API base URL from environment variables. This approach offers several benefits:

1. Single point of configuration for API endpoints
2. Consistent error handling across all API calls
3. Easy to switch between different environments (local, staging, production)
4. No hardcoded URLs throughout the codebase

### Usage in Components

Instead of hardcoding API URLs in components, import and use the API service:

```jsx
import { apiService } from "../config/api";

// Example usage
const fetchData = async () => {
  try {
    const data = await apiService.pets.getAll();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

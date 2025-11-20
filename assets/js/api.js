// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Helper function to set token
const setToken = (token) => localStorage.setItem('authToken', token);

// Helper function to remove token
const removeToken = () => localStorage.removeItem('authToken');

// Helper function to get user info
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Helper function to set user info
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

// Helper function to remove user info
const removeUser = () => localStorage.removeItem('user');

// API call wrapper with error handling
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
const authAPI = {
  register: async (name, email, password) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) {
      setToken(data.token);
      setUser({ name, email });
    }
    return data;
  },

  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setToken(data.token);
      setUser({ email });
    }
    return data;
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  isAuthenticated: () => !!getToken(),
};

// Products API
const productsAPI = {
  getAll: async () => {
    return await apiCall('/products');
  },

  create: async (productData) => {
    return await apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
};

// Orders API
const ordersAPI = {
  create: async (orderData) => {
    return await apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return await apiCall('/orders');
  },
};

// Export APIs
window.authAPI = authAPI;
window.productsAPI = productsAPI;
window.ordersAPI = ordersAPI;
window.getUser = getUser;

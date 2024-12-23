const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ENDPOINTS = {
  GET_REVIEWS: `${API_URL}/reviews`,
  POST_REVIEW: `${API_URL}/reviews`,
  UPDATE_REVIEW: (id) => `${API_URL}/reviews/${id}`,
  DELETE_REVIEW: (id) => `${API_URL}/reviews/${id}`,
};

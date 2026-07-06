import { jwtDecode } from "jwt-decode";
import api from "./api";

// ==========================================================
// Save JWT token and return decoded user
// ==========================================================
const authenticateUser = (token) => {
  localStorage.setItem("token", token);

  return jwtDecode(token);
};

export const authService = {
  // ==========================================================
  // Register User
  // Creates a new account and returns logged-in user
  // ==========================================================
  register: async (data) => {
    const res = await api.post("/auth/register", data);

    const token = res.data.data;

    return authenticateUser(token);
  },

  // ==========================================================
  // Login User
  // Authenticates user and returns decoded user
  // ==========================================================
  login: async (data) => {
    const res = await api.post("/auth/login", data);

    const token = res.data.data;

    return authenticateUser(token);
  },
};

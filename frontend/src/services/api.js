// export const BASE_URL = "http://localhost:5000/api";

// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

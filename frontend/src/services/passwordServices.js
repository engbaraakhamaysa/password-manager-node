import api from "./api";

export const passwordService = {
  // Get all passwords
  get: async () => {
    const res = await api.get("/password");

    return res.data.data;
  },

  create: async (data) => {
    const res = await api.post("/password", data);

    return res.data.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/password/${id}`, data);
    return res.data.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/password/${id}`);
    return res.data;
  },
};

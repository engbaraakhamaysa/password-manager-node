import api from "./api";

export const passwordService = {
  // Get all passwords
  get: async () => {
    const res = await api.get("/passwords");

    return res.data.data;
  },

  create: async (data) => {
    const res = await api.post("/passwords", data);

    return res.data.data;
  },
};

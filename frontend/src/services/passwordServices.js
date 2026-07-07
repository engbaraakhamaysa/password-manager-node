import api from "./api";

export const passwordService = {
  // Get all passwords
  getPasswords: async () => {
    const res = await api.get("/passwords");

    return res.data.data;
  },
};

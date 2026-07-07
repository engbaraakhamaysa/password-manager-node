import api from "./api";

export const adminServices = {
  getUsers: async () => {
    try {
      const res = await api.get("/users");

      const users = res.data.data; // الوصول للـ array الحقيقي

      return users.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
      }));
    } catch (err) {
      console.error("Failed to fetch users:", err);
      throw err; // نخلي React يتعامل مع الخطأ
    }
  },
};

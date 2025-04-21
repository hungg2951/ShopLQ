import instance from "./instance";

export const userAPI = {
  getAllUsers() {
    return instance.post("/users");
  },
  updateUser(payload: TUserUpdate) {
    return instance.patch("/user", payload);
  },
};

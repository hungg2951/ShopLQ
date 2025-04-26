import instance from "./instance";

export const accountAPI = {
  updateAccount(payload: TAccount) {
    return instance.patch("/account", payload);
  },
  createAccount(payload: TAccount) {
    return instance.post("/account", payload);
  },
};

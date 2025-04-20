import { AuthType } from "@/types/auth";
import instance from "./instance";

export const authAPI = {
  login(payload: AuthType) {
    return instance.post("login", payload);
  },
  register(payload: AuthType) {
    return instance.post("register", payload);
  },
  me() {
    return instance.get('/me'); 
  },
};

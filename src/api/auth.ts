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
    return instance.get("/me");
  },
  verify(payload: { code: number; email: string }) {
    return instance.post("/verify", payload);
  },
  reSendCodeVerify(payload: { email: string }) {
    return instance.post("/re-send-code-verify", payload);
  },
};

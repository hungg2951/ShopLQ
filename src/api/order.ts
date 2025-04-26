import instance from "./instance";

export const orderAPI = {
  create(idAcc: { idAcc: string }) {
    return instance.post("/payment", idAcc);
  },
};

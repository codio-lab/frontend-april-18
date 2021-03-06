import { instance } from "./interceptors";

export const registerUser = (data) => {
  return instance
    .post("/user/register", data)
    .then((resp) => {
      if (resp && resp.data) return resp.data;
      return resp;
    })
    .catch((error) => error);
};

export const loginUser = (data) => {
  return instance
    .post("/user/login", data)
    .then((resp) => {
      if (resp && resp.data) return resp.data;
      return resp;
    })
    .catch((error) => error);
};

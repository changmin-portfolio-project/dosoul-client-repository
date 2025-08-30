import { ADMIN_LOGIN_EMAIL_API_PATH } from "@dosoul/consts";
import { setAccessTokenToLocalStorage } from "@dosoul/utils";
import { api } from "../base/base";

interface EmailLoginReq {
  email: string;
  password: string;
}

export const postAdminAuthLoginEmail = (
  emailLoginReq: EmailLoginReq,
): Promise<string> => {
  return api
    .post(ADMIN_LOGIN_EMAIL_API_PATH, emailLoginReq)
    .then(res => {
      const data = res.data.data;

      setAccessTokenToLocalStorage(data.accessToken);

      return data.data;
    })
    .catch(error => {
      throw error;
    });
};

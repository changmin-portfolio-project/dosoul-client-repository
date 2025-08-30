import { LOGOUT_API_PATH } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";
import { resetAccessTokenToLocalStorage } from "@dosoul/utils";

export const postAuthLogout = (): Promise<string> => {
  return privateApi
    .post(LOGOUT_API_PATH)
    .then(res => {
      const data = res.data.data;

      resetAccessTokenToLocalStorage();

      return data.data;
    })
    .catch(error => {
      throw error;
    });
};

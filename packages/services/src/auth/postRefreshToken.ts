import { AUTH_RENEWAL_TOKEN_API_PATH } from "@dosoul/consts";
import { setAccessTokenToLocalStorage } from "@dosoul/utils";
import { refreshApi } from "../base/base";

export interface AuthTokenRsp {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const postRefreshToken = (): Promise<AuthTokenRsp> => {
  return refreshApi
    .post(AUTH_RENEWAL_TOKEN_API_PATH)
    .then(res => {
      console.log(res.data);

      // localStorage에 저장
      const authToken: AuthTokenRsp = res.data.data;
      setAccessTokenToLocalStorage(authToken.accessToken);

      return authToken;
    })
    .catch(error => {
      throw error;
    });
};

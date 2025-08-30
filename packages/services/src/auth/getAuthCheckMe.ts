import { CHECKME_API_PATH } from "@dosoul/consts";
import { privateApi } from "../base/base";

export interface UserInfoRsp {
  serviceUserId: number;
  receivedEmail: string;
  signupEmail: string;
  fullName: string;
  serviceAppRole: string;
  signUpType: string;
  serviceUserState: string;
  serviceUserGender: string;
  birthDate: string;
  socialId: string;
  password: string;
  refreshToken: string;
  deletedAt: string;
}

export const getAuthCheckMe = (): Promise<UserInfoRsp> => {
  return privateApi
    .get(CHECKME_API_PATH)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

import { USER_ME_V1_API_PATH } from "@/global/const/apipath/v1/UserAdminV1ApiPath";
import { privateApi } from "@dosoul/services";

export interface UserInfoRsp {
  userId: string;
  receivedEmail: string;
  fullName: string;
  phoneNumber: string;
  serviceUserState: string;
  serviceUserGender: string;
  birthDate: string;
}

export const getUserInfo = (): Promise<UserInfoRsp> => {
  return privateApi
    .get(`${USER_ME_V1_API_PATH}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

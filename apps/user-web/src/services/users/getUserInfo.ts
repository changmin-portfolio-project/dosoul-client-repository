import { USER_INFO_V1_API_PATH } from "@/global/const/apipath/v1/UserV1ApiPath";
import { optAuthApi } from "@dosoul/services";

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
  return optAuthApi
    .get(`${USER_INFO_V1_API_PATH}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

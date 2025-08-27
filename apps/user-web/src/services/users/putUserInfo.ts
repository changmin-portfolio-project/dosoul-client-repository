import { USER_INFO_V1_API_PATH } from "@/global/const/apipath/v1/UserV1ApiPath";
import { apiWithToast, privateApi } from "@dosoul/services";
import { METHOD_PUT } from "@root/packages/consts/src";

export interface PutProfileInfoReq {
  email: string;
  password: string;
  fullName: string;
  birthDate: string;
  gender: string;
  currentPassword: string;
  phoneNumber: string;
}

export const putUserInfo = (req: PutProfileInfoReq): Promise<null> => {
  return apiWithToast(privateApi, METHOD_PUT, USER_INFO_V1_API_PATH, req, {
    hasClose: true,
    timeout: 500,
    successMessage: "수정 완료",
  })
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

import { USER_V1_API_PATH } from "@/global/const/apipath/v1/UserAdminV1ApiPath";
import { METHOD_PUT } from "@dosoul/consts";
import { apiWithToast, privateApi } from "@dosoul/services";

export interface PutProfileInfoReq {
  email: string;
  password: string;
  fullName: string;
  birthDate: string;
  gender: string;
  currentPassword: string;
  phoneNumber: string;
}

export interface PutProfileInfoRsp {
  email: string;
  fullName: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
}

export const putUserInfo = (
  req: PutProfileInfoReq,
): Promise<PutProfileInfoRsp> => {
  return apiWithToast(privateApi, METHOD_PUT, USER_V1_API_PATH, req, {
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

import { USER_V1_API_PATH } from "@/global/const/apipath/v1/UserAdminV1ApiPath";
import {
  FILTER_PARAM,
  KEYWORD_PARAM,
  PAGE_PARAM,
  USER_DOMAIN_GENDER,
  USER_DOMAIN_ROLE,
  USER_DOMAIN_STATUS,
} from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

type UserDomainStatusValues =
  (typeof USER_DOMAIN_STATUS)[keyof typeof USER_DOMAIN_STATUS];

type UserDomainGenderValues =
  (typeof USER_DOMAIN_GENDER)[keyof typeof USER_DOMAIN_GENDER]["value"];

type UserDomainRoleValues =
  (typeof USER_DOMAIN_ROLE)[keyof typeof USER_DOMAIN_ROLE];

export interface UsersByAdminApiResponse {
  id: string;
  fullName: string;
  password: string;
  signupEmail: string;
  receivedEmail: string;
  serviceUserGender: UserDomainGenderValues; // Enum 값에 맞게 수정 필요
  phoneNumber: string;
  birthDate: string; // ISO date string (YYYY-MM-DD)
  serviceUserState: UserDomainStatusValues;
  serviceAppRole: UserDomainRoleValues; // Enum 값에 맞게 수정 필요
  signUpType: string;
  createdAt: string; // ISO date-time (YYYY-MM-DDTHH:mm:ss)
  updatedAt: string;
  deletedAt: string | null;
}

export interface QueryStateAdminUserListParams {
  filter: string;
  keyword: string;
}

export const getUsersByAdmin = (
  page: number,
  params?: QueryStateAdminUserListParams,
): Promise<UsersByAdminApiResponse[]> => {
  return privateApi
    .get(
      `${USER_V1_API_PATH}?${PAGE_PARAM}=${page}&${FILTER_PARAM}=${params?.filter}&${KEYWORD_PARAM}=${params?.keyword}`,
    )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

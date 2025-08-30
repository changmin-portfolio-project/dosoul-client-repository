import { api } from "../base/base";

export const getAuthPasswordResetValidate = async (
  token: string,
): Promise<boolean> => {
  return api
    .get(`/api/v1/auth/password-reset/validate/${token}`)
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

import { api } from "../base/base";

export interface PasswordResetConfirmDto {
  token: string;
  newPassword: string;
}

export const postAuthPasswordResetConfirm = async (
  data: PasswordResetConfirmDto,
): Promise<string> => {
  return api
    .post("/api/v1/auth/password-reset/confirm", data)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

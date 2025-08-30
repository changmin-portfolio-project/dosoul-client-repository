import { api } from "@dosoul/services";

export const postAuthPasswordResetRequest = async (
  email: string,
): Promise<string> => {
  return api
    .post("/api/v1/auth/password-reset/request", {
      email,
    })
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

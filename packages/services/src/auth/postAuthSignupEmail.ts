import { SIGNUP_EMAIL_API_PATH } from "@dosoul/consts";
import { api } from "@dosoul/services";

export interface SignupEmailInfo {
  email: string;
  password: string;
  fullName: string;
  birthdate: string;
  gender: string;
  phoneNumber: string;
}

export async function postAuthSignupEmail(
  signupEmailReq: SignupEmailInfo,
): Promise<string> {
  try {
    const data = await api.post(SIGNUP_EMAIL_API_PATH, signupEmailReq);

    console.log(data.data);

    return data.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

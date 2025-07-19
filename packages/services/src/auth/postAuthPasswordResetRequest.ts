import axios from 'axios';

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export const postAuthPasswordResetRequest = async (data: PasswordResetRequest): Promise<PasswordResetResponse> => {
  const response = await axios.post('/api/auth/password-reset-request', data);
  return response.data;
};

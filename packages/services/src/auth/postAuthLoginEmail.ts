import axios from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const postAuthLoginEmail = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post('/api/auth/login', data);
  return response.data;
};

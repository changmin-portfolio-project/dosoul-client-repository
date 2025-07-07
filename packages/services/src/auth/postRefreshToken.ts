import axios from 'axios';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const postRefreshToken = async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const response = await axios.post('/api/auth/refresh', data);
  return response.data;
};

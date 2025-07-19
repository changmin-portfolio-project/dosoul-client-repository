import axios from 'axios';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export const getAuthCheckMe = async (): Promise<UserInfo> => {
  const response = await axios.get('/api/auth/me');
  return response.data;
};

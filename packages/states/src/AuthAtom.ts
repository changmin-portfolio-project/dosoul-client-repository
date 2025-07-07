import { atom } from 'recoil';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export const authAtom = atom<AuthState>({
  key: 'authAtom',
  default: {
    isAuthenticated: false,
    user: null,
  },
});

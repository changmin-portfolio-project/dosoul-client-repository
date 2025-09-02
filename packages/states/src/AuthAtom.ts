// 예시: Recoil
import { atom } from "recoil";

export const loginModalStateAtom = atom({
  key: "loginModalState",
  default: false,
});

export const signupModalStateAtom = atom({
  key: "signupModalState",
  default: false,
});

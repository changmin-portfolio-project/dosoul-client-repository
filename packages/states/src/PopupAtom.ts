// 예시: Recoil
import { atom } from "recoil";

export const datePickerPopupStateAtom = atom<{
  isOpen: boolean;
  dateString: string | undefined;
  title: string | undefined;
}>({
  key: "datePickerPopupState",
  default: {
    isOpen: false,
    dateString: undefined,
    title: undefined,
  },
});

export const passwordResetRequestPopupStateAtom = atom<{
  isOpen: boolean;
  email: string | undefined;
}>({
  key: "passwordResetRequestPopupState",
  default: {
    isOpen: false,
    email: undefined,
  },
});

export const uploadedToastBarStateAtom = atom<{
  isOpen: boolean;
  message: string | undefined;
}>({
  key: "uploadedToastBarState",
  default: {
    isOpen: false,
    message: undefined,
  },
});

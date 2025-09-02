import { atom } from "recoil";

export const windowSizeAtom = atom({
  key: "windowSize",
  default: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  },
});

export type InitPageInfoType = {
  isMyProfilePage: boolean;
  isMyProfileScrapPage: boolean;
  isLoginPage: boolean;
  isMapPage: boolean;
  isSignupPage: boolean;
  isMapPopupByProfilePost: boolean;
  isMapPopupByScrap: boolean;
  isProfilePostPage: boolean;
};

export const initPageInfoAtom = atom<InitPageInfoType>({
  key: "initPageInfo",
  default: {
    isMyProfilePage: false,
    isMyProfileScrapPage: false,
    isLoginPage: false,
    isMapPage: false,
    isSignupPage: false,
    isMapPopupByProfilePost: false,
    isMapPopupByScrap: false,
    isProfilePostPage: false,
  },
});

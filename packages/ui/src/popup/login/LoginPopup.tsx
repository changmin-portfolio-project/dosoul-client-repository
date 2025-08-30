import DosulLogo from "@dosoul/assets/images/icons/logo/DosoulLogo.svg?react";
import {
  ADMIN_ROLE_VALUE,
  NOT_AUTH_REDIRECT_URL,
  REDIRECT_URL,
  ROLE_TYPE,
} from "@dosoul/consts";
import {
  getAuthCheckMe,
  postAdminAuthLoginEmail,
  postAuthLoginEmail,
} from "@dosoul/services";
import { loginModalStateAtom, signupModalStateAtom } from "@dosoul/states";
import { isAllFieldsFilled } from "@dosoul/utils";
import type React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { LoginBody } from "../../popup/login/body/LoginBody";
import {
  DynamicPopupTemplate,
  OverlaySettingType,
} from "../DynamicPopupTemplate";

interface LoginPopupProps {
  overlaySetting?: OverlaySettingType;
  hasSignupButton?: boolean;
}

export interface LoginInfoType {
  email: string;
  password: string;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({
  overlaySetting,
  hasSignupButton = true,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const setLoginModalState = useSetRecoilState(loginModalStateAtom);
  const setSignupModalState = useSetRecoilState(signupModalStateAtom);

  const onClose = () => {
    setLoginModalState(false);
  };

  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    email: "",
    password: "",
  });

  const onSetLoginInfo = (loginData: LoginInfoType) => {
    setLoginInfo({
      email: loginData.email,
      password: loginData.password,
    });
  };

  const onLoginEmail = (loginInfo: LoginInfoType) => {
    if (!isAllFieldsFilled(loginInfo)) return;

    if (ROLE_TYPE === ADMIN_ROLE_VALUE) {
      postAdminAuthLoginEmail(loginInfo)
        .then(() => {
          onClose();
        })
        .catch(e => {
          alert(e.response?.data.message);
        });
    } else {
      postAuthLoginEmail(loginInfo)
        .then(() => {
          const redirectUrl = searchParams.get(REDIRECT_URL);
          onClose();

          if (!!redirectUrl) {
            navigate(redirectUrl);
          }
        })
        .catch(e => {
          alert(e.response?.data.message);
        });
    }
  };

  const onOpenSignupPopup = () => {
    onClose();
    setSignupModalState(true);
  };

  return (
    <DynamicPopupTemplate
      title={
        <LodoWrap>
          <DosulLogo />
        </LodoWrap>
      }
      overlaySetting={overlaySetting}
      onClose={() => {
        onClose();
        const notAuthRedirectUrl = searchParams.get(NOT_AUTH_REDIRECT_URL);
        if (!!notAuthRedirectUrl) {
          getAuthCheckMe().catch(() => {
            navigate(notAuthRedirectUrl);
          });
        }
      }}
    >
      <LoginBody
        loginInfo={loginInfo}
        onSetLoginInfo={onSetLoginInfo}
        onLoginEmail={onLoginEmail}
        onOpenSignupPopup={onOpenSignupPopup}
        onClose={onClose}
        hasSignupButton={hasSignupButton}
      />
    </DynamicPopupTemplate>
  );
};

const LodoWrap = styled.div``;

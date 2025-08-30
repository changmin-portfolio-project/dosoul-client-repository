import { passwordResetRequestPopupStateAtom } from "@dosoul/states";
import theme, { hoverComponentStyle } from "@dosoul/styles";
import type React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DosoulButton } from "../../../common/button/DosoulButton";
import { LoginInfoType } from "../LoginPopup";

const WRAP_SIDE_PADDING = 30;

interface LoginBodyProps {
  loginInfo: LoginInfoType;
  onSetLoginInfo: (loginData: LoginInfoType) => void;
  onOpenSignupPopup: () => void;
  onLoginEmail: (loginInfo: { email: string; password: string }) => void;
  onClose: () => void;
  hasSignupButton?: boolean;
}

export const LoginBody: React.FC<LoginBodyProps> = ({
  loginInfo,
  onSetLoginInfo,
  onOpenSignupPopup,
  onLoginEmail,
  onClose,
  hasSignupButton = true,
}) => {
  const setPasswordResetRequestPopupState = useSetRecoilState(
    passwordResetRequestPopupStateAtom,
  );

  const onOpenPasswordResetRequestPopup = () => {
    setPasswordResetRequestPopupState({
      isOpen: true,
      email: loginInfo.email,
    });

    onClose();
  };

  return (
    <LoginBodyContainer>
      <LoginInputWrap>
        <LoginEmailInputWrap>
          <LoginInputSubWrap>
            <LoginEmailInput
              type="email"
              placeholder="이메일"
              onKeyDown={e => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  e.nativeEvent.isComposing === false
                ) {
                  e.preventDefault();
                  onLoginEmail(loginInfo);
                }
              }}
              onChange={e => {
                onSetLoginInfo({
                  email: e.target.value,
                  password: loginInfo.password,
                });
              }}
            />
          </LoginInputSubWrap>
        </LoginEmailInputWrap>
        <LoginPasswordInputWrap>
          <LoginInputSubWrap>
            <LoginPasswordInput
              type="password"
              placeholder="비밀번호"
              onKeyDown={e => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  e.nativeEvent.isComposing === false
                ) {
                  e.preventDefault();
                  onLoginEmail(loginInfo);
                }
              }}
              onChange={e => {
                onSetLoginInfo({
                  email: loginInfo.email,
                  password: e.target.value,
                });
              }}
            />
          </LoginInputSubWrap>
        </LoginPasswordInputWrap>
      </LoginInputWrap>
      <LoginPasswordSearchWrap>
        <LoginPasswordSearchButton onClick={onOpenPasswordResetRequestPopup}>
          비밀번호 찾기
        </LoginPasswordSearchButton>
      </LoginPasswordSearchWrap>
      <ApplyButton>
        <LoginButtonWrap>
          <DosoulButton
            buttonTitle="로그인"
            ButtonContainerStyle={{ margin: `0 ${WRAP_SIDE_PADDING}px` }}
            onClickFunc={() => {
              onLoginEmail(loginInfo);
            }}
          />
        </LoginButtonWrap>
        {hasSignupButton && (
          <SignupButtonWrap>
            <SignupButton onClick={onOpenSignupPopup}>회원가입</SignupButton>
          </SignupButtonWrap>
        )}
      </ApplyButton>
    </LoginBodyContainer>
  );
};

const LoginBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginInputWrap = styled.div`
  padding: 0 ${WRAP_SIDE_PADDING}px;
`;

const LoginPasswordSearchWrap = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 5px;
  margin-right: ${WRAP_SIDE_PADDING}px;
  margin-bottom: 20px;
`;

const LoginPasswordSearchButton = styled.div`
  font: ${theme.fontSizes.Body1};
  color: ${theme.grey.Grey3};
  padding: 5px 10px;
  ${hoverComponentStyle};
`;

const LoginInputTemplate = styled.input`
  outline: none;

  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey8};
  padding: 0px;
  margin: 0px;
  border: 0px;
  width: 100%;
  background: white;
  &::placeholder {
    color: ${theme.grey.Grey4};
  }
`;

const LoginEmailInputWrap = styled.div`
  border-radius: 20px 20px 0 0;
  border: 1px solid ${theme.grey.Grey3};
`;

const LoginInputSubWrap = styled.div`
  padding: 13px 20px;
`;

const LoginEmailInput = styled(LoginInputTemplate)``;

const LoginPasswordInputWrap = styled.div`
  border-radius: 0px 0px 20px 20px;
  border-left: 1px solid ${theme.grey.Grey3};
  border-right: 1px solid ${theme.grey.Grey3};
  border-bottom: 1px solid ${theme.grey.Grey3};
`;

const LoginPasswordInput = styled(LoginInputTemplate)`
  border-top: 0px;
`;

const LoginButtonWrap = styled.div`
  width: 100%;
`;

const SignupButtonWrap = styled.div`
  display: flex;
  margin: 0 auto;
`;

const ApplyButton = styled.div`
  flex: 1;
  padding-bottom: 20px;
  width: 100%;
`;

const SignupButton = styled.div`
  display: flex;
  margin: 0 auto;
  color: ${theme.grey.Grey3};
  font: ${theme.fontSizes.Body2};
  margin-top: 5px;
  padding: 5px 10px;
  ${hoverComponentStyle};
`;

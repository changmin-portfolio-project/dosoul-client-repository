import DosulLogo from "@dosoul/assets/images/icons/logo/DosoulLogo.svg?react";
import { useDatePicker } from "@dosoul/hooks";
import { SignupEmailInfo } from "@dosoul/services";
import { signupModalStateAtom } from "@dosoul/states";
import { DynamicPopupTemplate } from "@dosoul/ui";
import type React from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { SignupPopupBody } from "./SignupPopupBody";
import { SignupSuccessPopup } from "./SignupSuccessPopup";

export const SignupPopup: React.FC = () => {
  const setSignupModalState = useSetRecoilState(signupModalStateAtom);

  const [signupEmailInfo, setSignupEmailInfo] = useState<SignupEmailInfo>({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
    phoneNumber: "",
  });

  const [checkPassword, setCheckPassword] = useState<string>("");

  const keyToLabel = {
    fullName: "이름",
    email: "이메일",
    birthdate: "생년월일",
    phoneNumber: "전화번호",
    password: "비밀번호",
  };

  const [genderModalOpen, setGenderModalOpen] = useState(false);

  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignupSuccess = () => {
    setIsSignupSuccess(true);
  };

  const handleCloseSuccess = () => {
    setIsSignupSuccess(false);
    setSignupModalState(false);
  };

  const { onOpen: onDatePickerOpen } = useDatePicker({
    title: "생년월일",
    onDateSelect: date => {
      setSignupEmailInfo({
        ...signupEmailInfo,
        birthdate: date,
      });
    },
  });

  return (
    <>
      <div style={isSignupSuccess ? { display: "none" } : { display: "block" }}>
        <DynamicPopupTemplate
          title={
            <LogoWrap>
              <DosulLogo />
            </LogoWrap>
          }
          isClickCloseByOutside={false}
          onClose={() => {
            setSignupModalState(false);
          }}
        >
          <SignupPopupBody
            signupEmailInfo={signupEmailInfo}
            setSignupEmailInfo={setSignupEmailInfo}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            keyToLabel={keyToLabel}
            onOpenDatePicker={() => onDatePickerOpen(signupEmailInfo.birthdate)}
            genderModalOpen={genderModalOpen}
            setGenderModalOpen={setGenderModalOpen}
            onSignupSuccess={handleSignupSuccess}
          />
        </DynamicPopupTemplate>
      </div>

      {isSignupSuccess && <SignupSuccessPopup onClose={handleCloseSuccess} />}
    </>
  );
};

const LogoWrap = styled.div``;

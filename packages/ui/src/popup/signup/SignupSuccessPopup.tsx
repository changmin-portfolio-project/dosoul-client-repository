import SignupCompleteIcon from "@dosoul/assets/images/icons/feature/member/SignupCompleteIcon.svg?react";
import { POPUP_Z_INDEX } from "@dosoul/consts";
import theme from "@dosoul/styles";
import type React from "react";
import styled from "styled-components";

interface SignupSuccessPopupProps {
  onClose: () => void;
}

export const SignupSuccessPopup: React.FC<SignupSuccessPopupProps> = ({
  onClose,
}) => {
  return (
    <SignupSuccessOverlay>
      <SignupSuccessContent>
        <SuccessIconContainer>
          <SignupCompleteIcon />
        </SuccessIconContainer>

        <SuccessTitle>회원가입 완료</SuccessTitle>

        <SuccessMessage>
          환영합니다! 회원가입이 성공적으로 완료되었습니다.
          <br />
          이제 로그인하여 서비스를 이용하실 수 있습니다.
        </SuccessMessage>

        <SuccessButton onClick={onClose}>확인</SuccessButton>
      </SignupSuccessContent>
    </SignupSuccessOverlay>
  );
};

const SignupSuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${POPUP_Z_INDEX + 1000};
  animation: fadeIn 0.3s ease-out forwards;

  @keyframes fadeIn {
    from {
      background: rgba(0, 0, 0, 0);
    }
    to {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const SignupSuccessContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  animation: slideInSignupSuccessPopup 0.3s ease-out forwards;

  @keyframes slideInSignupSuccessPopup {
    from {
      transform: scale(0.9) translateY(20px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

const SuccessIconContainer = styled.div`
  margin-bottom: 20px;

  svg {
    width: 60px;
    height: 60px;
    color: ${theme.mainColor.Blue};
  }
`;

const SuccessTitle = styled.h2`
  font: ${theme.fontSizes.Subhead1};
  color: ${theme.grey.Grey9};
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const SuccessMessage = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey7};
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const SuccessButton = styled.button`
  background: ${theme.mainColor.DosoulGradient};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font: ${theme.fontSizes.Body2};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${theme.mainColor.DosoulGradient};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(31, 158, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

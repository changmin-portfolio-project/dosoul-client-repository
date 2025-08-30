import { USER_DOMAIN_GENDER } from "@dosoul/consts";
import { postAuthSignupEmail, type SignupEmailInfo } from "@dosoul/services";
import theme from "@dosoul/styles";
import { DosoulButton, DropdownTemplate } from "@dosoul/ui";
import {
  formatDate,
  getFirstEmptyFieldKey,
  getUserGenderDisplay,
  handlePhoneNumberChange,
  handlePhoneNumberKeyDown,
  isAllFieldsFilled,
  isValidGender,
} from "@dosoul/utils";
import type React from "react";
import styled from "styled-components";

const WRAP_SIDE_PADDING = 20;

export const SignupPopupBody: React.FC<{
  signupEmailInfo: SignupEmailInfo;
  setSignupEmailInfo: (info: SignupEmailInfo) => void;
  checkPassword: string;
  setCheckPassword: (password: string) => void;
  keyToLabel: {
    fullName: string;
    email: string;
    birthdate: string;
    phoneNumber: string;
    password: string;
  };
  onOpenDatePicker: () => void;
  genderModalOpen: boolean;
  setGenderModalOpen: (isOpen: boolean) => void;
  onSignupSuccess: () => void;
}> = ({
  signupEmailInfo,
  setSignupEmailInfo,
  onOpenDatePicker,
  checkPassword,
  setCheckPassword,
  keyToLabel,
  genderModalOpen,
  setGenderModalOpen,
  onSignupSuccess,
}) => {
  const onClickFunc = () => {
    if (isAllFieldsFilled(signupEmailInfo)) {
      if (signupEmailInfo.password === checkPassword) {
        if (!isValidGender(signupEmailInfo.gender)) {
          alert("성별을 올바르게 선택해주세요.");
          return;
        }
        postAuthSignupEmail(signupEmailInfo)
          .then(() => {
            onSignupSuccess();
          })
          .catch(e => {
            alert(e.response.data.message);
          });
      } else {
        alert("입력하신 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      }
    } else {
      const emptyLabel = getFirstEmptyFieldKey(signupEmailInfo, keyToLabel);
      if (emptyLabel) {
        alert(`${emptyLabel} 항목을 입력해주세요.`);
      }
    }
  };
  return (
    <div>
      <SignupInputWrap>
        <SignupInputFrameWrap>
          <SignupInputTitle>이름</SignupInputTitle>
          <SignupInputFrame>
            <SignupInputSubWrap>
              <SignupEmailInput
                placeholder="이름"
                type="text"
                onChange={e => {
                  setSignupEmailInfo({
                    ...signupEmailInfo,
                    fullName: e.target.value,
                  });
                }}
              />
            </SignupInputSubWrap>
          </SignupInputFrame>
        </SignupInputFrameWrap>

        <SignupInputFrameWrap>
          <SignupInputTitle>성별</SignupInputTitle>
          <DropdownTemplate
            options={[
              {
                label: USER_DOMAIN_GENDER.MALE.label,
                value: USER_DOMAIN_GENDER.MALE.value,
              },
              {
                label: USER_DOMAIN_GENDER.FEMALE.label,
                value: USER_DOMAIN_GENDER.FEMALE.value,
              },
            ]}
            isDropdownOpen={genderModalOpen}
            onClick={option => {
              setSignupEmailInfo({
                ...signupEmailInfo,
                gender: option,
              });
              setGenderModalOpen(false);
            }}
            onClose={() => setGenderModalOpen(false)}
          >
            <SignupInputFrame>
              <SignupInputSubWrap>
                <>
                  <DateInputMobileLabel
                    onClick={() => setGenderModalOpen(true)}
                    $inputed={!!signupEmailInfo.gender}
                  >
                    {signupEmailInfo.gender
                      ? getUserGenderDisplay(signupEmailInfo.gender)
                      : "성별 선택"}
                  </DateInputMobileLabel>
                </>
              </SignupInputSubWrap>
            </SignupInputFrame>
          </DropdownTemplate>
        </SignupInputFrameWrap>

        <SignupInputFrameWrap>
          <SignupInputTitle>이메일</SignupInputTitle>
          <SignupInputFrame>
            <SignupInputSubWrap>
              <SignupEmailInput
                placeholder="이메일"
                type="email"
                onChange={e => {
                  setSignupEmailInfo({
                    ...signupEmailInfo,
                    email: e.target.value,
                  });
                }}
              />
            </SignupInputSubWrap>
          </SignupInputFrame>
        </SignupInputFrameWrap>

        <SignupInputFrameWrap>
          <SignupInputTitle>생년월일</SignupInputTitle>
          <SignupInputFrame>
            <SignupInputSubWrap>
              <DateInputMobileLabel
                onClick={onOpenDatePicker}
                $inputed={!!signupEmailInfo.birthdate}
              >
                {signupEmailInfo.birthdate
                  ? formatDate(signupEmailInfo.birthdate)
                  : "날짜를 입력해주세요."}
              </DateInputMobileLabel>
            </SignupInputSubWrap>
          </SignupInputFrame>
        </SignupInputFrameWrap>

        <SignupInputFrameWrap>
          <SignupInputTitle>전화번호</SignupInputTitle>
          <SignupInputFrame>
            <SignupInputSubWrap>
              <SignupEmailInput
                placeholder="전화번호"
                type="tel"
                value={signupEmailInfo.phoneNumber}
                onChange={e =>
                  handlePhoneNumberChange(e, (phoneNumber: string) => {
                    setSignupEmailInfo({
                      ...signupEmailInfo,
                      phoneNumber: phoneNumber,
                    });
                  })
                }
                onKeyDown={e =>
                  handlePhoneNumberKeyDown(
                    e,
                    signupEmailInfo.phoneNumber,
                    (phoneNumber: string) => {
                      setSignupEmailInfo({
                        ...signupEmailInfo,
                        phoneNumber: phoneNumber,
                      });
                    },
                  )
                }
              />
            </SignupInputSubWrap>
          </SignupInputFrame>
        </SignupInputFrameWrap>
        <SignupInputFrameWrap>
          <SignupInputTitle>비밀번호</SignupInputTitle>
          <SignupEmailInputWrap>
            <SignupInputSubWrap>
              <SignupEmailInput
                type="password"
                placeholder="비밀번호"
                onChange={e => {
                  setSignupEmailInfo({
                    ...signupEmailInfo,
                    password: e.target.value,
                  });
                }}
              />
            </SignupInputSubWrap>
          </SignupEmailInputWrap>
          <SignupPasswordInputWrap>
            <SignupInputSubWrap>
              <SignupPasswordInput
                type="password"
                placeholder="비밀번호 확인"
                onChange={e => {
                  setCheckPassword(e.target.value);
                }}
              />
            </SignupInputSubWrap>
          </SignupPasswordInputWrap>
        </SignupInputFrameWrap>
      </SignupInputWrap>

      <ApplyButton>
        <SignupButtonWrap>
          <DosoulButton
            onClickFunc={() => {
              onClickFunc();
            }}
            buttonTitle="회원가입"
            ButtonContainerStyle={{ margin: `0 ${WRAP_SIDE_PADDING}px` }}
          />
        </SignupButtonWrap>
      </ApplyButton>
    </div>
  );
};

const SignupInputWrap = styled.div`
  padding: 0 ${WRAP_SIDE_PADDING}px;
`;

const SignupInputTemplate = styled.input`
  outline: none;
  height: 22px;

  font: ${theme.fontSizes.Body2};
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

const SignupInputFrameWrap = styled.div`
  margin-bottom: 15px;
`;

const SignupInputTitle = styled.div`
  font: ${theme.fontSizes.Body3};
  margin-left: 5px;
`;

const SignupInputFrame = styled.div`
  border-radius: 12px;
  border: 1px solid ${theme.grey.Grey3};
`;

const SignupEmailInputWrap = styled.div`
  border-radius: 12px 12px 0 0;
  border: 1px solid ${theme.grey.Grey3};
`;

const SignupInputSubWrap = styled.div`
  padding: 5px 15px;
`;

const SignupEmailInput = styled(SignupInputTemplate)``;

const SignupPasswordInputWrap = styled.div`
  border-radius: 0px 0px 12px 12px;
  border-left: 1px solid ${theme.grey.Grey3};
  border-right: 1px solid ${theme.grey.Grey3};
  border-bottom: 1px solid ${theme.grey.Grey3};
`;

const SignupPasswordInput = styled(SignupInputTemplate)`
  border-top: 0px;
`;

const SignupButtonWrap = styled.div`
  width: 100%;
`;

const ApplyButton = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const DateInputMobileLabel = styled.label<{ $inputed: boolean }>`
  border: 0px;
  width: 100%;

  display: block;
  box-sizing: border-box;
  outline: none;
  border-radius: 30px;
  color: ${props => (props.$inputed ? "black" : theme.grey.Grey4)};
  font: ${theme.fontSizes.Body3};

  cursor: pointer;
`;

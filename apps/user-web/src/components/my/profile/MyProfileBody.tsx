import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateUserInfo } from "@/hooks/query/QueryStateUserInfo";
import { postAuthMemberWithdrawal } from "@/services/auth/postAuthMemberWithdrawal";
import {
  putUserInfo,
  type PutProfileInfoReq,
} from "@/services/users/putUserInfo";
import { USER_DOMAIN_GENDER } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { DosoulButton, DropdownTemplate } from "@dosoul/ui";
import {
  formatDate,
  handlePhoneNumberChange,
  handlePhoneNumberKeyDown,
  isSomeChanged,
} from "@dosoul/utils";
import { useDatePicker } from "@root/packages/hooks/src";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WithdrawCompletePopup from "../../popup/WithdrawCompletePopup";
import WithdrawConfirmPopup from "../../popup/WithdrawConfirmPopup";

interface MyProfileBodyProps {
  MyProfileBodyStyle?: React.CSSProperties;
}

export const MyProfileBody: React.FC<MyProfileBodyProps> = ({
  MyProfileBodyStyle,
}) => {
  const navigate = useNavigate();
  const { data: userInfo, refetch: refetchUserInfo } = QueryStateUserInfo();
  const [profileInfo, setProfileInfo] = useState<PutProfileInfoReq>({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    currentPassword: "",
    phoneNumber: "",
  });

  const [prevProfileInfo, setPrevProfileInfo] = useState<PutProfileInfoReq>({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    currentPassword: "",
    phoneNumber: "",
  });

  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isWithdrawCompletePopupOpen, setIsWithdrawCompletePopupOpen] =
    useState(false);
  const [retentionDays, setRetentionDays] = useState(0);

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);
      const response = await postAuthMemberWithdrawal();

      // 보관 기간 저장
      setRetentionDays(response.maxDeletedUserRetentionDay);

      // 확인 팝업 닫기
      setIsWithdrawPopupOpen(false);

      // 완료 팝업 표시
      setIsWithdrawCompletePopupOpen(true);
    } catch (error: any) {
      console.error("탈퇴 실패:", error);
      alert(
        error.response?.data?.message || "탈퇴 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleWithdrawComplete = () => {
    // 로그아웃 처리 (토큰 삭제 등)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 완료 팝업 닫기
    setIsWithdrawCompletePopupOpen(false);

    // 로그인 페이지로 이동
    navigate(APP_PATH.HOME);
  };

  const { onOpen: onDatePickerOpen } = useDatePicker({
    title: "생년월일",
    onDateSelect: date => {
      setProfileInfo(prev => {
        return {
          ...prev,
          birthDate: date,
        };
      });
    },
  });

  const [genderModalOpen, setGenderModalOpen] = useState(false);

  useEffect(() => {
    if (!userInfo) return;
    setProfileInfo(prev => ({
      ...prev,
      fullName: userInfo.fullName,
      email: userInfo.receivedEmail,
      gender: userInfo.serviceUserGender,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber,
    }));
    setPrevProfileInfo(prev => ({
      ...prev,
      fullName: userInfo.fullName,
      email: userInfo.receivedEmail,
      gender: userInfo.serviceUserGender,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber,
    }));
  }, [userInfo]);

  return (
    <>
      <MainContainer style={MyProfileBodyStyle}>
        <MainSubContainer>
          <PrivateInfoTitle>개인 정보</PrivateInfoTitle>
          <LoginInputWrap>
            <LoginInputFrameWrap>
              <LoginInputTitle>이름</LoginInputTitle>
              <LoginInputFrame>
                <LoginInputSubWrap>
                  <LoginEmailInput
                    placeholder="이름"
                    type="text"
                    value={profileInfo.fullName}
                    onChange={e => {
                      setProfileInfo(prev => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                    }}
                  />
                </LoginInputSubWrap>
              </LoginInputFrame>
            </LoginInputFrameWrap>

            <LoginInputFrameWrap>
              <LoginInputTitle>성별</LoginInputTitle>
              <LoginInputFrame>
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
                    setProfileInfo(prev => ({
                      ...prev,
                      gender: option,
                    }));
                    setGenderModalOpen(false);
                  }}
                  onClose={() => setGenderModalOpen(false)}
                >
                  <LoginInputSubWrap>
                    <DateInputMobileLabel
                      onClick={() => setGenderModalOpen(true)}
                      $inputed={!!profileInfo.gender}
                    >
                      {profileInfo.gender
                        ? profileInfo.gender === "MALE"
                          ? "남자"
                          : "여자"
                        : "성별 선택"}
                    </DateInputMobileLabel>
                  </LoginInputSubWrap>
                </DropdownTemplate>
              </LoginInputFrame>
            </LoginInputFrameWrap>

            <LoginInputFrameWrap>
              <LoginInputTitle>수신 메일</LoginInputTitle>
              <LoginInputFrame>
                <LoginInputSubWrap>
                  <LoginEmailInput
                    placeholder="이메일"
                    type="email"
                    value={profileInfo.email}
                    onChange={e => {
                      setProfileInfo(prev => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                </LoginInputSubWrap>
              </LoginInputFrame>
            </LoginInputFrameWrap>

            <LoginInputFrameWrap>
              <LoginInputTitle>생년월일</LoginInputTitle>
              <LoginInputFrame>
                <LoginInputSubWrap>
                  <>
                    <DateInputMobileLabel
                      onClick={() => onDatePickerOpen(profileInfo.birthDate)}
                      $inputed={!!profileInfo.birthDate}
                    >
                      {profileInfo.birthDate
                        ? formatDate(profileInfo.birthDate)
                        : "날짜를 입력해주세요."}
                    </DateInputMobileLabel>
                  </>
                </LoginInputSubWrap>
              </LoginInputFrame>
            </LoginInputFrameWrap>

            <LoginInputFrameWrap>
              <LoginInputTitle>전화번호</LoginInputTitle>
              <LoginInputFrame>
                <LoginInputSubWrap>
                  <LoginEmailInput
                    placeholder="전화번호"
                    type="tel"
                    value={profileInfo.phoneNumber}
                    onChange={e =>
                      handlePhoneNumberChange(e, (phoneNumber: string) => {
                        setProfileInfo(prev => ({
                          ...prev,
                          phoneNumber: phoneNumber,
                        }));
                      })
                    }
                    onKeyDown={e =>
                      handlePhoneNumberKeyDown(
                        e,
                        profileInfo.phoneNumber,
                        (phoneNumber: string) => {
                          setProfileInfo(prev => ({
                            ...prev,
                            phoneNumber: phoneNumber,
                          }));
                        },
                      )
                    }
                  />
                </LoginInputSubWrap>
              </LoginInputFrame>
            </LoginInputFrameWrap>
            <LoginInputFrameWrap>
              <LoginInputTitle>비밀번호</LoginInputTitle>
              <LoginInputFrame style={{ marginBottom: 10 }}>
                <LoginInputSubWrap>
                  <LoginEmailInput
                    placeholder="현재 비밀번호"
                    type="password"
                    value={profileInfo.currentPassword}
                    onChange={e => {
                      setProfileInfo(prev => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }));
                    }}
                  />
                </LoginInputSubWrap>
              </LoginInputFrame>
              <LoginEmailInputWrap>
                <LoginInputSubWrap>
                  <LoginEmailInput
                    type="password"
                    placeholder="변경 비밀번호"
                    value={profileInfo.password}
                    onChange={e => {
                      setProfileInfo(prev => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </LoginInputSubWrap>
              </LoginEmailInputWrap>
              <LoginPasswordInputWrap>
                <LoginInputSubWrap>
                  <LoginPasswordInput
                    type="password"
                    placeholder="변경 비밀번호 확인"
                    value={checkPassword}
                    onChange={e => {
                      setCheckPassword(e.target.value);
                    }}
                  />
                </LoginInputSubWrap>
              </LoginPasswordInputWrap>
            </LoginInputFrameWrap>
          </LoginInputWrap>
          <ApplyButton>
            <LoginButtonWrap>
              <DosoulButton
                onClickFunc={() => {
                  if (!isSomeChanged(profileInfo, prevProfileInfo)) return;

                  if (!!profileInfo.password || !!profileInfo.currentPassword) {
                    if (!profileInfo.currentPassword) {
                      alert("현재 비밀번호를 입력해주세요.");
                      return;
                    }
                    if (profileInfo.password !== checkPassword) {
                      alert(
                        "입력하신 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
                      );
                      return;
                    }
                    if (profileInfo.password === "") {
                      alert("변경할 비밀번호를 입력해주세요.");
                      return;
                    }
                  }
                  putUserInfo(profileInfo).then(() => {
                    setCheckPassword("");
                    refetchUserInfo();
                  });
                }}
                isActive={isSomeChanged(profileInfo, prevProfileInfo)}
                buttonTitle="수정 하기"
                ButtonContainerStyle={{ margin: `0 ${10}px` }}
              />
              <WithdrawButtonWrap>
                <WithdrawButton
                  onClick={() => {
                    setIsWithdrawPopupOpen(true);
                  }}
                >
                  탈퇴하기
                </WithdrawButton>
              </WithdrawButtonWrap>
            </LoginButtonWrap>
          </ApplyButton>
        </MainSubContainer>
      </MainContainer>

      <WithdrawConfirmPopup
        isOpen={isWithdrawPopupOpen}
        onClose={() => setIsWithdrawPopupOpen(false)}
        onConfirm={handleWithdraw}
        isLoading={isWithdrawing}
      />

      <WithdrawCompletePopup
        isOpen={isWithdrawCompletePopupOpen}
        onClose={handleWithdrawComplete}
        retentionDays={retentionDays}
      />
    </>
  );
};

const MainContainer = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 15px;
  margin: 10px;
  height: calc(100% - 20px);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.01);
  border: 1px solid ${theme.grey.Grey2};
`;

const PrivateInfoTitle = styled.div`
  font: ${theme.fontSizes.Headline2};

  margin: 30px 0 0 0;
`;

const LoginInputWrap = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const LoginInputTemplate = styled.input`
  outline: none;
  height: 22px;

  font: ${theme.fontSizes.Body2};
  font-size: 16px;
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

const LoginInputFrameWrap = styled.div`
  margin-bottom: 15px;
`;

const LoginInputTitle = styled.div`
  font: ${theme.fontSizes.Body4};
  margin-left: 5px;
`;

const LoginInputFrame = styled.div`
  border-radius: 20px;
  border: 1px solid ${theme.grey.Grey3};
  background-color: white;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${theme.grey.Grey3};
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  }
`;

const LoginEmailInputWrap = styled.div`
  border-radius: 20px 20px 0 0;
  border: 1px solid ${theme.grey.Grey3};
  background-color: white;
`;

const LoginInputSubWrap = styled.div`
  padding: 10px 20px;
`;

const LoginEmailInput = styled(LoginInputTemplate)``;

const LoginPasswordInputWrap = styled.div`
  border-radius: 0px 0px 20px 20px;
  border-left: 1px solid ${theme.grey.Grey3};
  border-right: 1px solid ${theme.grey.Grey3};
  border-bottom: 1px solid ${theme.grey.Grey3};
  background-color: white;
`;

const LoginPasswordInput = styled(LoginInputTemplate)`
  border-top: 0px;
`;

const LoginButtonWrap = styled.div`
  width: 100%;
`;

const ApplyButton = styled.div`
  margin: 10px 0 20px 0;

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

const WithdrawButtonWrap = styled.div`
  margin-top: 10px;
`;

const WithdrawButton = styled.div`
  text-align: center;
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey3};
  cursor: pointer;
`;

import { APP_PATH } from "@/global/const/AppPathConst";
import {
  MOVE_IN_ADDRESS_DETAIL_ID,
  MOVE_IN_ADDRESS_ID,
  MOVE_IN_BIRTH_ID,
  MOVE_IN_CONTACT_PERIOD_ID,
  MOVE_IN_DATE_ID,
  MOVE_IN_EMAIL_ID,
  MOVE_IN_NAME_ID,
  MOVE_IN_REASON_ID,
  MOVE_IN_RESIDENT_REGISTRATION_NUM_ID,
  MOVE_IN_TEL_ID,
} from "@/global/const/MoveinConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import { postRoomMovein } from "@/services/room/postRoomMovein";
import { getUserInfo } from "@/services/users/getUserInfo";
import theme from "@dosoul/styles";
import {
  handleChange,
  RequestFormTemplateLayot,
  RequestFormTitle,
  TableItem,
  TableRowLayout,
  UpdateFileBody,
} from "@dosoul/ui";
import { getRoomTypeDisplay } from "@dosoul/utils";
import {
  APP_SERVICE_INFO,
  DOSOUL_HEADER_HIEGHT,
} from "@root/packages/consts/src";
import { useToastBar, useUploadFilePopup } from "@root/packages/hooks/src";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HouseMoveinBodyProps {
  roomId: string;
}

export const HouseMoveinBody: React.FC<HouseMoveinBodyProps> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);
  const navigate = useNavigate();

  const [keepFileIds, setKeepFileIds] = useState<number[]>([]);

  const {
    documentFileList,
    onSave: onSaveDocumentFileList,
    onOpen: onOpenDocumentUpload,
    UploadFilePopup,
  } = useUploadFilePopup();

  const [personalInfoTableData, setPersonalInfoTableData] = useState<
    TableItem[]
  >([
    {
      id: MOVE_IN_NAME_ID,
      label: "이름",
      value: "",
      placeholder: "이름을 입력해주세요.",
      type: "text",
      isRequired: true,
    },
    {
      id: MOVE_IN_BIRTH_ID,
      label: "생년월일",
      value: "",
      placeholder: "생년월일을 입력해주세요.",
      type: "date",
      isRequired: true,
    },
    {
      id: MOVE_IN_TEL_ID,
      label: "연락처",
      value: "",
      placeholder: "연락처를 입력해주세요.",
      type: "phone",
      isRequired: true,
    },
    {
      id: MOVE_IN_EMAIL_ID,
      label: "이메일 주소",
      value: "",
      placeholder: "이메일 주소를 입력해주세요.",
      type: "email",
      isRequired: true,
    },
    {
      id: MOVE_IN_RESIDENT_REGISTRATION_NUM_ID,
      label: "주민등록번호",
      value: "",
      placeholder: "주민등록번호를 입력해주세요.",
      type: "resident-registration-num",
      isRequired: true,
    },
    {
      id: MOVE_IN_ADDRESS_ID,
      label: "주소",
      value: "",
      placeholder: "현재 주거하고 있는 주소를 넣어주세요.",
      type: "address",
      isRequired: true,
    },
    {
      id: MOVE_IN_ADDRESS_DETAIL_ID,
      label: "상세 주소",
      value: "",
      placeholder: "상세 주소",
      type: "text",
      isRequired: false,
    },
  ]);

  const [moveinInfoTableData, setMoveinInfoTableData] = useState<TableItem[]>([
    {
      id: MOVE_IN_DATE_ID,
      label: "희망 입주일 (필수)",
      value: "",
      placeholder: "입주일을 입력해주세요.",
      type: "date",
      isRequired: true,
    },
    {
      id: MOVE_IN_CONTACT_PERIOD_ID,
      label: "계약 기간 (필수)",
      value: "",
      placeholder: APP_SERVICE_INFO.minRentPeriodPhrase,
      type: "number",
      isRequired: true,
    },
    {
      id: MOVE_IN_REASON_ID,
      label: "입주 사유 (선택)",
      value: "",
      placeholder: "(선택 사항, 예: 통학, 근문, 독립 등)",
      type: "text",
      isRequired: false,
    },
  ]);

  type AgreementClickType = "isAgreePrivatePerm" | "isAgreeRent";

  const [agreementClickInfo, setAgreementClickInfo] = useState<
    Record<AgreementClickType, boolean>
  >({
    isAgreePrivatePerm: false,
    isAgreeRent: false,
  });

  const clickAgree = (agreeType: AgreementClickType) => {
    setAgreementClickInfo(prev => ({
      ...prev,
      [agreeType]: !prev[agreeType],
    }));
  };

  const { showToast, hideToast } = useToastBar();

  async function onFuncRequestButton() {
    const formData = new FormData();
    const moveinReq = {
      fullName:
        personalInfoTableData.find(v => v.id === MOVE_IN_NAME_ID)?.value || "",
      birthDate:
        personalInfoTableData.find(v => v.id === MOVE_IN_BIRTH_ID)?.value || "",
      phoneNumber:
        personalInfoTableData.find(v => v.id === MOVE_IN_TEL_ID)?.value || "",
      email:
        personalInfoTableData.find(v => v.id === MOVE_IN_EMAIL_ID)?.value || "",
      residentRegistrationNumber:
        personalInfoTableData.find(
          v => v.id === MOVE_IN_RESIDENT_REGISTRATION_NUM_ID,
        )?.value || "",
      address:
        personalInfoTableData.find(v => v.id === MOVE_IN_ADDRESS_ID)?.value ||
        "",
      addressDetail:
        personalInfoTableData.find(v => v.id === MOVE_IN_ADDRESS_DETAIL_ID)
          ?.value || "",
      hopeMoveInDate:
        moveinInfoTableData.find(v => v.id === MOVE_IN_DATE_ID)?.value || "",
      moveInNum:
        moveinInfoTableData.find(v => v.id === MOVE_IN_CONTACT_PERIOD_ID)
          ?.value || "",
      contractPeriodMonth:
        Number(
          moveinInfoTableData.find(v => v.id === MOVE_IN_CONTACT_PERIOD_ID)
            ?.value,
        ) || 0,
      moveInReason:
        moveinInfoTableData.find(v => v.id === MOVE_IN_REASON_ID)?.value || "",
    };

    // 기본 정보 추가
    const moveinReqBlob = new Blob([JSON.stringify(moveinReq)], {
      type: "application/json",
    });
    formData.append("moveinReq", moveinReqBlob);

    const files = documentFileList
      .map(doc => doc.file)
      .filter(file => file !== null);

    // 파일들을 files로 전송
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append("files", file);
      });
    }

    showToast("요청을 처리하고 있습니다. \n 잠시만 기달려주세요.");

    await postRoomMovein(roomId, formData);

    hideToast();
  }

  useEffect(() => {
    getUserInfo().then(data => {
      handleChange(MOVE_IN_NAME_ID, data.fullName, setPersonalInfoTableData);
      handleChange(MOVE_IN_BIRTH_ID, data.birthDate, setPersonalInfoTableData);
      handleChange(MOVE_IN_TEL_ID, data.phoneNumber, setPersonalInfoTableData);
      handleChange(
        MOVE_IN_EMAIL_ID,
        data.receivedEmail,
        setPersonalInfoTableData,
      );
    });
  }, []);

  return (
    <>
      <RequestFormTemplateLayot
        ButtonContainerStyle={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          opacity: "0.9",
          borderRadius: "50%",

          top: DOSOUL_HEADER_HIEGHT,
        }}
        topTitleNode={
          <HouseInfoContainer>
            <HouseName>{roomDetailData?.roomName}</HouseName>
            <HouseType>
              주거형태: {getRoomTypeDisplay(roomDetailData?.roomType || "")}
            </HouseType>
          </HouseInfoContainer>
        }
        tableItemInterfaceList={[
          {
            tableTitleName: "기본 정보(필수)",
            tableItemList: personalInfoTableData,
            updaeTableItemList: setPersonalInfoTableData,
            isInputMode: true,
          },
          {
            tableTitleName: "입주 정보",
            tableItemList: moveinInfoTableData,
            updaeTableItemList: setMoveinInfoTableData,
            isInputMode: true,
          },
        ]}
        isActiveByRequestButton={
          [
            ...personalInfoTableData.filter(v => v.isRequired === true),
            ...moveinInfoTableData.filter(v => v.isRequired === true),
          ].every(item => item.value && item.value.trim() !== "") &&
          Object.values(agreementClickInfo).every(Boolean) &&
          documentFileList.map(doc => doc.file != null).length > 0
        }
        requestButtonTitle={"입주 요청"}
        onFuncRequestButton={onFuncRequestButton}
        onFuncCompleteButton={() => {
          navigate(APP_PATH.MY.MOVE_IN);
        }}
        popupNode={
          <>
            <HouseTitle>요청 완료</HouseTitle>
            <HouseTextWrap>
              <HouseName>{roomDetailData?.roomName}</HouseName>
              <HouseType>
                유형: {getRoomTypeDisplay(roomDetailData?.roomType || "")}
              </HouseType>

              <HouseInfo>
                입주 요청 후, 아래 절차에 따라 진행합니다.
                <br />
                관리자가 요청을 확인한 후 1~2일 이내에 연락을 드릴 예정입니다.
              </HouseInfo>
            </HouseTextWrap>
          </>
        }
        AdditionalItemListNode={
          <>
            <div>
              <RequestFormTitle
                title="제출 서류"
                titleStyle={{ paddingBottom: "10px" }}
              />
              <HouseInfoNoticeContainer>
                <HouseInfoNotice>
                  ※ 신분증 혹은 주민등록증 사진을 포함해주세요.
                </HouseInfoNotice>
              </HouseInfoNoticeContainer>
              <UpdateFileBody
                documentFileList={documentFileList}
                onChangeTempDocumentList={onSaveDocumentFileList}
                onOpenDocumentUpload={onOpenDocumentUpload}
                keepFileIds={keepFileIds}
                onKeepFileIdsChange={keepFileIds => setKeepFileIds(keepFileIds)}
              />
            </div>

            <HouseInfoSectionContainer>
              <RequestFormTitle title={"동의 항목"} />
              <AgreementContainer>
                <TableRowLayout
                  DetailRowContentStyle={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                  DetailLabelStyle={{
                    flexShrink: 0,
                    width: "auto",
                  }}
                  label={
                    <AgreementItem>
                      <AgreementItemCheck
                        onClick={() => clickAgree("isAgreePrivatePerm")}
                        style={
                          agreementClickInfo.isAgreePrivatePerm
                            ? {
                                backgroundColor: theme.grey.Grey2,
                              }
                            : { backgroundColor: "white" }
                        }
                      />
                      <AgreementItemText>
                        개인정보 수집 및 이용 동의
                      </AgreementItemText>
                    </AgreementItem>
                  }
                  DetailValueElement={
                    <AgreementItemDetail
                      onClick={() => {
                        window.open(
                          APP_SERVICE_INFO.privacyPolicyUrl,
                          "_blank",
                        );
                      }}
                    >
                      상세 보기{" "}
                    </AgreementItemDetail>
                  }
                />
                <TableRowLayout
                  DetailRowContentStyle={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                  DetailLabelStyle={{
                    flexShrink: 0,
                    width: "auto",
                  }}
                  isLastRow={true}
                  label={
                    <AgreementItem>
                      <AgreementItemCheck
                        onClick={() => clickAgree("isAgreeRent")}
                        style={
                          agreementClickInfo.isAgreeRent
                            ? {
                                backgroundColor: theme.grey.Grey2,
                              }
                            : { backgroundColor: "white" }
                        }
                      />
                      <AgreementItemText>
                        임대차 계약 조건 확인 및 동의
                      </AgreementItemText>
                    </AgreementItem>
                  }
                  DetailValueElement={
                    <AgreementItemDetail
                      onClick={() => {
                        window.open(
                          APP_SERVICE_INFO.rentAgreementUrl,
                          "_blank",
                        );
                      }}
                    >
                      상세 보기{}
                    </AgreementItemDetail>
                  }
                />
              </AgreementContainer>
            </HouseInfoSectionContainer>
          </>
        }
      />
      {UploadFilePopup}
    </>
  );
};

const HouseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  margin-bottom: 50px;
  @media (max-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    margin-top: ${40 + 30}px;
  }
`;

const HouseType = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
`;

const HouseName = styled.div`
  color: black;
  font: ${theme.fontSizes.Headline3};
`;

const HouseInfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`;

const AgreementContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${theme.grey.Grey2};
`;

const AgreementItem = styled.div`
  display: flex;
  gap: 10px;
  display: flex;
  width: 100%;
`;

const AgreementItemCheck = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 1px solid ${theme.grey.Grey3};
  transition: background-color 0.3s ease;
`;

const AgreementItemDetail = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey5};
  white-space: nowrap;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;
`;

const AgreementItemText = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey4};
`;

const HouseTitle = styled.div`
  padding-top: 10px;
  color: black;
  text-align: center;
  font: ${theme.fontSizes.Subhead3};
`;

const HouseTextWrap = styled.div`
  flex: 1;
  margin: 24px 28px 16px 28px;
`;

const HouseInfo = styled.div`
  margin-top: 20px;
  font: ${theme.fontSizes.Body1};
  color: ${theme.grey.Grey5};
`;

const HouseInfoNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const HouseInfoNotice = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey5};
`;

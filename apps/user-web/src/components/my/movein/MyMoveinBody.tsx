import { APP_CONTACT_KAKAO_LINK } from "@/global/const/AppInfoConst";
import { APP_PATH } from "@/global/const/AppPathConst";
import { deleteRoomMovein } from "@/services/room/deleteRoomMovein";
import {
  getRoomMyMovein,
  type RoomMyMoveinRsp,
} from "@/services/room/getRoomMyMovein";
import theme, { filterBrigntnessStyle } from "@dosoul/styles";
import { ManageTableCol, ManageTableTemplate } from "@dosoul/ui";
import { getRoomMoveinStatusDisplay, getRoomTypeDisplay } from "@dosoul/utils";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@root/packages/consts/src";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContactPopup } from "../ContactPopup";

interface MyMoveinBodyProps {
  MyMoveinBodyStyle: React.CSSProperties;
}

export const MyMoveinBody: React.FC<MyMoveinBodyProps> = ({
  MyMoveinBodyStyle,
}) => {
  const navigate = useNavigate();

  const [checkMoveinIdList, setCheckMoveinIdList] = useState<
    Record<string, boolean>
  >({});

  const [roomMyMoveinList, setRoomMyMoveinList] = useState<RoomMyMoveinRsp[]>(
    [],
  );

  useEffect(() => {
    getRoomMyMovein().then(data => {
      setRoomMyMoveinList(data);
    });
  }, []);

  const [contactPopup, setContactPopup] = useState<{
    isActive: boolean;
    info: {
      roomName: string;
    };
  }>({
    isActive: false,
    info: {
      roomName: "",
    },
  });

  const handleDelete = () => {
    const selectedIds: string[] = Object.entries(checkMoveinIdList)
      .filter(([_, value]) => value) // value가 true인 것만
      .map(([key]) => key); // key만 추출

    if (selectedIds.length <= 0) {
      return;
    }

    const result = window.confirm("정말 삭제하시겠습니까?");

    if (result) {
      deleteRoomMovein({ moveinIds: selectedIds }).then(data => {
        setRoomMyMoveinList(prev =>
          prev.filter(v => !data.moveinIds.includes(v.moveinId)),
        );
      });
    }
  };

  const MY_MOVE_IN_TITLE_LIST = [
    { titleName: "임대 형태" },
    { titleName: "하우스" },
    { titleName: "상태" },
    { titleName: "수정" },
    { titleName: "문의" },
    {
      titleName: "",
      AnotherStyleNode: (
        <Th>
          <DeleteButton
            onClick={() => {
              handleDelete();
            }}
          >
            삭제
          </DeleteButton>
        </Th>
      ),
    },
  ];

  return (
    <>
      {roomMyMoveinList && (
        <ManageTableTemplate
          ManageTableTemplateStyle={MyMoveinBodyStyle}
          HeadTitleList={MY_MOVE_IN_TITLE_LIST}
          bodyTableList={roomMyMoveinList.map(v => {
            return {
              tableColumnTitleList: [
                { titleName: getRoomTypeDisplay(v.roomType) },
                {
                  titleName: "",
                  AnotherStyleNode: (
                    <ManageTableCol
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (!v.roomId) return;
                        navigate(
                          generatePath(APP_PATH.HOUSE_DETAIL, {
                            roomId: v.roomId,
                          }),
                        );
                      }}
                    >
                      {v.roomName}
                    </ManageTableCol>
                  ),
                },
                {
                  titleName: getRoomMoveinStatusDisplay(v.moveInStatus),
                  AnotherStyleNode: (
                    <ManageTableCol
                      style={{
                        color:
                          v.moveInStatus ===
                          ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value
                            ? theme.mainColor.Red
                            : v.moveInStatus ===
                                ROOM_MOVE_IN_DOMAIN_STATUS.APPROVED.value
                              ? theme.mainColor.Blue
                              : theme.grey.Grey7,
                      }}
                    >
                      {getRoomMoveinStatusDisplay(v.moveInStatus)}
                    </ManageTableCol>
                  ),
                },
                {
                  titleName: "",
                  AnotherStyleNode: (
                    <ManageTableCol
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (!v.moveinId) return;
                        navigate(
                          generatePath(APP_PATH.MY.MOVE_IN_DETAIL, {
                            moveinId: v.moveinId,
                          }),
                        );
                      }}
                    >
                      상세 보기
                    </ManageTableCol>
                  ),
                },
                {
                  titleName: "",
                  AnotherStyleNode: (
                    <ManageTableCol
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setContactPopup(prev => ({
                          ...prev,
                          isActive: true,
                          info: {
                            roomName: v.roomName,
                          },
                        }));
                      }}
                    >
                      문의하기
                    </ManageTableCol>
                  ),
                },
                {
                  titleName: "",
                  AnotherStyleNode:
                    v.moveInStatus !==
                    ROOM_MOVE_IN_DOMAIN_STATUS.APPROVED.value ? (
                      <ManageTableCol style={{ position: "relative" }}>
                        <AgreementItemCheck
                          onClick={() => {
                            setCheckMoveinIdList(prev => ({
                              ...prev,
                              [v.moveinId]: !prev[v.moveinId], // 해당 row의 값만 toggle
                            }));
                          }} // moveinId로 구분
                          style={
                            checkMoveinIdList[v.moveinId]
                              ? { backgroundColor: theme.grey.Grey3 }
                              : { backgroundColor: "white" }
                          }
                        />
                      </ManageTableCol>
                    ) : (
                      <div />
                    ),
                },
              ],
            };
          })}
        />
      )}
      <ContactPopup
        isOpen={contactPopup.isActive}
        info={{
          referenceContent: `${contactPopup.info.roomName} 입주자 입니다.`,
        }}
        contactKakoLink={APP_CONTACT_KAKAO_LINK}
        onClose={() =>
          setContactPopup(prev => ({
            ...prev,
            isActive: false,
            info: {
              roomName: "",
            },
          }))
        }
      />
    </>
  );
};

const AgreementItemCheck = styled.div`
  min-width: 20px;
  max-width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 1px solid ${theme.grey.Grey3};
  transition: background-color 0.2s ease;
  margin: auto auto;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Th = styled.th`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey7};
  font-size: 16px;
  text-align: center;
  padding: 10px 15px;
  background: ${theme.grey.Grey1};
  border-bottom: 1px solid ${theme.grey.Grey2};
  min-width: 100px;
`;

const DeleteButton = styled.div`
  border: 1px solid ${theme.grey.Grey3};
  border-radius: 20px;
  width: 50px;
  margin: auto;
  background-color: white;
  ${filterBrigntnessStyle}
`;

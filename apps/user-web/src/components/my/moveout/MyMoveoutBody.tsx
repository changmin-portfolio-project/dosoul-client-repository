import { MoveoutPopup } from "@/components/popup/moveout/MoveoutPopup";
import { APP_CONTACT_KAKAO_LINK } from "@/global/const/AppInfoConst";
import { APP_PATH } from "@/global/const/AppPathConst";
import { deleteRoomMoveout } from "@/services/room/deleteRoomMoveout";
import { getRoomMyMoveout } from "@/services/room/getRoomMyMoveout";
import { roomMyMoveoutListAtom } from "@/state/RoomAtom";
import MakeButtonIcon from "@dosoul/assets/images/icons/button/MakeButtonIcon.svg?react";
import theme, { filterBrigntnessStyle } from "@dosoul/styles";
import { BottomButton, ManageTableCol, ManageTableTemplate } from "@dosoul/ui";
import { getRoomMoveinStatusDisplay, getRoomTypeDisplay } from "@dosoul/utils";
import { ROOM_MOVE_OUT_DOMAIN_STATUS } from "@root/packages/consts/src";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ContactPopup } from "../ContactPopup";

interface MyMoveoutBodyProps {
  MyMoveinBodyStyle: React.CSSProperties;
}

export const MyMoveoutBody: React.FC<MyMoveoutBodyProps> = ({
  MyMoveinBodyStyle,
}) => {
  const navigate = useNavigate();
  const [checkMoveinIdList, setCheckMoveinIdList] = useState<
    Record<string, boolean>
  >({});

  const [roomMyMoveinList, setRoomMyMoveinLIst] = useRecoilState(
    roomMyMoveoutListAtom,
  );

  const [moveoutModalState, setMoveoutModalState] = useState(false);

  useEffect(() => {
    getRoomMyMoveout().then(data => {
      setRoomMyMoveinLIst(data);
    });
  }, []);

  const handleDelete = () => {
    const selectedIds: string[] = Object.entries(checkMoveinIdList)
      .filter(([_, value]) => value) // value가 true인 것만
      .map(([key]) => key); // key만 추출

    if (selectedIds.length <= 0) {
      return;
    }

    const result = window.confirm("정말 삭제하시겠습니까?");

    if (result) {
      deleteRoomMoveout({ moveoutIds: selectedIds }).then(data => {
        setRoomMyMoveinLIst(prev =>
          prev.filter(v => !data.moveoutIds.includes(v.moveoutId)),
        );
      });
      // 삭제 로직
    }
  };

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

  const MY_MOVE_OUT_TITLE_LIST = [
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
          HeadTitleList={MY_MOVE_OUT_TITLE_LIST}
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
                        if (!v.moveoutId) return;
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
                  titleName: getRoomMoveinStatusDisplay(v.moveOutStatus),
                  ColumnStyle: {
                    color:
                      v.moveOutStatus ===
                      ROOM_MOVE_OUT_DOMAIN_STATUS.APPROVED.value
                        ? theme.mainColor.Blue
                        : theme.mainColor.Red,
                  },
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
                        if (!v.moveoutId) return;
                        navigate(
                          generatePath(APP_PATH.MY.MOVE_OUT_DETAIL, {
                            moveoutId: v.moveoutId,
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
                    v.moveOutStatus !==
                    ROOM_MOVE_OUT_DOMAIN_STATUS.APPROVED.value ? (
                      <ManageTableCol style={{ position: "relative" }}>
                        <AgreementItemCheck
                          onClick={() => {
                            setCheckMoveinIdList(prev => ({
                              ...prev,
                              [v.moveoutId]: !prev[v.moveoutId], // 해당 row의 값만 toggle
                            }));
                          }} // moveinId로 구분
                          style={
                            checkMoveinIdList[v.moveoutId]
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
      <BottomButton
        Icon={
          <MakeButtonIconWrap>
            <MakeButtonIcon />
          </MakeButtonIconWrap>
        }
        onClick={() => {
          setMoveoutModalState(true);
        }}
      />

      {moveoutModalState && (
        <MoveoutPopup onClose={() => setMoveoutModalState(false)} />
      )}
      <ContactPopup
        isOpen={contactPopup.isActive}
        info={{
          referenceContent: `${contactPopup.info.roomName} 입주자 입니다. 퇴실 관련하여 문의드립니다.`,
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

const DeleteButton = styled.div`
  border: 1px solid ${theme.grey.Grey3};
  border-radius: 20px;
  width: 50px;
  margin: auto;
  background-color: white;
  ${filterBrigntnessStyle}
`;

const MakeButtonIconWrap = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
`;

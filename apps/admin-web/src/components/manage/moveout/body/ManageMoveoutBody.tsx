import { AdminRoomMoveoutListInfiniteScroll } from "@/components/infinite-scroll/AdminRoomMoveoutListInfiniteScroll";
import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateAdminRoomMoveoutList } from "@/hooks/query/QueryStateAdminRoomMoveoutList";
import { ROOM_MOVE_OUT_DOMAIN_STATUS } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { ManageTableTemplate } from "@dosoul/ui";
import {
  formatDate,
  getRoomMoveoutStatusDisplay,
  getRoomTypeDisplay,
} from "@dosoul/utils";
import React, { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoveOutApprovalPopup } from "../popup/MoveOutApprovalPopup";
import { MoveOutSearchComponent } from "./MoveOutSearchComponent";

interface ManageMoveoutBodyProps {
  ManageMoveoutBodyStyle: React.CSSProperties;
}

export const ManageMoveoutBody: React.FC<ManageMoveoutBodyProps> = ({
  ManageMoveoutBodyStyle,
}) => {
  const navigate = useNavigate();

  const { data: adminRoomMoveoutList } = QueryStateAdminRoomMoveoutList();

  const MANAGE_MOVE_OUT_TITLE_LIST = [
    { titleName: "하우스" },
    { titleName: "입주자" },
    { titleName: "주거형태" },
    { titleName: "등록일" },
    { titleName: "상태" },
  ];

  const [approvalPopup, setApprovalPopup] = useState<{
    isOpen: boolean;
    moveoutId: string;
    residentName: string;
    roomName: string;
  }>({
    isOpen: false,
    moveoutId: "",
    residentName: "",
    roomName: "",
  });

  const handleApprovalClick = (
    e: React.MouseEvent,
    moveoutId: string,
    residentName: string,
    roomName: string,
  ) => {
    e.stopPropagation();
    setApprovalPopup({
      isOpen: true,
      moveoutId,
      residentName,
      roomName,
    });
  };

  return (
    <>
      <ManageTableTemplate
        TopComponent={<MoveOutSearchComponent />}
        ManageTableTemplateStyle={ManageMoveoutBodyStyle}
        HeadTitleList={MANAGE_MOVE_OUT_TITLE_LIST}
        bodyTableList={
          adminRoomMoveoutList?.pages
            .flatMap(v => v)
            .map(v => {
              return {
                tableColumnTitleList: [
                  { titleName: v.roomName },
                  { titleName: v.username },
                  { titleName: getRoomTypeDisplay(v.roomType) },
                  { titleName: formatDate(v.moveOutDate) },
                  {
                    titleName: "",
                    AnotherStyleNode: (
                      <ActionButton
                        onClick={e =>
                          handleApprovalClick(
                            e,
                            v.moveoutId,
                            v.username,
                            v.roomName,
                          )
                        }
                        disabled={
                          v.moveOutStatus !==
                          ROOM_MOVE_OUT_DOMAIN_STATUS.WAITING.value
                        }
                      >
                        {getRoomMoveoutStatusDisplay(v.moveOutStatus)}
                      </ActionButton>
                    ),
                  },
                ],
                onClick: () => {
                  navigate(
                    generatePath(APP_PATH.MANAGE.MOVE_OUT_DETAIL, {
                      moveoutId: v.moveoutId,
                    }),
                  );
                },
              };
            }) ?? []
        }
        TableInfiniteScrollComponent={<AdminRoomMoveoutListInfiniteScroll />}
      />

      <MoveOutApprovalPopup
        isOpen={approvalPopup.isOpen}
        onClose={() => setApprovalPopup(prev => ({ ...prev, isOpen: false }))}
        moveoutId={approvalPopup.moveoutId}
        residentName={approvalPopup.residentName}
        roomName={approvalPopup.roomName}
      />
    </>
  );
};

const ActionButton = styled.button`
  margin: 0 auto;
  display: flex;
  padding: 8px 16px;
  border: 1px solid ${theme.mainColor.Blue};
  border-radius: 6px;
  background-color: white;
  color: ${theme.mainColor.Blue};
  font: ${theme.fontSizes.Body2};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${theme.mainColor.Blue};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: ${theme.grey.Grey4};
    color: ${theme.grey.Grey6};
  }
`;

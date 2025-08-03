import { AdminRoomMoveinListInfiniteScroll } from "@/components/infinite-scroll/AdminRoomMoveinListInfiniteScroll";
import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateAdminRoomMoveinList } from "@/hooks/query/QueryStateAdminRoomMoveinList";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { ManageTableTemplate } from "@dosoul/ui";
import {
  formatDate,
  getRoomMoveinStatusDisplay,
  getRoomTypeDisplay,
} from "@dosoul/utils";
import React, { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoveInApprovalPopup } from "../popup/MoveInApprovalPopup";
import { MoveInSearchComponent } from "./MoveInSearchComponent";

interface HomeBodyProps {
  ManageMoveinBodyStyle: React.CSSProperties;
}

export const ManageMoveinBody: React.FC<HomeBodyProps> = ({
  ManageMoveinBodyStyle,
}) => {
  const navigate = useNavigate();
  const [approvalPopup, setApprovalPopup] = useState<{
    isOpen: boolean;
    moveinId: string;
    residentName: string;
    roomName: string;
  }>({
    isOpen: false,
    moveinId: "",
    residentName: "",
    roomName: "",
  });

  const { data: adminRoomMoveinList } = QueryStateAdminRoomMoveinList();

  const MANAGE_MOVE_IN_TITLE_LIST = [
    { titleName: "하우스" },
    { titleName: "입주자" },
    { titleName: "주거형태" },
    { titleName: "등록일" },
    { titleName: "상태" },
  ];

  const handleApprovalClick = (
    e: React.MouseEvent,
    moveinId: string,
    residentName: string,
    roomName: string,
  ) => {
    e.stopPropagation();
    setApprovalPopup({
      isOpen: true,
      moveinId,
      residentName,
      roomName,
    });
  };

  return (
    <>
      <ManageTableTemplate
        TopComponent={<MoveInSearchComponent />}
        ManageTableTemplateStyle={ManageMoveinBodyStyle}
        HeadTitleList={MANAGE_MOVE_IN_TITLE_LIST}
        bodyTableList={
          adminRoomMoveinList?.pages
            .flatMap(v => v)
            .map(v => {
              return {
                tableColumnTitleList: [
                  { titleName: v.roomName },
                  { titleName: v.username },
                  { titleName: getRoomTypeDisplay(v.roomType) },
                  { titleName: formatDate(v.moveinDate) },
                  {
                    titleName: "",
                    AnotherStyleNode: (
                      <ActionButton
                        onClick={e =>
                          handleApprovalClick(
                            e,
                            v.moveinId,
                            v.username,
                            v.roomName,
                          )
                        }
                        disabled={
                          v.moveInStatus !==
                          ROOM_MOVE_IN_DOMAIN_STATUS.WAITING.value
                        }
                      >
                        {getRoomMoveinStatusDisplay(v.moveInStatus)}
                      </ActionButton>
                    ),
                  },
                ],
                onClick: () => {
                  navigate(
                    generatePath(APP_PATH.MANAGE.MOVE_IN_DETAIL, {
                      moveinId: v.moveinId,
                    }),
                  );
                },
              };
            }) ?? []
        }
        TableInfiniteScrollComponent={<AdminRoomMoveinListInfiniteScroll />}
      />

      {approvalPopup.isOpen && (
        <MoveInApprovalPopup
          onClose={() => setApprovalPopup(prev => ({ ...prev, isOpen: false }))}
          moveinId={approvalPopup.moveinId}
          residentName={approvalPopup.residentName}
          roomName={approvalPopup.roomName}
        />
      )}
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

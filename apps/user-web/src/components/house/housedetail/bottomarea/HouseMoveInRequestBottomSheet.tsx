import WishButton from "@/components/common/button/WishButton";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import theme from "@dosoul/styles";
import { DosoulButton } from "@dosoul/ui";
import { getRoomTypeDisplay } from "@dosoul/utils";
import { POPUP_Z_INDEX } from "@root/packages/consts/src";
import React from "react";
import styled from "styled-components";

interface HouseMoveInRequestBottomSheetProps {
  roomId: string;
  onClickFunc: () => void;
  onClickContactPopup: () => void;
}

export const HouseMoveInRequestBottomSheet: React.FC<
  HouseMoveInRequestBottomSheetProps
> = ({ roomId, onClickFunc, onClickContactPopup }) => {
  const { data: roomDetailData, refetch: refetchRoomDetail } =
    QueryStateRoomDetail(roomId);

  return (
    <HouseMoveInRequestSideContainer>
      <HouseMoveInRequestSideSubContainer>
        <MoveInRequestWrap>
          <HouseTextWrap>
            <HouseType>
              {getRoomTypeDisplay(roomDetailData?.roomType || "")}
            </HouseType>
            <HouseName>{roomDetailData?.roomName}</HouseName>
          </HouseTextWrap>
          <WishButton
            roomId={roomId}
            size="medium"
            isWishlisted={roomDetailData?.isWished || false}
            onWishlistChange={() => {
              refetchRoomDetail();
            }}
          />
        </MoveInRequestWrap>
        <ApplyButtonWrap>
          <DosoulButton
            buttonTitle="상담하기"
            ButtonContainerStyle={{
              background: "white",
              color: "black",
              border: `1px solid ${theme.grey.Grey3}`,
            }}
            onClickFunc={onClickContactPopup}
          />
          <DosoulButton buttonTitle="입주 신청하기" onClickFunc={onClickFunc} />
        </ApplyButtonWrap>
      </HouseMoveInRequestSideSubContainer>
    </HouseMoveInRequestSideContainer>
  );
};

const HouseMoveInRequestSideContainer = styled.div`
  width: 100%;
  z-index: ${POPUP_Z_INDEX + 10};
  background: white;
  box-shadow: 0px -9px 17px 3px rgba(0, 0, 0, 0.05);
  border-radius: 30px 30px 0 0;
  position: fixed;
  bottom: 0px;
`;

const MoveInRequestWrap = styled.div`
  display: flex;
  margin: 24px 28px 16px 28px;
`;

const HouseTextWrap = styled.div`
  flex: 1;
`;

const HouseMoveInRequestSideSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HouseType = styled.div`
  color: black;
  font-size: 14px;
  font: ${theme.fontSizes.Body1};
`;

const HouseName = styled.div`
  color: black;
  font: ${theme.fontSizes.Headline2};
`;

const ApplyButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 1;
  margin-bottom: 10px;
`;

import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import theme from "@dosoul/styles";
import { DosoulButton } from "@dosoul/ui";
import { getRoomTypeDisplay } from "@root/packages/utils/src";
import React from "react";
import styled from "styled-components";

interface HouseMoveInRequestSliderBarProps {
  roomId: string;
  onClickFunc: () => void;
  onClickContactPopup: () => void;
}

export const HouseMoveInRequestSideBar: React.FC<
  HouseMoveInRequestSliderBarProps
> = ({ roomId, onClickFunc, onClickContactPopup }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  return (
    <HouseMoveInRequestSideContainer>
      <HouseMoveInRequestSideSubContainer>
        <HouseTextWrap>
          <HouseType>
            {getRoomTypeDisplay(roomDetailData?.roomType || "")}
          </HouseType>

          <HouseName>{roomDetailData?.roomName}</HouseName>

          <HouseInfo>
            <span>
              월세:{" "}
              {roomDetailData &&
                (roomDetailData.monthlyRent / 10000).toLocaleString()}
              만원
            </span>
            <br />
            <span>
              보증금:{" "}
              {roomDetailData &&
                (roomDetailData.deposit / 10000).toLocaleString()}
              만원
            </span>
            <br />
            <span>입주 가능일:</span> {roomDetailData?.moveInAvailableDate}
          </HouseInfo>
        </HouseTextWrap>
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

const HouseTextWrap = styled.div`
  flex: 1;

  margin: 45px 28px 0 28px;
`;

const HouseMoveInRequestSideContainer = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 5px 10px 10px 10px;
  background: white;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
`;

const HouseMoveInRequestSideSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HouseType = styled.div`
  color: ${theme.grey.Grey6};
  font: ${theme.fontSizes.Body2};
`;

const HouseName = styled.div`
  color: black;
  font: ${theme.fontSizes.Display1};
`;

const HouseInfo = styled.div`
  margin-top: 30px;
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey5};
`;

const ApplyButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 1;
  margin-bottom: 10px;
`;

import { HOUSE_DETAIL_INFO_NAME } from "@/global/const/HouseConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import theme from "@dosoul/styles";
import { KakaoMap, RequestFormTitle } from "@dosoul/ui";
import type React from "react";
import styled from "styled-components";

interface LocationInfoProps {
  roomId: string;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  return (
    <LocationSection id={HOUSE_DETAIL_INFO_NAME.LOCATION.id}>
      <RequestFormTitle title={HOUSE_DETAIL_INFO_NAME.LOCATION.name} />

      <LocationWrap>
        {roomDetailData?.address || ""} {roomDetailData?.addressDetail || ""}
      </LocationWrap>
      <KakaoMap
        address={roomDetailData?.address}
        MapContainerStyle={{
          borderRadius: 20,
          height: 300,
          border: `1px solid ${theme.grey.Grey3}`,
        }}
      />
    </LocationSection>
  );
};

const LocationSection = styled.section`
  margin-top: 20px;
`;

const LocationWrap = styled.div`
  color: ${theme.grey.Grey7};
  font: ${theme.fontSizes.Body2};
  padding: 0 5px;
`;

import { HOUSE_DETAIL_INFO_NAME } from "@/global/const/HouseConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import theme from "@dosoul/styles";
import { RequestFormTitle } from "@dosoul/ui";
import React from "react";
import styled from "styled-components";

interface HouseDetailIntroductionSectionProps {
  roomId: string;
}

export const HouseDetailIntroductionSection: React.FC<
  HouseDetailIntroductionSectionProps
> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  return (
    <IntroductionSection id={HOUSE_DETAIL_INFO_NAME.HOUSE_INFO.id}>
      <RequestFormTitle title={HOUSE_DETAIL_INFO_NAME.HOUSE_INFO.name} />

      <HouseDetailDescWrap>{roomDetailData?.desc || ""}</HouseDetailDescWrap>
    </IntroductionSection>
  );
};

const IntroductionSection = styled.section`
  margin-top: 20px;
`;

const HouseDetailDescWrap = styled.div`
  color: black;
  font: ${theme.fontSizes.Body2};
  padding: 0 5px;
  white-space: pre-line;
`;

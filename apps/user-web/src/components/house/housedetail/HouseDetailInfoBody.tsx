import { HouseDetailIntroductionSection } from "@/components/house/housedetail/leftarea/HouseDetailIntroductionSection";
import theme from "@root/packages/styles/src";
import React from "react";
import styled from "styled-components";
import { HouseDetails } from "./leftarea/HouseDeatil";
import { HouseDetailNavigator } from "./leftarea/HouseDetailNavigator";
import { HouseGallery } from "./leftarea/HouseGallery";
import { LocationInfo } from "./leftarea/LocationInfo";
import { RoomInfo } from "./leftarea/RoomInfo";

interface HouseDetailInfoBodyProps {
  roomId: string;
}

export const HouseDetailInfoBody: React.FC<HouseDetailInfoBodyProps> = ({
  roomId,
}) => {
  return (
    <HouseDetailInfoBodyContainer>
      <HouseGallery roomId={roomId} />
      <HouseDetailInfoBodySubContainer>
        <HouseDetailNavigator />
        <HouseDetailIntroductionSection roomId={roomId} />
        <HouseDetails roomId={roomId} />
        <RoomInfo roomId={roomId} />
        <LocationInfo roomId={roomId} />
      </HouseDetailInfoBodySubContainer>
    </HouseDetailInfoBodyContainer>
  );
};

const HouseDetailInfoBodyContainer = styled.div`
  width: 100%;
`;

const HouseDetailInfoBodySubContainer = styled.div`
  @media (max-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    padding: 0 10px;
  }
`;

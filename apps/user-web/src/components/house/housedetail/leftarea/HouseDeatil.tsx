import { HOUSE_DETAIL_INFO_NAME } from "@/global/const/HouseConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import { ROOM_AMENITY_TYPE } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { RequestFormTitle, TableRowLayout } from "@dosoul/ui";
import { getRoomTypeDisplay } from "@dosoul/utils";
import type React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DosoulHouseTable,
  type DosoulTableInterface,
} from "../../../common/body/table/DosoulHouseTable";
interface HouseDetailsProps {
  roomId: string;
}

export const HouseDetails: React.FC<HouseDetailsProps> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  const [details, setDetails] = useState<DosoulTableInterface[]>([]);

  useEffect(() => {
    if (!roomDetailData) return;
    setDetails([
      { label: "지역", value: roomDetailData.address },
      {
        label: "월임대료",
        value: roomDetailData.monthlyRent
          ? `${roomDetailData.monthlyRent.toLocaleString()}원`
          : "-",
      },

      {
        label: "고정관리비",
        value: roomDetailData.fixedMaintenanceFee
          ? `${roomDetailData.fixedMaintenanceFee.toLocaleString()}원`
          : "-",
      },
      {
        label: "방수",
        value: roomDetailData.roomCount ? `${roomDetailData.roomCount}개` : "-",
      },
      {
        label: "주택유형",
        value: getRoomTypeDisplay(roomDetailData.roomType),
      },

      { label: "제공 서비스", value: roomDetailData.roomAmenityDesc || "-" },
    ]);
  }, [roomDetailData]);

  return (
    <DetailsSection id={HOUSE_DETAIL_INFO_NAME.DEATIL_INFO.id}>
      <RequestFormTitle title={HOUSE_DETAIL_INFO_NAME.DEATIL_INFO.name} />

      <DosoulHouseTable
        tables={details}
        additionalRow={
          roomDetailData &&
          (roomDetailData.roomAmenityIncludedDaos.length > 0 ||
            roomDetailData.roomAmenityOptionalDaos.length > 0) && (
            <TableRowLayout
              label={"제공 시설"}
              isLastRow={true}
              DetailRowContentStyle={{ alignItems: "start", marginTop: "10px" }}
              DetailValueElement={
                <StyledAmenityContainer>
                  {roomDetailData &&
                    roomDetailData.roomAmenityIncludedDaos.filter(
                      amenity =>
                        amenity.amenityType === ROOM_AMENITY_TYPE.INCLUDED,
                    ).length > 0 && (
                      <>
                        <AmenityTitle>기본 옵션</AmenityTitle>
                        <AmenityContainer>
                          {roomDetailData.roomAmenityIncludedDaos
                            .filter(
                              amenity =>
                                amenity.amenityType ===
                                ROOM_AMENITY_TYPE.INCLUDED,
                            )
                            .map(amenity => (
                              <StyledAmenityItem key={amenity.amenityName}>
                                <StyledAmenityItemImage
                                  src={amenity.amenityImageUrl}
                                  alt={amenity.amenityName}
                                />
                                <StyledAmenityItemName>
                                  {amenity.amenityName}
                                </StyledAmenityItemName>
                              </StyledAmenityItem>
                            ))}
                        </AmenityContainer>
                      </>
                    )}

                  {roomDetailData &&
                    roomDetailData.roomAmenityOptionalDaos.filter(
                      amenity =>
                        amenity.amenityType === ROOM_AMENITY_TYPE.OPTIONAL,
                    ).length > 0 && (
                      <>
                        <AmenityTitle>추가 옵션</AmenityTitle>
                        <AmenityContainer>
                          {roomDetailData.roomAmenityOptionalDaos
                            .filter(
                              amenity =>
                                amenity.amenityType ===
                                ROOM_AMENITY_TYPE.OPTIONAL,
                            )
                            .map(amenity => (
                              <StyledAmenityItem key={amenity.amenityName}>
                                <StyledAmenityItemImage
                                  src={amenity.amenityImageUrl}
                                  alt={amenity.amenityName}
                                />
                                <StyledAmenityItemName>
                                  {amenity.amenityName}
                                </StyledAmenityItemName>
                              </StyledAmenityItem>
                            ))}
                        </AmenityContainer>
                      </>
                    )}
                </StyledAmenityContainer>
              }
            />
          )
        }
      />
    </DetailsSection>
  );
};

const DetailsSection = styled.section`
  width: 100%;

  margin-top: 20px;
`;

const AmenityContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const AmenityTitle = styled.div`
  font: ${theme.fontSizes.Subhead3};
`;

const StyledAmenityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledAmenityItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledAmenityItemImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin: 0 auto;
`;

const StyledAmenityItemName = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey8};
  text-align: center;
`;

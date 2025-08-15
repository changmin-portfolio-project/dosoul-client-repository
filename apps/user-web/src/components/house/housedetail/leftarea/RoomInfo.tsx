import { HOUSE_DETAIL_INFO_NAME } from "@/global/const/HouseConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import { RequestFormTitle } from "@dosoul/ui";
import type React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DosoulHouseTable,
  type DosoulTableInterface,
} from "../../../common/body/table/DosoulHouseTable";

interface RoomInfoProps {
  roomId: string;
}

export const RoomInfo: React.FC<RoomInfoProps> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  const [details, setDetails] = useState<DosoulTableInterface[]>([]);

  useEffect(() => {
    if (!roomDetailData) return;
    setDetails([
      { label: "방 이름", value: roomDetailData.roomName },
      {
        label: "보증금",
        value: roomDetailData.deposit
          ? `${roomDetailData.deposit.toLocaleString()}원`
          : "-",
      },
      {
        label: "입주 가능일",
        value: roomDetailData.moveInAvailableDate
          ? `${roomDetailData.moveInAvailableDate}`
          : "-",
      },

      { label: "입주 조건", value: roomDetailData.moveinConditionDesc || "-" },
    ]);
  }, [roomDetailData]);

  return (
    <RoomSection id={HOUSE_DETAIL_INFO_NAME.ROOM_INFO.id}>
      <RequestFormTitle title={HOUSE_DETAIL_INFO_NAME.ROOM_INFO.name} />
      <DosoulHouseTable tables={details} />
    </RoomSection>
  );
};

const RoomSection = styled.section`
  margin-top: 20px;
`;

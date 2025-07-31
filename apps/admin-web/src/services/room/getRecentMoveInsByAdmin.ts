import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { PAGE_PARAM, ROOM_MOVE_IN_DOMAIN_STATUS } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

type RoomMoveInDomainStatusValues =
  (typeof ROOM_MOVE_IN_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_IN_DOMAIN_STATUS]["value"];

export interface RecentMoveInRsp {
  moveInId: string;
  residentId: string;
  residentName: string;
  roomId: string;
  roomName: string;
  roomAddress: string;
  moveInDate: string;
  approvalStatus: RoomMoveInDomainStatusValues;
  createdAt: string;
}

export interface RecentMoveInsResponse {
  data: RecentMoveInRsp[];
  statusCode: string;
  message: string;
}

export const getRecentMoveInsByAdmin = (
  page: number = 0,
  size: number = 10,
): Promise<RecentMoveInRsp[]> => {
  return privateApi
    .get(
      `${ROOM_ADMIN_V1_API_PATH}/recent/moveins?${PAGE_PARAM}=${page}&size=${size}`,
    )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

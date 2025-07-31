import { ROOM_MOVE_IN_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { FILTER_PARAM, KEYWORD_PARAM, PAGE_PARAM } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

export interface RoomResponseImage {
  imageUrl: string;
}

export interface RoomAdminMoveinRsp {
  moveinId: string;
  username: string;
  roomId: string;
  roomName: string;
  roomType: string;
  moveInStatus: string;
  moveinDate: string;
}

export const getRoomMoveInsByAdmin = (
  page: number,
  filter: string,
  keyword: string,
): Promise<RoomAdminMoveinRsp[]> => {
  return privateApi
    .get(
      `${ROOM_MOVE_IN_ADMIN_V1_API_PATH}?${PAGE_PARAM}=${page}&${FILTER_PARAM}=${filter}&${KEYWORD_PARAM}=${keyword}`,
    )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

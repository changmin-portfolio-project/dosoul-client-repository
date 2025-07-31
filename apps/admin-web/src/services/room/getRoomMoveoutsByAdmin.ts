import { ROOM_MOVE_OUT_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { FILTER_PARAM, KEYWORD_PARAM, PAGE_PARAM } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

export interface AdminRoomMoveoutRsp {
  moveoutId: string;
  roomId: string;
  roomName: string;
  roomType: string;
  username: string;
  moveOutDate: string;
  moveOutStatus: string;
}

export const getRoomMoveoutByAdmin = (
  page: number,
  filter: string,
  keyword: string,
): Promise<AdminRoomMoveoutRsp[]> => {
  return privateApi
    .get(
      `${ROOM_MOVE_OUT_ADMIN_V1_API_PATH}?${PAGE_PARAM}=${page}&${FILTER_PARAM}=${filter}&${KEYWORD_PARAM}=${keyword}`,
    )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

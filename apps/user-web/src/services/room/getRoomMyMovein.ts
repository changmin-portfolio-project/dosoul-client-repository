import { ROOM_MY_MOVEIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { MODE_PARAM } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

export interface RoomMyMoveinRsp {
  moveinId: string;
  roomId: string;
  roomName: string;
  roomType: string;
  moveInStatus: string;
}

export const APPROVED_STATUS_VALUE = "REQUEST-MOVEOUT";

export const getRoomMyMovein = (move?: string): Promise<RoomMyMoveinRsp[]> => {
  return privateApi
    .get(ROOM_MY_MOVEIN_V1_API_PATH + (move ? `?${MODE_PARAM}=${move}` : ""))
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

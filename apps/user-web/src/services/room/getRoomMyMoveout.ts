import { ROOM_MY_MOVEOUT_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { privateApi } from "@dosoul/services";

export interface RoomMyMoveoutRsp {
  moveoutId: string;
  roomId: string;
  roomName: string;
  roomType: string;
  moveOutStatus: string;
}

export const getRoomMyMoveout = (): Promise<RoomMyMoveoutRsp[]> => {
  return privateApi
    .get(ROOM_MY_MOVEOUT_V1_API_PATH)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

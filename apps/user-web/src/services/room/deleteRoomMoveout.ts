import { ROOM_MOVEOUT_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { apiWithToast, privateApi } from "@dosoul/services";
import { METHOD_DELETE } from "@root/packages/consts/src";

interface RoomMovinPostReq {
  moveoutIds: string[];
}

export interface RoomDetailDataRsp {
  moveoutIds: string[];
}

export const deleteRoomMoveout = (
  req: RoomMovinPostReq,
): Promise<RoomDetailDataRsp> => {
  return apiWithToast(
    privateApi,
    METHOD_DELETE,
    ROOM_MOVEOUT_V1_API_PATH,
    req,
    {
      hasClose: true,
      timeout: 500,
    },
  )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

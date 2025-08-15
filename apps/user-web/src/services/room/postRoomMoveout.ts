import { ROOM_MOVEOUT_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { apiWithToast, formApi } from "@dosoul/services";
import { METHOD_POST } from "@root/packages/consts/src";
import type { RoomMyMoveoutRsp } from "./getRoomMyMoveout";

export interface MoveOutRequestDto {
  moveinId: string;
  moveOutReason: string;
  moveOutDate: string;
}

export const postRoomMoveout = (
  formData: FormData,
): Promise<RoomMyMoveoutRsp> => {
  return apiWithToast(
    formApi,
    METHOD_POST,
    ROOM_MOVEOUT_V1_API_PATH,
    formData,
    {
      hasClose: true,
      timeout: 500,
    },
  ).then(res => {
    console.log(res.data);
    return res.data.data;
  });
};

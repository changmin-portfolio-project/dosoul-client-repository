import { ROOM_MOVEIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { apiWithToast, privateApi } from "@dosoul/services";
import { METHOD_DELETE } from "@root/packages/consts/src";

interface RoomMovinPostReq {
  moveinIds: string[];
}

export interface RoomDetailDataRsp {
  moveinIds: string[];
}

export const deleteRoomMovein = (
  req: RoomMovinPostReq,
): Promise<RoomDetailDataRsp> => {
  return apiWithToast(privateApi, METHOD_DELETE, ROOM_MOVEIN_V1_API_PATH, req, {
    hasClose: true,
    timeout: 500,
    successMessage: "삭제가 완료되었습니다.",
  })
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

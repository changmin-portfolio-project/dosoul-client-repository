import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { privateApi } from "@dosoul/services";

export interface DeleteRoomResponse {
  message: string;
  data?: any;
}

export const deleteRoomByAdmin = async (
  roomId: string,
): Promise<DeleteRoomResponse> => {
  try {
    return privateApi
      .delete(`${ROOM_ADMIN_V1_API_PATH}/${roomId}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

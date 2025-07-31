import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { FILTER_PARAM, KEYWORD_PARAM, PAGE_PARAM } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

export interface RoomResponseImage {
  imageUrl: string;
}

export interface RoomApiResponse {
  roomNumber: string;
  roomName: string;
  roomType: string;
  monthlyRent: number;
  deposit: number;
  createdAt: string;
}

export const getRoomsByAdmin = (
  page: number,
  filter: string,
  keyword: string,
): Promise<RoomApiResponse[]> => {
  return privateApi
    .get(
      `${ROOM_ADMIN_V1_API_PATH}?${PAGE_PARAM}=${page}&${FILTER_PARAM}=${filter}&${KEYWORD_PARAM}=${keyword}`,
    )
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

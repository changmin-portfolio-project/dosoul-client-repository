import { ROOM_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { PAGE_PARAM } from "@dosoul/consts";
import { optAuthApi } from "@dosoul/services";

export interface RoomResponseImage {
  imageUrl: string;
}

export interface RoomApiResponse {
  roomNumber: string;
  roomName: string;
  roomType: string;
  location: string;
  monthlyRent: number;
  deposit: number;
  description: string;
  isWished: boolean;
  roomResponseImageList: RoomResponseImage[];
}

export const getRoomsByHome = (page: number): Promise<RoomApiResponse[]> => {
  return optAuthApi
    .get(`${ROOM_V1_API_PATH}?${PAGE_PARAM}=${page}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

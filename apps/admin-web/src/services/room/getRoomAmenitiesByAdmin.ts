import { ROOM_AMENITIES_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { privateApi } from "@dosoul/services";

export interface RoomAmenityItem {
  amenityCategory: string;
  amenityImageUrl: string;
  amenityName: string;
}

export interface GetRoomAmenitiesResponse {
  data: RoomAmenityItem[];
  statusCode: string;
  message: string;
}

export const getRoomAmenitiesByAdmin = (): Promise<RoomAmenityItem[]> => {
  return privateApi
    .get(ROOM_AMENITIES_ADMIN_V1_API_PATH)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

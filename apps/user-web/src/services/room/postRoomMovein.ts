import { ROOM_MOVEIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { formApi } from "@dosoul/services";

interface RoomCustomImage {
  imageUrl: string;
}

interface RoomAmenityInfo {
  amenityName: string;
}

export interface RoomDetailDataRsp {
  roomNumber: string;
  roomName: string;
  location: string;
  monthlyRent: number;
  deposit: number;
  roomType: string;
  moveInAvailableDate: string; // ISO Date string
  fixedMaintenanceFee: number;
  roomCount: number;
  netArea: number;
  desc: string;
  moveinConditionDesc: string;
  roomAmenityDesc: string;
  roomAmenityInfoDaos: RoomAmenityInfo[];
  roomCustomImageDaos: RoomCustomImage[];
}

export const postRoomMovein = (
  id: string,
  formData: FormData,
): Promise<RoomDetailDataRsp> => {
  return formApi
    .post(`${ROOM_MOVEIN_V1_API_PATH}/${id}`, formData)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

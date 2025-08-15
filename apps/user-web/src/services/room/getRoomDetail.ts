import { ROOM_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { ROOM_AMENITY_TYPE } from "@dosoul/consts";
import { optAuthApi } from "@dosoul/services";

interface RoomCustomImage {
  imageUrl: string;
}

export interface RoomAmenityInfo {
  amenityName: string;
  amenityImageUrl: string;
  amenityCategory: string;
  amenityType: RoomAmenityTypeValues;
  hasAmenity: boolean;
}

export type RoomAmenityTypeValues =
  (typeof ROOM_AMENITY_TYPE)[keyof typeof ROOM_AMENITY_TYPE];

export interface RoomDetailDataRsp {
  roomNumber: string;
  roomName: string;
  address: string;
  addressDetail: string;
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
  isWished: boolean;
  roomAmenityIncludedDaos: RoomAmenityInfo[];
  roomAmenityOptionalDaos: RoomAmenityInfo[];
  roomCustomImageDaos: RoomCustomImage[];
}

export const getRoomDetail = (id: string): Promise<RoomDetailDataRsp> => {
  return optAuthApi
    .get(`${ROOM_V1_API_PATH}/${id}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

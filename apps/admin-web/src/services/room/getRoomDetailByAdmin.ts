import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { optAuthApi } from "@dosoul/services";

interface RoomCustomImage {
  imageUrl: string;
}

export interface RoomAmenityInfo {
  amenityName: string;
  amenityImageUrl: string;
  amenityCategory: string;
  amenityType: string;
  hasAmenity: boolean;
}

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
  isActive: boolean;
  roomAmenityIncludedDaos: RoomAmenityInfo[];
  roomAmenityOptionalDaos: RoomAmenityInfo[];
  roomCustomImageDaos: RoomCustomImage[];
}

export const RoomDetailDataRspDefault: RoomDetailDataRsp = {
  roomNumber: "",
  roomName: "",
  address: "",
  addressDetail: "",
  monthlyRent: 0,
  deposit: 0,
  roomType: "",
  moveInAvailableDate: "",
  fixedMaintenanceFee: 0,
  roomCount: 0,
  netArea: 0,
  desc: "",
  moveinConditionDesc: "",
  roomAmenityDesc: "",
  isActive: false,
  roomAmenityIncludedDaos: [],
  roomAmenityOptionalDaos: [],
  roomCustomImageDaos: [],
};

export const getRoomDetailByAdmin = (
  id: string,
): Promise<RoomDetailDataRsp> => {
  return optAuthApi
    .get(`${ROOM_ADMIN_V1_API_PATH}/${id}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

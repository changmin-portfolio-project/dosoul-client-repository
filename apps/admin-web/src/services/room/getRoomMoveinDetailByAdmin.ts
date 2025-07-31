import { ROOM_MOVE_IN_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@dosoul/consts";
import { privateApi } from "@dosoul/services";

export interface MoveInDocumentContent {
  // Define fields as needed, or use 'any' if unknown
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  fileFormat: string;
}

type RoomMoveInDomainStatusValues =
  (typeof ROOM_MOVE_IN_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_IN_DOMAIN_STATUS]["value"];

export interface RoomMoveInDetailAdminDto {
  moveInId: string;
  isApproved: boolean;
  approvalStatus: RoomMoveInDomainStatusValues;
  moveInDate: string; // ISO date string
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  rejectionReason: string;
  moveInReason: string;
  moveInDocumentContents: MoveInDocumentContent[];
  fullName: string;
  birthDate: string; // ISO date string
  phoneNumber: string;
  email: string;
  address: string;
  addressDetail: string;
  residentRegistrationNumber: string;
  roomId: string;
  roomName: string;
  roomType: string;
  moveInNum: number;
}

export async function getRoomMoveinDetailByAdmin(
  moveinId: string,
): Promise<RoomMoveInDetailAdminDto> {
  return privateApi
    .get(`${ROOM_MOVE_IN_ADMIN_V1_API_PATH}/${moveinId}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
}

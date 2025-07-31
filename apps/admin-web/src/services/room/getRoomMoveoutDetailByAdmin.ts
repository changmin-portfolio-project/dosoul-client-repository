import { ROOM_MOVE_OUT_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { privateApi } from "@dosoul/services";
import { ROOM_MOVE_OUT_DOMAIN_STATUS } from "~/packages/consts/src";

export interface MoveOutDocumentContent {
  // Define fields as needed, or use 'any' if unknown
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  fileFormat: string;
}

type RoomMoveOutDomainStatusValues =
  (typeof ROOM_MOVE_OUT_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_OUT_DOMAIN_STATUS]["value"];

export interface AdminRoomMoveOutDetailDto {
  moveOutId: string;
  isApproved: boolean;
  approvalStatus: RoomMoveOutDomainStatusValues;
  moveOutDate: string; // ISO date string
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  moveOutReason: string;
  moveOutDocumentContents: MoveOutDocumentContent[];
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
  moveOutNum: number;
}

export async function getRoomMoveoutDetailByAdmin(
  moveoutId: string,
): Promise<AdminRoomMoveOutDetailDto> {
  return privateApi
    .get(`${ROOM_MOVE_OUT_ADMIN_V1_API_PATH}/${moveoutId}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
}

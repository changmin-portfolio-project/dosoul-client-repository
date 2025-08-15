import { ROOM_MOVEOUT_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { privateApi } from "@dosoul/services";
import { ROOM_MOVE_OUT_DOMAIN_STATUS } from "@root/packages/consts/src";

export interface MoveOutDocumentContent {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  fileFormat: string;
}

type RoomMoveOutDomainStatusValues =
  (typeof ROOM_MOVE_OUT_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_OUT_DOMAIN_STATUS]["value"];

export interface MoveOutDetailDto {
  moveOutId: string;
  approvalStatus: RoomMoveOutDomainStatusValues;
  moveOutDate: string; // ISO date string
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  moveOutReason: string;
  moveOutDocumentContents: MoveOutDocumentContent[];
  rejectionReason: string;
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
}

export async function getRoomMoveoutDetail(
  moveinId: string,
): Promise<MoveOutDetailDto> {
  return privateApi
    .get(`${ROOM_MOVEOUT_V1_API_PATH}/${moveinId}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
}

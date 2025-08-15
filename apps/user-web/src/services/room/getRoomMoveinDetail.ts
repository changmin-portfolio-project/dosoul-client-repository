import { ROOM_MOVEIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { privateApi } from "@dosoul/services";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@root/packages/consts/src";

export interface MoveInDocumentContent {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  fileFormat: string;
}

type RoomMoveInDomainStatusValues =
  (typeof ROOM_MOVE_IN_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_IN_DOMAIN_STATUS]["value"];

export interface MoveInDetailDto {
  moveInId: string;
  approvalStatus: RoomMoveInDomainStatusValues;
  moveInNum: number;
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
}

export async function getRoomMoveinDetail(
  moveinId: string,
): Promise<MoveInDetailDto> {
  return privateApi
    .get(`${ROOM_MOVEIN_V1_API_PATH}/${moveinId}`)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
}

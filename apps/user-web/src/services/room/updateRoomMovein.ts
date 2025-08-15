import { ROOM_MOVEIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { apiWithToast, formApi } from "@dosoul/services";
import { METHOD_PUT } from "@root/packages/consts/src";

export interface MoveInUpdateRequestDto {
  fullName: string;
  birthDate: string; // ISO date string
  phoneNumber: string;
  email: string;
  hopeMoveInDate: string; // ISO date string
  contractPeriodMonth: number;
  moveInReason?: string; // 선택
  residentRegistrationNumber: string;
  address: string;
  addressDetail: string;
  keepFileIds?: number[]; // 유지할 기존 파일 ID 목록
}

export interface MoveInUpdateResponse {
  data: {
    moveInId: string;
    message: string;
  };
  statusCode: string;
  message: string;
}

export const updateRoomMovein = async (
  moveInId: string,
  updateData: MoveInUpdateRequestDto,
  files?: File[],
): Promise<MoveInUpdateResponse> => {
  const formData = new FormData();

  formData.append(
    "moveInUpdateRequest",
    new Blob([JSON.stringify(updateData)], { type: "application/json" }),
  );

  // 파일들을 files로 전송
  if (files && files.length > 0) {
    files.forEach(file => {
      formData.append("files", file);
    });
  }

  return apiWithToast(
    formApi,
    METHOD_PUT,
    `${ROOM_MOVEIN_V1_API_PATH}/${moveInId}`,
    formData,
    {
      hasClose: false,
      onFuncClose: () => {},
      timeout: 1000,
      requestMessage: "입주 정보 수정 중입니다.",
      successMessage: "입주 정보 수정 완료",
    },
  )
    .then(res => {
      console.log("Move-in update response:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Move-in update failed:", error);
      throw error;
    });
};

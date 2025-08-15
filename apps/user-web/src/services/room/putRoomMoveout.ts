import { ROOM_MOVEOUT_V1_API_PATH } from "@/global/const/apipath/v1/RoomV1ApiPath";
import { apiWithToast, formApi } from "@dosoul/services";
import { METHOD_PUT } from "@root/packages/consts/src";

export interface MoveOutUpdateRequestDto {
  moveOutReason?: string; // 선택
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

export const putRoomMoveout = async (
  moveOutId: string,
  updateData: MoveOutUpdateRequestDto,
  files?: File[],
): Promise<MoveInUpdateResponse> => {
  const formData = new FormData();

  // JSON 데이터를 moveOutUpdateRequest로 전송
  const jsonData = {
    moveOutReason: updateData.moveOutReason,
    keepFileIds: updateData.keepFileIds || [],
  };

  formData.append(
    "moveOutUpdateRequest",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" }),
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
    `${ROOM_MOVEOUT_V1_API_PATH}/${moveOutId}`,
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
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

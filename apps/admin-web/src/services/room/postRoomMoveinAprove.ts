import { ROOM_MOVE_IN_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { METHOD_POST } from "@dosoul/consts";
import { apiWithToast, privateApi } from "@dosoul/services";

export interface MoveInApprovalRequest {
  approvalStatus: string;
  rejectionReason?: string; // 거절 사유 (선택적)
}

export interface MoveInApprovalResponse {
  data: {
    moveinId: string;
    approvalStatus: string;
    rejectionReason?: string;
    message: string;
  };
  statusCode: string;
  message: string;
}

export const postRoomMoveinApprove = async (
  moveinId: string,
  approvalStatus: string,
  rejectionReason?: string,
): Promise<MoveInApprovalResponse> => {
  const requestBody: MoveInApprovalRequest = {
    approvalStatus,
    ...(rejectionReason && { rejectionReason }),
  };

  return apiWithToast(
    privateApi,
    METHOD_POST,
    `${ROOM_MOVE_IN_ADMIN_V1_API_PATH}/${moveinId}/approve`,
    requestBody,
    {
      hasClose: true,
      timeout: 500,
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

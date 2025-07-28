import { DASHBOARD_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { privateApi } from "@dosoul/services";

export interface DashboardSummaryRsp {
  totalUsers: number;
  userGrowthRate: number;
  totalRooms: number;
  pendingMoveIns: number;
  pendingMoveOuts: number;
  activeUsers: number;
  availableRooms: number;
}

export interface DashboardSummaryResponse {
  data: DashboardSummaryRsp;
  statusCode: string;
  message: string;
}

export const getDashboardSummary = (): Promise<DashboardSummaryRsp> => {
  return privateApi
    .get(DASHBOARD_ADMIN_V1_API_PATH)
    .then(res => {
      console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });
};

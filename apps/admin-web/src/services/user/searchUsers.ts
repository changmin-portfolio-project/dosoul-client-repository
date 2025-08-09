import { privateApi } from "@dosoul/services";

export interface SearchUsersRequest {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface UserInfo {
  userId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface SearchUsersResponse {
  data: {
    content: UserInfo[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
    first: boolean;
    last: boolean;
  };
  statusCode: string;
  message: string;
}

export const searchUsers = async (
  params: SearchUsersRequest = {},
): Promise<SearchUsersResponse> => {
  const response = await privateApi.get<SearchUsersResponse>(
    "/api/v1/admin/users/search",
    {
      params: {
        keyword: params.keyword || "",
        page: params.page || 0,
        size: params.size || 20,
      },
    },
  );
  return response.data;
};

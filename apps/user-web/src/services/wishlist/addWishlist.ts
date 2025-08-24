import { API_V1_PATH } from "@root/packages/consts/src";
import { privateApi } from "@root/packages/services/src";
import { WishlistItem } from "./getWishlist";

export interface AddWishlistRequest {
  roomId: string;
}

export interface AddWishlistResponse {
  data: WishlistItem;
  statusCode: string;
  message: string;
}

export const addWishlist = async (
  roomId: string,
): Promise<AddWishlistResponse> => {
  const response = await privateApi.post<AddWishlistResponse>(
    `${API_V1_PATH}/wishlist`,
    {
      roomId,
    },
  );
  return response.data;
};

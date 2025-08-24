import { privateApi } from "@root/packages/services/src";

export interface RemoveWishlistResponse {
  statusCode: string;
  message: string;
}

export const removeWishlist = async (
  roomId: string,
): Promise<RemoveWishlistResponse> => {
  const response = await privateApi.delete<RemoveWishlistResponse>(
    `/api/v1/wishlist/${roomId}`,
  );
  return response.data;
};

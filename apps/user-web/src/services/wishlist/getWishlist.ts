import { optAuthApi } from "@root/packages/services/src";

export interface WishlistImage {
  roomId: string;
  imageUrl: string;
}

export interface WishlistItem {
  wishlistId: string;
  roomId: string;
  roomName: string;
  housingType: string;
  address: string;
  addressDetail: string;
  monthlyRent: number;
  deposit: number;
  description: string;
  addedAt: string;
  images: WishlistImage[];
  wishCount: number;
}

export interface GetWishlistResponse {
  data: WishlistItem[];
  statusCode: string;
  message: string;
}

export const getWishlist = async (
  page: number = 0,
): Promise<GetWishlistResponse> => {
  const response = await optAuthApi.get<GetWishlistResponse>(
    `/api/v1/wishlist?page=${page}`,
  );
  return response.data;
};

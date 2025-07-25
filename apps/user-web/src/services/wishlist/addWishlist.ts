import axios from 'axios';

export interface AddWishlistRequest {
  roomId: string;
}

export interface AddWishlistResponse {
  success: boolean;
  message: string;
}

export const addWishlist = async (data: AddWishlistRequest): Promise<AddWishlistResponse> => {
  const response = await axios.post('/api/wishlist', data);
  return response.data;
};

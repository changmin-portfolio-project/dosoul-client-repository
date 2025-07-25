import axios from 'axios';

export interface WishlistItem {
  id: string;
  roomId: string;
  roomName: string;
  roomPrice: number;
  addedAt: string;
}

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const response = await axios.get('/api/wishlist');
  return response.data;
};

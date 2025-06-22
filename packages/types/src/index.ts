export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface Room {
  id: string;
  name: string;
  type: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  price: number;
}

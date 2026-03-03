export interface UsersSlice {
  users: User[];
  updatedUser: (newValue: User) => void;
}

export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

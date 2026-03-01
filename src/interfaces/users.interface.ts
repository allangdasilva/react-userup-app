export interface UsersSlice {
  users: User[];
  updatedUser: (newValue: User) => void;
}

export interface User {
  id: number;
  nome: string;
  cargo: string;
  email: string;
}

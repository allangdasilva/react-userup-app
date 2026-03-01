import type { StateCreator } from "zustand";
import type { UsersSlice } from "../../interfaces/users.interface";
import { users } from "../../mock/users";

export const createUsersSlice: StateCreator<
  UsersSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  UsersSlice
> = (set) => ({
  users: users,
  updatedUser: (newValue) => set((state) => ({ users })),
});

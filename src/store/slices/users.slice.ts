import type { StateCreator } from "zustand";
import type { UsersSlice } from "../../interfaces/users.interface";
import { users } from "../../mock/users";

export const createUsersSlice: StateCreator<
  UsersSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  UsersSlice
> = (set, get) => ({
  users: users,
  updatedUser: async (newValue) => {
    const users = get().users;
    const updated = users.map((user) =>
      user.id === newValue.id ? newValue : user,
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({ users: updated });
  },
});

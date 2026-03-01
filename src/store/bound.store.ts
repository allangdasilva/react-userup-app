import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUsersSlice } from "./slices/users.slice";
import type { UsersSlice } from "../interfaces/users.interface";

export const useBoundStore = create<UsersSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createUsersSlice(...a),
      }),
      { name: "users-storage" },
    ),
  ),
);

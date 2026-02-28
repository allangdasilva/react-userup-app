import axios from "axios";
import type { User } from "../interfaces/user";

export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await axios.get("/api/users.json");
  return response.data as User[];
}

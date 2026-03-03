import { useShallow } from "zustand/shallow";
import { useBoundStore } from "../../store/bound.store";
import UserModal from "./UserModal";

const UserCard = () => {
  const { users } = useBoundStore(
    useShallow((state) => ({ users: state.users })),
  );

  return (
    <ul className="flex-1 flex flex-col gap-4 max-w-md">
      {users.map((user) => (
        <li
          className="flex justify-between items-start gap-2 p-4 rounded-xl bg-mauve-900"
          key={user.id}
        >
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-mauve-50">
              {user.name}
            </span>
            <span className="text-mauve-400">{user.role}</span>
            <span className="text-mauve-400">{user.email}</span>
          </div>
          <UserModal user={user} />
        </li>
      ))}
    </ul>
  );
};

export default UserCard;

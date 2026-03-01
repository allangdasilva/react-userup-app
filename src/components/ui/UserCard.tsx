import { useShallow } from "zustand/shallow";
import { useBoundStore } from "../../store/bound.store";

const UserCard = () => {
  const { users } = useBoundStore(
    useShallow((state) => ({ users: state.users })),
  );

  return (
    <ul className="flex-1 flex flex-col gap-4 max-w-md">
      {users.map(({ id, nome, cargo, email }) => (
        <li
          className="flex-1 flex flex-col gap-2 p-2 rounded-xl bg-indigo-300"
          key={id}
        >
          <span className="text-xl font-semibold">{nome}</span>
          <span>{cargo}</span>
          <span>{email}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserCard;

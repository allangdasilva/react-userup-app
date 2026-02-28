import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/my-api";

const UserCard = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  if (isPending) return <span>Carregando...</span>;
  if (error) return <span>Oops!</span>;
  console.log(data);
  return (
    <ul className="flex-1 flex flex-col gap-4 max-w-md">
      {data.map((user) => (
        <li
          className="flex-1 flex flex-col gap-2 p-2 rounded-xl bg-indigo-300"
          key={user.id}
        >
          <span className="text-xl font-semibold">{user.nome}</span>
          <span>{user.cargo}</span>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserCard;

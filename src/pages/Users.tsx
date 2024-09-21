import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenericTable from "../components/GenericTable";

interface User {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

const USER_ENTITY_FIELDS: { label: string; key: keyof User }[] = [
  { label: "Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Banned", key: "banned" },
];

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(
    "https://inqool-interview-api.vercel.app/api/users"
  );

  return data;
};

const Users = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <GenericTable data={data} fields={USER_ENTITY_FIELDS} />;
};

export default Users;

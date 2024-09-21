import { useQuery } from "@tanstack/react-query";
import GenericTable from "../components/GenericTable";
import { fetchObjects } from "../utils/apiRequests";

interface User {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

const USER_ENTITY_FIELDS: { label: string; key: keyof User }[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Banned", key: "banned" },
];

const Users = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchObjects<User>("users"),
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <GenericTable data={data} fields={USER_ENTITY_FIELDS} />;
};

export default Users;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "../components/GenericTable";
import {
  addObject,
  deleteObjectWithId,
  fetchObjects,
} from "../utils/apiRequests";

interface User {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

const ENDPOINT = "users";
const USER_ENTITY_FIELDS: { label: string; key: keyof User }[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Banned", key: "banned" },
];

const Users = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: [ENDPOINT],
    queryFn: () => fetchObjects<User>(ENDPOINT),
  });

  const addUserMutation = useMutation({
    mutationFn: (newObject: User) => {
      return addObject(ENDPOINT, newObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINT] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (objectId: string) => {
      return deleteObjectWithId<User>(ENDPOINT, objectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINT] });
    },
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <GenericTable
      endpoint={ENDPOINT}
      data={data}
      fields={USER_ENTITY_FIELDS}
      onDelete={(id) => deleteUserMutation.mutate(id)}
    />
  );
};

export default Users;

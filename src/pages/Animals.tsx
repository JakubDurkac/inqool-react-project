import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "../components/GenericTable";
import {
  addObject,
  deleteObjectWithId,
  fetchObjects,
} from "../utils/apiRequests";

interface Animal {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
}

const ENDPOINT = "animals";
const ANIMAL_ENTITY_FIELDS: { label: string; key: keyof Animal }[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Age", key: "age" },
];

const Animals = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: [ENDPOINT],
    queryFn: () => fetchObjects<Animal>(ENDPOINT),
  });

  const addUserMutation = useMutation({
    mutationFn: (newObject: Animal) => {
      return addObject(ENDPOINT, newObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINT] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (objectId: string) => {
      return deleteObjectWithId<Animal>(ENDPOINT, objectId);
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
      fields={ANIMAL_ENTITY_FIELDS}
      onDelete={(id) => deleteUserMutation.mutate(id)}
    />
  );
};

export default Animals;

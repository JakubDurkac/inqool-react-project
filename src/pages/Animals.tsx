import { useQuery } from "@tanstack/react-query";
import GenericTable from "../components/GenericTable";
import { fetchObjects } from "../utils/apiRequests";

interface Animal {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
}

const ANIMAL_ENTITY_FIELDS: { label: string; key: keyof Animal }[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Age", key: "age" },
];

const Animals = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: () => fetchObjects<Animal>("animals"),
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <GenericTable data={data} fields={ANIMAL_ENTITY_FIELDS} />;
};

export default Animals;

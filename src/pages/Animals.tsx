import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenericTable from "../components/GenericTable";

interface Animal {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
}

const ANIMAL_ENTITY_FIELDS: { label: string; key: keyof Animal }[] = [
  { label: "Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Age", key: "age" },
];

const fetchAnimals = async () => {
  const { data } = await axios.get<Animal[]>(
    "https://inqool-interview-api.vercel.app/api/animals"
  );

  return data;
};

const Animals = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <GenericTable data={data} fields={ANIMAL_ENTITY_FIELDS} />;
};

export default Animals;

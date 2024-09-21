import { ActionOnSelected } from "../types";
import GenericEntity from "./GenericEntity";

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
  return (
    <GenericEntity<Animal>
      endpoint={ENDPOINT}
      entityFields={ANIMAL_ENTITY_FIELDS}
      extraActionsOnSelected={[]}
    />
  );
};

export default Animals;

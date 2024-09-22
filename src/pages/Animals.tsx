import GenericEntity from "./GenericEntity";
import { z } from "zod";

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

const VALIDATION_SCHEMA = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
  type: z
    .enum(["cat", "dog", "other", ""])
    .transform((value) => (value === "" ? undefined : value)),
  age: z.union([z.literal("").transform(() => undefined), z.coerce.number()]),
});

const Animals = () => {
  return (
    <GenericEntity<Animal>
      endpoint={ENDPOINT}
      entityFields={ANIMAL_ENTITY_FIELDS}
      validationSchema={VALIDATION_SCHEMA}
      extraActionsOnSelected={[]}
    />
  );
};

export default Animals;

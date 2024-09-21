import GenericEntity from "./GenericEntity";

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
  return (
    <GenericEntity<User>
      endpoint={ENDPOINT}
      entityFields={USER_ENTITY_FIELDS}
    />
  );
};

export default Users;

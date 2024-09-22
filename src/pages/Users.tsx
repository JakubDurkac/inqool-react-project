import { useMutation, useQueryClient } from "@tanstack/react-query";
import GenericEntity from "./GenericEntity";
import { patchObject } from "../utils/apiRequests";
import { z } from "zod";

interface User {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

const ENDPOINT = "users";
const USER_ENTITY_FIELDS: { label: string; key: keyof User }[] = [
  { label: "Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Banned", key: "banned" },
  { label: "ID", key: "id" },
];

const FILTER_ATTRIBUTES = ["name"];
const IS_INDEXED_TABLE = true;
const VALIDATION_SCHEMA = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
  gender: z
    .enum(["female", "male", "other", ""])
    .transform((value) => (value === "" ? undefined : value)),
  banned: z.enum(["true", "false", ""]).transform((value) => {
    if (value === "") return undefined;
    return value === "true";
  }),
});

const Users = () => {
  const queryClient = useQueryClient();

  // defining ban/unban action on selected User (using API PATCH request)
  const banUserMutation = useMutation({
    mutationFn: (userInfo: { id: string; isBanned: boolean }) => {
      const { id, isBanned } = userInfo;
      return patchObject(ENDPOINT, id, { banned: !isBanned });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINT] });
    },
  });

  const banAction = {
    buttonLabel: "Ban",
    onClick: (id: string, user: User) =>
      banUserMutation.mutate({ id: id, isBanned: user.banned }),
    buttonOnObjectSelect: (user: User) => {
      const { banned } = user;
      return {
        newLabel: banned ? "Unban" : "Ban",
        newStyleClass: banned ? "btn-outline-success" : "btn-outline-danger",
      };
    },
  };

  return (
    <GenericEntity<User>
      endpoint={ENDPOINT}
      entityFields={USER_ENTITY_FIELDS}
      validationSchema={VALIDATION_SCHEMA}
      extraActionsOnSelected={[banAction]}
      filterAttributes={FILTER_ATTRIBUTES}
      isIndexed={IS_INDEXED_TABLE}
    />
  );
};

export default Users;

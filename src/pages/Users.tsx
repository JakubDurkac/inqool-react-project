import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionOnSelected } from "../types";
import GenericEntity from "./GenericEntity";
import { patchObject } from "../utils/apiRequests";

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
      extraActionsOnSelected={[banAction]}
    />
  );
};

export default Users;

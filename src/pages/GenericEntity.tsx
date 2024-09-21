import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addObject,
  deleteObjectWithId,
  fetchObjects,
} from "../utils/apiRequests";
import GenericTable from "../components/GenericTable";
import { ActionOnSelected, Endpoint, Identifiable } from "../types";

type EntityProps<T extends Identifiable> = {
  endpoint: Endpoint;
  entityFields: { label: string; key: keyof T }[];
  extraActionsOnSelected: ActionOnSelected<T>[];
};

const GenericEntity = <T extends Identifiable>({
  endpoint,
  entityFields,
  extraActionsOnSelected,
}: EntityProps<T>) => {
  const queryClient = useQueryClient();

  // GET
  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchObjects<T>(endpoint),
  });

  // POST
  const addMutation = useMutation({
    mutationFn: (newObject: T) => addObject(endpoint, newObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (objectId: string) => deleteObjectWithId(endpoint, objectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <GenericTable
      data={data}
      fields={entityFields}
      onDelete={(id: string) => deleteMutation.mutate(id)}
      extraActionsOnSelected={extraActionsOnSelected}
    />
  );
};

export default GenericEntity;

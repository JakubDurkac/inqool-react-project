import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addObject,
  deleteObjectWithId,
  fetchObjects,
} from "../utils/apiRequests";
import GenericTable from "../components/GenericTable";
import { Endpoint, Identifiable } from "../types";

type EntityProps<T extends Identifiable> = {
  endpoint: Endpoint;
  entityFields: { label: string; key: keyof T }[];
};

const GenericEntity = <T extends Identifiable>({
  endpoint,
  entityFields,
}: EntityProps<T>) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchObjects<T>(endpoint),
  });

  const addMutation = useMutation({
    mutationFn: (newObject: T) => addObject(endpoint, newObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

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
      endpoint={endpoint}
      data={data}
      fields={entityFields}
      onDelete={(id: string) => deleteMutation.mutate(id)}
    />
  );
};

export default GenericEntity;

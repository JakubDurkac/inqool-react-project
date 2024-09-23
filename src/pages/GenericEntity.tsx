import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addObject,
  deleteObjectWithId,
  fetchObjects,
  patchObject,
} from "../utils/apiRequests";
import GenericTable from "../components/GenericTable";
import { ActionOnSelected, Endpoint, Identifiable } from "../types";
import { ZodSchema } from "zod";

type EntityProps<T extends Identifiable> = {
  endpoint: Endpoint;
  entityFields: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  extraActionsOnSelected: ActionOnSelected<T>[];
  filterAttributes: string[];
  isIndexed: boolean;
};

const GenericEntity = <T extends Identifiable>({
  endpoint,
  entityFields,
  validationSchema,
  extraActionsOnSelected,
  filterAttributes,
  isIndexed,
}: EntityProps<T>) => {
  const queryClient = useQueryClient();

  // GET
  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchObjects<T>(endpoint),
  });

  // POST
  const addMutation = useMutation({
    mutationFn: (object: Partial<T>) => addObject(endpoint, object),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  // PATCH
  const editMutation = useMutation({
    mutationFn: (info: { id: string; object: Partial<T> }) => {
      const { id, object } = info;
      return patchObject(endpoint, id, object);
    },
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
      endpoint={endpoint}
      data={data}
      fields={entityFields}
      validationSchema={validationSchema}
      onAdd={(object: Partial<T>) => addMutation.mutate(object)}
      onEdit={(object: Partial<T>, id: string) =>
        editMutation.mutate({ id: id, object: object })
      }
      onDelete={(id: string) => deleteMutation.mutate(id)}
      extraActionsOnSelected={extraActionsOnSelected}
      filterAttributes={filterAttributes}
      isIndexed={isIndexed}
    />
  );
};

export default GenericEntity;

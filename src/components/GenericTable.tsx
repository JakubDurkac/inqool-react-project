import { useState } from "react";
import { ActionOnSelected, Identifiable } from "../types";
import { ZodSchema } from "zod";
import GenericAddEditForm from "./GenericAddEditForm";
import GenericActionsOnSelected from "./GenericActionsOnSelected";
import GenericDeleteButton from "./GenericDeleteButton";
import GenericTableContent from "./GenericTableContent";
import FilterForm from "./FilterForm";

type TableProps<T extends Identifiable> = {
  data: T[];
  fields: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  onAdd: (object: Partial<T>) => void;
  onEdit: (object: Partial<T>, id: string) => void;
  onDelete: (id: string) => void;
  extraActionsOnSelected: ActionOnSelected<T>[];
  filterAttributes: string[];
  isIndexed: boolean;
};

const GenericTable = <T extends Identifiable>({
  data,
  fields,
  validationSchema,
  onAdd,
  onEdit,
  onDelete,
  extraActionsOnSelected,
  filterAttributes,
  isIndexed,
}: TableProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const fieldsWithoutId = fields.filter((field) => field.key !== "id");

  return (
    <>
      <GenericAddEditForm
        data={data}
        fieldsWithoutId={fieldsWithoutId}
        validationSchema={validationSchema}
        onAdd={onAdd}
        onEdit={onEdit}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <GenericActionsOnSelected
        data={data}
        extraActionsOnSelected={extraActionsOnSelected}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <GenericDeleteButton
        data={data}
        onDelete={onDelete}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <FilterForm
        filterAttributes={filterAttributes}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <GenericTableContent
        data={data}
        fields={fields}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        filterValues={filterValues}
        isIndexed={isIndexed}
      />
    </>
  );
};

export default GenericTable;

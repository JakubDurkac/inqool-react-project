import { useState } from "react";
import { ActionOnSelected, Identifiable } from "../types";
import { ZodSchema } from "zod";
import GenericAddEditForm from "./GenericAddEditForm";
import GenericActionsOnSelected from "./GenericActionsOnSelected";
import GenericDeleteButton from "./GenericDeleteButton";
import GenericTableContent from "./GenericTableContent";

type TableProps<T extends Identifiable> = {
  data: T[];
  fields: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  onAdd: (object: Partial<T>) => void;
  onEdit: (object: Partial<T>, id: string) => void;
  onDelete: (id: string) => void;
  extraActionsOnSelected: ActionOnSelected<T>[];
};

const GenericTable = <T extends Identifiable>({
  data,
  fields,
  validationSchema,
  onAdd,
  onEdit,
  onDelete,
  extraActionsOnSelected,
}: TableProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
      <GenericTableContent
        data={data}
        fields={fields}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
};

export default GenericTable;

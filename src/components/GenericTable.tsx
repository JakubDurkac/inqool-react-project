import { useState } from "react";
import { ActionOnSelected, Identifiable } from "../types";
import { ZodSchema } from "zod";
import GenericAddEditForm from "./GenericAddEditForm";
import GenericActionsOnSelected from "./GenericActionsOnSelected";
import GenericTableContent from "./GenericTableContent";
import FilterForm from "./FilterForm";
import DeleteButton from "./DeleteButton";

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
  const [selectedId, setSelectedId] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const fieldsWithoutId = fields.filter((field) => field.key !== "id");

  return (
    <>
      <div className="table-tools-container">
        <GenericAddEditForm
          fieldsWithoutId={fieldsWithoutId}
          validationSchema={validationSchema}
          onAdd={onAdd}
          onEdit={onEdit}
          selectedId={selectedId}
        />
        <FilterForm
          filterAttributes={filterAttributes}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
        <div className="extra-table-tools-container">
          <div className="extra-table-tools">
            <DeleteButton
              onDelete={onDelete}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
            <GenericActionsOnSelected
              data={data}
              extraActionsOnSelected={extraActionsOnSelected}
              selectedId={selectedId}
            />
          </div>
        </div>
      </div>
      <GenericTableContent
        data={data}
        fields={fields}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        filterValues={filterValues}
        isIndexed={isIndexed}
      />
    </>
  );
};

export default GenericTable;

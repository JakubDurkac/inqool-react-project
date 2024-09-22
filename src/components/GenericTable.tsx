import { useState } from "react";
import { ActionOnSelected, Identifiable } from "../types";
import { ZodSchema } from "zod";
import GenericAddEditForm from "./GenericAddEditForm";

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
      {extraActionsOnSelected.map((action, index) => {
        const isDisabledButton = selectedIndex === -1;
        const { newLabel, newStyleClass } = isDisabledButton
          ? { newLabel: "", newStyleClass: "" }
          : action.buttonOnObjectSelect(data[selectedIndex]);
        return (
          <button
            key={index}
            disabled={isDisabledButton}
            type="button"
            className={`btn ${
              isDisabledButton ? "btn-outline-light" : newStyleClass
            }`}
            onClick={() => {
              if (selectedIndex !== -1) {
                setSelectedIndex(-1);
                action.onClick(data[selectedIndex].id, data[selectedIndex]);
              }
            }}
          >
            {isDisabledButton ? action.buttonLabel : newLabel}
          </button>
        );
      })}
      <button
        disabled={selectedIndex === -1}
        type="button"
        className={`btn ${
          selectedIndex === -1 ? "btn-outline-light" : "btn-outline-danger"
        }`}
        onClick={() => {
          if (selectedIndex !== -1) {
            setSelectedIndex(-1);
            onDelete(data[selectedIndex].id);
          }
        }}
      >
        Remove Selected
      </button>
      <table className="table table-light table-striped table-hover border-dark">
        <thead className="table-dark">
          <tr>
            {fields.map((field) => (
              <th scope="col" key={field.key as string}>
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              className={
                index === selectedIndex ? "table-primary border-dark" : ""
              }
              key={index}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {fields.map((field) => (
                <td key={field.key as string}>{String(item[field.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GenericTable;

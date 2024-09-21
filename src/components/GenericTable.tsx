import { useState } from "react";
import { ActionOnSelected, Identifiable } from "../types";

type TableProps<T extends Identifiable> = {
  data: T[];
  fields: { label: string; key: keyof T }[];
  onDelete: (id: string) => void;
  extraActionsOnSelected: ActionOnSelected<T>[];
};

const GenericTable = <T extends Identifiable>({
  data,
  fields,
  onDelete,
  extraActionsOnSelected,
}: TableProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      {extraActionsOnSelected.map((action) => {
        const isDisabledButton = selectedIndex === -1;
        const { newLabel, newStyleClass } = isDisabledButton
          ? { newLabel: "", newStyleClass: "" }
          : action.buttonOnObjectSelect(data[selectedIndex]);
        return (
          <button
            disabled={isDisabledButton}
            type="button"
            className={`btn ${
              isDisabledButton ? "btn-outline-primary" : newStyleClass
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
        className="btn btn-outline-danger"
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

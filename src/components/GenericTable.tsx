import { useState } from "react";
import { Endpoint, Identifiable } from "../types";

type Props<T extends Identifiable> = {
  endpoint: Endpoint;
  data: T[];
  fields: { label: string; key: keyof T }[];
  onDelete: (id: string) => void;
};

const GenericTable = <T extends Identifiable>({
  endpoint,
  data,
  fields,
  onDelete,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <button
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

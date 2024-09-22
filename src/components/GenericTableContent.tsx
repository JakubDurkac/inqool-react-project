import { Identifiable } from "../types";

interface ContentProps<T extends Identifiable> {
  data: T[];
  fields: { label: string; key: keyof T }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  filterValues: Record<string, string>;
}

const GenericTableContent = <T extends Identifiable>({
  data,
  fields,
  selectedIndex,
  setSelectedIndex,
  filterValues,
}: ContentProps<T>) => {
  const filteredData = data.filter((item) =>
    Object.entries(filterValues).every(([key, filterValue]) => {
      if (!filterValue) return true; // Include if no filter applied
      return String(item[key as keyof T])
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    })
  );

  return (
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
        {filteredData.map((item, index) => (
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
  );
};

export default GenericTableContent;

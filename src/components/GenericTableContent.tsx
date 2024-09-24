import { Identifiable } from "../types";

interface ContentProps<T extends Identifiable> {
  data: T[];
  fields: { label: string; key: keyof T }[];
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  filterValues: Record<string, string>;
  isIndexed: boolean;
}

const GenericTableContent = <T extends Identifiable>({
  data,
  fields,
  selectedId,
  setSelectedId,
  filterValues,
  isIndexed,
}: ContentProps<T>) => {
  const filteredData = data.filter((item) =>
    Object.entries(filterValues).every(([key, filterValue]) => {
      if (!filterValue) {
        return true; // include item if filter is empty
      }

      // include item if its attribute is a substring of the given filter value
      return String(item[key as keyof T])
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    })
  );

  // generate table header and contents based on given table schema <fields> and <filteredData>
  return (
    <table className="table table-light table-striped table-hover border-dark">
      <thead className="table-dark">
        <tr>
          {isIndexed && <th scope="col">#</th>}
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
              item.id === selectedId ? "table-warning border-dark" : ""
            }
            key={item.id}
            onClick={() => {
              setSelectedId(item.id);
            }}
          >
            {isIndexed && (
              <th scope="row" className="table-dark">
                {index + 1}
              </th>
            )}
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

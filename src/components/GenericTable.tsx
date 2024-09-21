type Props<T> = {
  data: T[];
  fields: { label: string; key: keyof T }[];
};

const GenericTable = <T,>({ data, fields }: Props<T>) => {
  return (
    <table className="table table-light table-striped border-dark">
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
          <tr key={index}>
            {fields.map((field) => (
              <td key={field.key as string}>{String(item[field.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;

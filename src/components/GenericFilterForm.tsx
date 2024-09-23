import { Identifiable } from "../types";

interface FilterProps<T extends Identifiable> {
  fields: { label: string; key: keyof T }[];
  filterAttributes: string[];
  filterValues: Record<string, string>;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const GenericFilterForm = <T extends Identifiable>({
  fields,
  filterAttributes,
  filterValues,
  setFilterValues,
}: FilterProps<T>) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const getFieldLabelFromKey = (key: keyof T) => {
    const foundField = fields.find((field) => field.key === key);
    return foundField ? foundField.label : key;
  };

  const areAllFiltersEmpty = Object.values(filterValues).every(
    (value) => value === "" || value === undefined
  );

  return (
    <div className="table-filter-form-container">
      <form>
        {filterAttributes.map((key) => (
          <div key={key} className="input-container">
            <input
              className="table-text-input"
              type="text"
              placeholder={`Filter by '${String(
                getFieldLabelFromKey(key as keyof T)
              )}'`}
              value={filterValues[key] || ""}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        ))}
        <button
          disabled={areAllFiltersEmpty}
          className="btn btn-outline-warning table-tool-button"
          type="button"
          onClick={() => setFilterValues({})}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default GenericFilterForm;

interface FilterProps {
  filterAttributes: string[];
  filterValues: Record<string, string>;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const FilterForm = ({
  filterAttributes,
  filterValues,
  setFilterValues,
}: FilterProps) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="table-filter-form-container">
      <form>
        {filterAttributes.map((key) => (
          <div key={key} className="input-container">
            <input
              className="table-text-input"
              type="text"
              placeholder={`Filter by ${key}`}
              value={filterValues[key] || ""}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        ))}
        <button
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

export default FilterForm;

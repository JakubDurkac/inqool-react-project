import { Identifiable } from "../types";

interface DeleteProps<T extends Identifiable> {
  data: T[];
  onDelete: (id: string) => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GenericDeleteButton = <T extends Identifiable>({
  data,
  onDelete,
  selectedIndex,
  setSelectedIndex,
}: DeleteProps<T>) => {
  return (
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
      Delete
    </button>
  );
};

export default GenericDeleteButton;

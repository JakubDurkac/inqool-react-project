interface DeleteProps {
  onDelete: (id: string) => void;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteButton = ({ onDelete, selectedId, setSelectedId }: DeleteProps) => {
  return (
    <button
      disabled={selectedId === ""}
      type="button"
      className="table-tool-button btn btn-outline-danger"
      onClick={() => {
        if (selectedId !== "") {
          setSelectedId("");
          onDelete(selectedId);
        }
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;

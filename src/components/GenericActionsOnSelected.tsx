import { ActionOnSelected, Identifiable } from "../types";

interface ActionsProps<T extends Identifiable> {
  data: T[];
  extraActionsOnSelected: ActionOnSelected<T>[];
  selectedId: string;
}

const GenericActionsOnSelected = <T extends Identifiable>({
  data,
  extraActionsOnSelected,
  selectedId,
}: ActionsProps<T>) => {
  const getObjectWithId = (id: string) =>
    data.find((object) => object.id === id);
  return (
    <>
      {extraActionsOnSelected.map((action, index) => {
        const isDisabledButton = selectedId === "";
        const selectedObject = getObjectWithId(selectedId);
        const { newLabel, newStyleClass } =
          isDisabledButton || !selectedObject
            ? { newLabel: "", newStyleClass: "" }
            : action.buttonOnObjectSelect(selectedObject);
        return (
          <button
            key={index}
            disabled={isDisabledButton}
            type="button"
            className={`table-tool-button btn ${
              isDisabledButton ? "btn-outline-warning" : newStyleClass
            }`}
            onClick={() => {
              if (selectedId !== "") {
                const selectedObject = getObjectWithId(selectedId);
                selectedObject && action.onClick(selectedId, selectedObject);
              }
            }}
          >
            {isDisabledButton ? action.buttonLabel : newLabel}
          </button>
        );
      })}
    </>
  );
};

export default GenericActionsOnSelected;

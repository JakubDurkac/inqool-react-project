import { ActionOnSelected, Identifiable } from "../types";

interface ActionsProps<T extends Identifiable> {
  data: T[];
  extraActionsOnSelected: ActionOnSelected<T>[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GenericActionsOnSelected = <T extends Identifiable>({
  data,
  extraActionsOnSelected,
  selectedIndex,
  setSelectedIndex,
}: ActionsProps<T>) => {
  return (
    <>
      {extraActionsOnSelected.map((action, index) => {
        const isDisabledButton = selectedIndex === -1;
        const { newLabel, newStyleClass } = isDisabledButton
          ? { newLabel: "", newStyleClass: "" }
          : action.buttonOnObjectSelect(data[selectedIndex]);
        return (
          <button
            key={index}
            disabled={isDisabledButton}
            type="button"
            className={`btn ${
              isDisabledButton ? "btn-outline-light" : newStyleClass
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
    </>
  );
};

export default GenericActionsOnSelected;

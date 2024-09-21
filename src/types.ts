export type Endpoint = "users" | "animals";

export interface Identifiable {
  id: string;
}

export interface ActionOnSelected<T extends Identifiable> {
  buttonLabel: string;
  onClick: (id: string, selectedObject: T) => void;
  buttonOnObjectSelect: (selectedObject: T) => {
    newLabel: string;
    newStyleClass: string;
  };
}
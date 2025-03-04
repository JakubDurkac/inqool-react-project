import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { Identifiable } from "../types";
import { useState } from "react";

interface FormProps<T extends Identifiable> {
  fieldsWithoutId: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  onAdd: (object: Partial<T>) => void;
  onEdit: (object: Partial<T>, id: string) => void;
  selectedId: string;
}

const GenericAddEditForm = <T extends Identifiable>({
  fieldsWithoutId,
  validationSchema,
  onAdd,
  onEdit,
  selectedId,
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const [isActiveTooltip, setIsActiveTooltip] = useState(false);

  // watch form fields - add/edit buttons can be disabled based on the state of the forms
  const formValues = watch();
  const areAllFieldsEmpty = fieldsWithoutId.every((field) => {
    const value = formValues[field.key as string];
    return value === "" || value === undefined;
  });

  const isAnyFieldEmpty = fieldsWithoutId.some((field) => {
    const value = formValues[field.key as string];
    return value === "" || value === undefined;
  });

  // generate text inputs for each entity attribute except for id (assigned by API)
  // generate add button
  // generate edit button
  return (
    <div className="table-add-edit-form-container">
      <form>
        {fieldsWithoutId.map((field) => (
          <div className="input-container" key={field.key as string}>
            <input
              className="table-text-input"
              {...register(field.key as string)}
              placeholder={`Enter '${field.label}'`}
            />
            {errors[field.key as string] && isActiveTooltip && (
              <span className="validation-tooltip">
                {errors[field.key as string]?.message as string}
              </span>
            )}
          </div>
        ))}

        <div className="add-edit-buttons-container">
          <button
            disabled={isAnyFieldEmpty}
            className="btn btn-outline-warning table-tool-button"
            onClick={handleSubmit(
              (attributesToUpdate) => {
                console.log(attributesToUpdate);
                onAdd(attributesToUpdate as Partial<T>);
                reset();
                setIsActiveTooltip(false);
              },
              () => {
                setIsActiveTooltip(true);
              }
            )}
          >
            Add
          </button>
          <button
            disabled={selectedId === "" || areAllFieldsEmpty}
            className="btn btn-outline-warning table-tool-button"
            onClick={handleSubmit(
              (attributesToUpdate) => {
                const attributesToUpdatePartialT =
                  attributesToUpdate as Partial<T>;
                const filteredAttributes = fieldsWithoutId.reduce(
                  (acc, field) => {
                    // generating object that skips undefined attributes, preparing for PATCH request
                    const value = attributesToUpdatePartialT[field.key];
                    if (value !== undefined) {
                      acc[field.key] = value;
                    }
                    return acc;
                  },
                  {} as Partial<T>
                );

                onEdit(filteredAttributes, selectedId);
                reset();
                setIsActiveTooltip(false);
              },
              () => {
                setIsActiveTooltip(true);
              }
            )}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenericAddEditForm;

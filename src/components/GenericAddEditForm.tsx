import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { Identifiable } from "../types";
import { useState } from "react";

interface FormProps<T extends Identifiable> {
  data: T[];
  fieldsWithoutId: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  onAdd: (object: Partial<T>) => void;
  onEdit: (object: Partial<T>, id: string) => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GenericAddEditForm = <T extends Identifiable>({
  data,
  fieldsWithoutId,
  validationSchema,
  onAdd,
  onEdit,
  selectedIndex,
  setSelectedIndex,
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

  const formValues = watch();
  // check if all inputs are empty
  const areAllFieldsEmpty = fieldsWithoutId.every((field) => {
    const value = formValues[field.key as string];
    return value === "" || value === undefined;
  });

  // check if there are any empty fields
  const isAnyFieldEmpty = fieldsWithoutId.some((field) => {
    const value = formValues[field.key as string];
    return value === "" || value === undefined;
  });

  const [isActiveTooltip, setIsActiveTooltip] = useState(false);

  return (
    <form>
      {fieldsWithoutId.map((field) => (
        <div className="input-container" key={field.key as string}>
          <input {...register(field.key as string)} placeholder={field.label} />
          {errors[field.key as string] && isActiveTooltip && (
            <span className="validation-tooltip">
              {errors[field.key as string]?.message as string}
            </span>
          )}
        </div>
      ))}

      <button
        disabled={isAnyFieldEmpty}
        className="btn btn-outline-light"
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
        disabled={selectedIndex === -1 || areAllFieldsEmpty}
        className="btn btn-outline-light"
        onClick={handleSubmit(
          (attributesToUpdate) => {
            const attributesToUpdatePartialT = attributesToUpdate as Partial<T>;
            const filteredAttributes = fieldsWithoutId.reduce((acc, field) => {
              // generating object that skips undefined attributes, preparing for PATCH request
              const value = attributesToUpdatePartialT[field.key];
              if (value !== undefined) {
                acc[field.key] = value;
              }
              return acc;
            }, {} as Partial<T>);

            setSelectedIndex(-1);
            onEdit(filteredAttributes, data[selectedIndex].id);
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
    </form>
  );
};

export default GenericAddEditForm;

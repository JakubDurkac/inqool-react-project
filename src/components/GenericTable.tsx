import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionOnSelected, Identifiable } from "../types";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TableProps<T extends Identifiable> = {
  data: T[];
  fields: { label: string; key: keyof T }[];
  validationSchema: ZodSchema;
  onAdd: (object: Partial<T>) => void;
  onEdit: (object: Partial<T>, id: string) => void;
  onDelete: (id: string) => void;
  extraActionsOnSelected: ActionOnSelected<T>[];
};

const GenericTable = <T extends Identifiable>({
  data,
  fields,
  validationSchema,
  onAdd,
  onEdit,
  onDelete,
  extraActionsOnSelected,
}: TableProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const fieldsWithoutId = fields.filter((field) => field.key !== "id");

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

  return (
    <>
      <form>
        {fieldsWithoutId.map((field) => (
          <div key={field.key as string}>
            <input
              {...register(field.key as string)}
              placeholder={field.label}
            />
            {errors[field.key as string] && (
              <p>{errors[field.key as string]?.message as string}</p>
            )}
          </div>
        ))}

        <button
          disabled={isAnyFieldEmpty}
          className="btn btn-outline-light"
          onClick={handleSubmit((attributesToUpdate) => {
            console.log(attributesToUpdate);
            onAdd(attributesToUpdate as Partial<T>);
            reset();
          })}
        >
          Add
        </button>
        <button
          disabled={selectedIndex === -1 || areAllFieldsEmpty}
          className="btn btn-outline-light"
          onClick={handleSubmit((attributesToUpdate) => {
            const attributesToUpdatePartialT = attributesToUpdate as Partial<T>;
            const filteredAttributes = fields.reduce((acc, field) => {
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
          })}
        >
          Edit
        </button>
      </form>
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
        Remove Selected
      </button>
      <table className="table table-light table-striped table-hover border-dark">
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
            <tr
              className={
                index === selectedIndex ? "table-primary border-dark" : ""
              }
              key={index}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {fields.map((field) => (
                <td key={field.key as string}>{String(item[field.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GenericTable;

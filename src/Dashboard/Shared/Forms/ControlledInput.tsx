import GetInputClassNames from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/GetInputClassNames/GetInputClassNames";
import { useFormikContext } from "formik";
import React from "react";

interface ControlledInputProps<T> {
  fieldName: keyof T;
  label: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
  value?: string;
  containerClassName?: string;
}

const ControlledInput = <T extends Record<string, any>>(
  props: ControlledInputProps<T>
) => {
  const { fieldName, label, type = "text", placeholder, containerClassName, value, ...rest } = props;
  const formik = useFormikContext<T>();

  return (
    <div className={`form-one-step ${containerClassName}`}>
      <label className="label-text">{label}</label>
      <input
        type={type}
        name={fieldName as string}
        className={GetInputClassNames(formik, fieldName)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value ?? formik.values[fieldName]}
        placeholder={placeholder}
        {...rest}
      />
      {formik.touched.fieldName && formik.errors?.[fieldName] && (
        <div className="error-text">{String(formik?.errors[fieldName])}</div>
      )}
    </div>
  );
};

export default ControlledInput;

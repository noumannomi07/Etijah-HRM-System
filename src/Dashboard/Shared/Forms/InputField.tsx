import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";

const InputField = ({
  isShowLabel = true,
  label = "",
  success = false,
  disabled = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;
  const isSuccess = success && meta.touched && !meta.error;

  return (
    <div
      className={`flex flex-col gap-1 mt-[0.20rem] relative ${isError ? "error" : ""
        } ${props.className}`}
    >
      {isShowLabel && (
        <label htmlFor={props.id || props.name} className="label-text">
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        disabled={disabled}
        value={field.value || props.value || ""}
        onChange={(e) => {
          helpers.setValue(e.target.value);
        }}
        className={`input-field outline-none shadow-none ${meta.touched && meta.error
          ? "is-invalid"
          : isSuccess
            ? "active-border"
            : ""
          } 
         `}
        required
        onWheel={(e) => e.target.blur()}
      />

      {meta.touched && meta.error && (
        <div className="error-text">{meta.error}</div>
      )}
    </div>
  );
};
InputField.propTypes = {
  isShowLabel: PropTypes.bool,
  label: PropTypes.string,
  success: PropTypes.bool,
};

export default InputField;

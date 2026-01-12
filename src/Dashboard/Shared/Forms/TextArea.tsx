import { useField } from "formik";
import PropTypes from "prop-types";

const TextAreaInput = ({
    isShowLabel,
    label,
    success,
    parentClass,
    required = true,
    ...props
}) => {
    const [field, meta] = useField(props);
    const isError = meta.touched && meta.error;
    const isSuccess = success && meta.touched && !meta.error;

    // STYLES FOR TEXTAREA
    const textAreaStyles = {
        borderColor: isError ? "#dc3545" : isSuccess ? "green" : "",
        height: "160px",
    };

    return (
        <div
            className={`flex flex-col  gap-1 mt-1 relative ${
                isError ? "error" : ""
            } ${parentClass}`}
        >
            {isShowLabel && (
                <label
                    htmlFor={props.id || props.name}
                    className="text-font-gray text-[15px] mb-1"
                >
                    {label}
                </label>
            )}
            <textarea
                {...field}
                {...props}
                style={textAreaStyles}
                className={`input-field !h-[140px] outline-none shadow-none ${
                    meta.touched && meta.error
                        ? "is-invalid"
                        : isSuccess
                        ? "active-border"
                        : ""
                }`}
                required={required}
                onWheel={(e) => e.target.blur()}
            />

            {meta.touched && meta.error && (
                <div className="error-text">{meta.error}</div>
            )}
        </div>
    );
};

TextAreaInput.propTypes = {
    isShowLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    success: PropTypes.bool,
};

export default TextAreaInput;

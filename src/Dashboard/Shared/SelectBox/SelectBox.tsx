import Select, { SingleValue } from "react-select";
import "./SelectBox.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import React from "react";
import { TSelectOption } from "@/types/forms";

const SelectBox = ({
    isShowLabel,
    label,
    options,
    onChange,
    placeholder,
    isSearchable,
    isMulti,
    field,
    error,
    isClearable = true,
    ...props
}) => {
    const handleChange = (selectedOption: SingleValue<TSelectOption>) => {
        if (onChange) {
            onChange(selectedOption);
        }
        if (field && field.onChange) {
            field.onChange({
                target: {
                    name: field.name,
                    value: selectedOption || null,
                },
            });
        }
    };
    const customStyles = {
        clearIndicator: (provided) => ({
            ...provided,
            color: "#FF0000",
            ":hover": {
                color: "#CC0000",
            },
            cursor: "pointer",
        }),
    };

    const hasSuccess = field.value && !error;
    return (
        <div className="select-box-option">
            {isShowLabel && (
                <label className="text-font-gray text-[15px] mb-1">
                    {label}
                </label>
            )}
            <Select<TSelectOption>
                options={options}
                onChange={handleChange}
                placeholder={placeholder}
                isMulti={isMulti}
                className={classNames("main-select-box mt-1", {
                    active: error,
                    "active-border": hasSuccess,
                })}
                classNamePrefix="select"
                isSearchable={isSearchable}
                value={field.value}
                isClearable={isClearable}
                styles={customStyles}
                {...props}
            />
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

SelectBox.propTypes = {
    isShowLabel: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    isSearchable: PropTypes.bool,
    isMulti: PropTypes.bool,
    field: PropTypes.object.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default SelectBox;

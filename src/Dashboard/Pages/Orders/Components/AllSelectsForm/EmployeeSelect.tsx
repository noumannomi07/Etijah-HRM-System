import React, { useEffect } from "react";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";
import { memo } from "react";
import { useEmployeeSelect } from "@/hooks/employee/mini-for-select/useEmployeeForSelect";
import { useTranslation } from "react-i18next";

const EmployeeSelect = ({
    labelText,
    placeholder,
    setFieldValue,
    field,
    error,
    defaultEmployee,
    isDisabled,
    isMulti = false,
}: {
    labelText?: string;
    placeholder?: string;
    setFieldValue: (name: string, value: any) => void;
    field: any;
    error: string;
    defaultEmployee?: number;
    isDisabled?: boolean;
    isMulti?: boolean;
}) => {
    const { t } = useTranslation("orders");
    const { data: Employee, isLoading } = useEmployeeSelect();

    useEffect(() => {
        if (!isLoading && defaultEmployee && Employee?.length) {
            setFieldValue(
                field.name,
                Employee.find((employee: any) => employee.id == defaultEmployee)
            );
        }
    }, [defaultEmployee, isLoading]);

    return (
        <SelectBox
            isShowLabel={true}
            label={labelText || t("forms.selects.employee")}
            options={Employee}
            onChange={(option: any) => {
                setFieldValue(field.name, option.value);
            }}
            placeholder={placeholder || t("forms.selects.selectPlaceholder")}
            isSearchable={true}
            isMulti={isMulti}
            field={field}
            error={error}
            isClearable={true}
            isLoading={isLoading}
            isDisabled={isDisabled}
        />
    );
};

EmployeeSelect.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    error: PropTypes.string,
    labelText: PropTypes.string,
};

export default memo(EmployeeSelect);

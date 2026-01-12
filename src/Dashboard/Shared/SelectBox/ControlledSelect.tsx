import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import Select, { Props } from "react-select";
import { useFormikContext } from "formik";
import i18next from "i18next";
import classNames from "classnames";
import { TSelectOption } from "@/types/forms";
import { useTranslation } from "react-i18next";

type TStaticOptions = {
  type: "static";
  staticOptions: readonly TSelectOption[];
};

type TSyncOptions = {
  type: "sync";
  apiEndpoint: string;
  customMapping?: (data: any) => Array<TSelectOption>;
};

type ControlledSelectProps<T> = {
  fieldName: keyof T | string;
  label: string;
  value?: string | number;
} & Props &
  (TStaticOptions | TSyncOptions);

const ControlledSelect = <T extends Record<string, any>>(
  props: ControlledSelectProps<T>
) => {
  const { type, fieldName, label, value, ...rest } = props;
  const [options, setOptions] = useState<readonly TSelectOption[]>(
    type === "static" ? props.staticOptions : []
  );
  const [loading, setLoading] = useState(type !== "static");
  const formik = useFormikContext<T>();
  const lang = i18next.language;
    const { t } = useTranslation("orders");
  useEffect(() => {
    if (type === "static") {
      setOptions(props.staticOptions);
    }
  }, [props.staticOptions]);

  useEffect(() => {
    if (type === "sync") {
      axiosInstance
        .get(props.apiEndpoint, {
          headers: {
            "Accept-Language": lang,
          },
        })
        .then((res) => {
          const data =  Array.isArray(res.data?.data) ? res.data?.data : res.data;
          if (props.customMapping) {
            const selectedOptions = props.customMapping(data);
            setOptions(selectedOptions);
          } else {
            const formattedData = res.data.data.map(
              (item: { id: any; title: any; time_from?: any; time_to?: any }) => ({
                value: item.id,
                label: item.title + (item.time_from && item.time_to ? " - " + item.time_from + " - " + item.time_to : ""),
              })
            );
            setOptions(formattedData);
          }
        })
        .catch((error) => {
          console.error(
            `Error fetching data from ${props.apiEndpoint}:`,
            error
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.type, lang]);

  const currentValue = value !== undefined ? value : formik.values[fieldName as keyof T];

  return (
    <div>
      <label htmlFor={fieldName as string} className="label-text">
        {label}
      </label>
      <Select
        isLoading={type === "sync" && loading}
        value={
          rest.isMulti
            ? options.filter((opt) =>
              Array.isArray(currentValue) && currentValue.includes(String(opt.value))
            )
            : options.find((opt) => String(opt.value) === String(currentValue)) || null
        }
        options={options}
        onChange={(selectedOption: any) => {
          if (rest.isMulti && Array.isArray(selectedOption)) {
            formik.setFieldValue(
              fieldName as string,
              selectedOption.map((option) => option.value)
            );
          } else if (selectedOption) {
            formik.setFieldValue(fieldName as string, selectedOption.value);
          } else {
            formik.setFieldValue(fieldName as string, null);
          }
        }}
        className={classNames("main-select-box mt-1", {
          "error-border": formik.touched[fieldName as keyof T] && formik.errors[fieldName as keyof T],
          "active-border": formik.values[fieldName as keyof T],
        })}
        classNamePrefix="select"
        placeholder={t("forms.selects.selectPlaceholder")}
        isSearchable={true}
        isMulti={false}
        {...rest}
      />
      {formik.touched[fieldName as keyof T] && formik.errors[fieldName as keyof T] && (
        <div className="error-text">{String(formik.errors[fieldName as keyof T])}</div>
      )}
    </div>
  );
};

export default ControlledSelect;

import React from "react";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

interface SelectRequestProps {
  setFieldValue: (field: string, value: any) => void;
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
  error?: string | null;
}

const SelectRequest: React.FC<SelectRequestProps> = ({ setFieldValue, field, error }) => {
  const { t } = useTranslation("orders");

  const options = {
    selectRequest: [
      { value: 'request1', label: t("requests.type1") },
      { value: 'request2', label: t("requests.type2") },
      { value: 'request3', label: t("requests.type3") }
    ],
  };

  return (
    <SelectBox
      isShowLabel={true}
      label={t("labels.request")}
      options={options.selectRequest}
      onChange={(option) => setFieldValue("selectRequest", option)}
      placeholder={t("placeholders.select")}
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
};

SelectRequest.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default SelectRequest;

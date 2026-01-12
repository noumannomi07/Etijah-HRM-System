import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";

const SelectReasonTemplate = ({ setFieldValue, field, error }) => {
  const options = {
    selectReasonTemplate: [
      { value: "سبب1", label: "سبب 1" },
      { value: "سبب2", label: "سبب 2" }
    ]
  };

  return (
    <SelectBox
      isShowLabel={true}
      label="السبب"
      options={options.selectReasonTemplate}
      onChange={(option) => setFieldValue("reasonTemplate", option)}
      placeholder="-إختر-"
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
};

SelectReasonTemplate.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default SelectReasonTemplate;

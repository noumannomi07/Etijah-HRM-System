import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";

const SelectDestinationTemplate = ({ setFieldValue, field, error }) => {
  const options = {
    selectDestinationTemplate: [
      { value: "وجهة1", label: "وجهة 1" },
      { value: "وجهة2", label: "وجهة 2" },
    ],
  };

  return (
    <SelectBox
      isShowLabel={true}
      label="موجهه إلى"
      options={options.selectDestinationTemplate}
      onChange={(option) => setFieldValue("directed_to", option)}
      placeholder="-إختر-"
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
};

SelectDestinationTemplate.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default SelectDestinationTemplate;

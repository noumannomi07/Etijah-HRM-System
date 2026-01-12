import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";

const SelectNumberHours = ({ setFieldValue, field, error }) => {
  const options = {
    numTime: [
        { value: "1", label: "1" },
        { value: "2", label: "2" }
      ]
  };

  return (
    <SelectBox
      isShowLabel={true}
      label="عدد الساعات"
      options={options.numTime}
      onChange={(option) => setFieldValue("numTime", option)}
      placeholder="-إختر-"
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
};

SelectNumberHours.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default SelectNumberHours;

import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import PropTypes from "prop-types";

const SelectRepaymentPeriod = ({ setFieldValue, field, error }) => {
  const options = {
    
    repaymentPeriod: [
        { value: "1 أسبوع", label: "1 أسبوع" },
        { value: "2 أسابيع", label: "2 أسابيع" },
        { value: "1 شهر", label: "1 شهر" },
        { value: "2 أشهر", label: "2 أشهر" }
      ]
  };

  return (
    <SelectBox
      isShowLabel={true}
      label="فترة السداد"
      options={options.repaymentPeriod}
      onChange={(option) => setFieldValue("repaymentPeriod", option)}
      placeholder="-إختر-"
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
};

SelectRepaymentPeriod.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default SelectRepaymentPeriod;

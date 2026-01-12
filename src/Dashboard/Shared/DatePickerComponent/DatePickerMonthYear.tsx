import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale/ar";
import DonateIcon from "@assets/images/sidebaricons/donateicon.svg";
import PropTypes from "prop-types";
import React from "react";

registerLocale("ar", ar);

const DatePickerMonthYear = ({
  label,
  labelText,
  selectedDate,
  setFieldValue,
  fieldName = "date",
  formik,
  error,
  success,
  textError,
  ...props
}) => {
  const handleDateChange = (date) => {
    if (formik) {
      formik.setFieldValue(fieldName, date);
    } else {
      setFieldValue(date);
    }
  };

  return (
    <div
      className={`date-input-picker date-header-year relative ${error ? "error" : ""
        } ${success ? "success" : ""}`}
    >
      {label && (
        <label className="block mb-2 text-font-gray text-[15px]">
          {labelText}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={formik ? formik.values[fieldName] : selectedDate}
          onChange={handleDateChange}
          t
          dateFormat="MMMM/yyyy"
          excludeDates={[new Date("2024-05-01"), new Date("2024-06-01")]}
          showMonthYearPicker
          locale="ar"
          placeholderText="--/--"
          {...props}
        />
        <div className="icon-date-add absolute top-1/2 left-[25px] transform -translate-x-1/2 -translate-y-1/2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                margin: "0 5px",
                borderRadius: "5px",
                padding: "2px 4px",
              }}
            >
              مفتوح
            </span>
            <img src={DonateIcon} alt="donate" />
          </div>
        </div>
      </div>
      {textError && <p className="error-text">{textError}</p>}
    </div>
  );
};

export default DatePickerMonthYear;

DatePickerMonthYear.propTypes = {
  label: PropTypes.bool,
  labelText: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date),
  setFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
  formik: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  textError: PropTypes.string,
};

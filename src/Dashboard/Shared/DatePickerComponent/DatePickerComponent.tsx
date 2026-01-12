import DateIcon from "@assets/images/sidebaricons/dateicon.svg";
// import "./DatePickerComponent.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ar } from "date-fns/locale/ar";
import PropTypes from "prop-types";
import i18next from "i18next";
import React from "react";
import { addYears, startOfToday } from "date-fns";

registerLocale("ar", ar);

export interface DatePickerComponentProps {
  /** Label text shown above the date picker */
  label?: string;
  /** Callback fired when date changes */
  onDateChange?: (date: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Initial date value */
  initialDate?: Date | null;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Custom className for the container */
  className?: string;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Whether to show clear button */
  isClearable?: boolean;
  /** Date format string */
  dateFormat?: string;
  /** Error message to display */
  error?: string;
  /** selected date to display */
  value?: string;
  /** Whether to show default date */
  isDefault?: boolean;
}

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const { label, onDateChange, placeholder, value, ...reset } = props;
  const initialDate = value ? new Date(value) : new Date();
  const [startDate, setStartDate] = useState<Date | undefined>(
    !reset.isDefault ? initialDate : undefined
  );

  
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setStartDate(date);
      if (onDateChange) {
        onDateChange(formattedDate);
      }
    }
    setIsOpen(false);
  };

  const handleDateClick = () => {
    setIsOpen(!isOpen);
  };

  const closeDatePicker = () => {
    setIsOpen(false);
  };

  const today = startOfToday();
  const maxYear = addYears(today, 10);

  return (
    <>
      <div className="main-date-picker-content">
        {label && (
          <label className="block mb-2 text-font-gray text-[15px]">
            {label}
          </label>
        )}
         <div className="date-input-picker relative">

    <DatePicker
  selected={startDate}
  disabled={reset.disabled}
  className={
    reset.disabled ? "opacity-50 bg-gray-200 cursor-not-allowed w-full" : "w-full z-100"
  }
  onChange={(date) => {
    if (date) {
      setStartDate(date);
      handleDateChange(date);
    }
    closeDatePicker();
  }}
  locale={i18next.language}
  placeholderText={placeholder}
  onClickOutside={closeDatePicker}
  onInputClick={handleDateClick}
  open={isOpen}
  showYearDropdown
  scrollableYearDropdown
  yearDropdownItemNumber={100}
  dropdownMode="select"
  wrapperClassName="w-full"
  calendarClassName=""
  popperClassName="w-full"
  {...reset}
/>


        {/* <div className="date-input-picker relative">
          <DatePicker
            selected={startDate}
            disabled={reset.disabled}
            className={
              reset.disabled ? "opacity-50 bg-gray-200 cursor-not-allowed" : ""
            }
            onChange={(date) => {
              if (date) {
                setStartDate(date);
                handleDateChange(date);
              }
              closeDatePicker();
            }}
            locale={i18next.language}
            placeholderText={placeholder}
            onClickOutside={closeDatePicker}
            onInputClick={handleDateClick}
            open={isOpen}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            // minDate={today}
            // maxDate={maxYear}
            {...reset}
          />
           */}
          <div className="icon-date-add absolute top-1/2 left-[25px] transform -translate-x-1/2 -translate-y-1/2">
            <img src={DateIcon} alt="calendar" />
          </div>
     </div>
      </div>

      {reset.error && <p className="text-red-500 text-sm">{reset.error}</p>}
    </>
  );
};

DatePickerComponent.propTypes = {
  label: PropTypes.string,
  addTextPlaceHolder: PropTypes.string,
  onDateChange: PropTypes.func
};

export default DatePickerComponent;

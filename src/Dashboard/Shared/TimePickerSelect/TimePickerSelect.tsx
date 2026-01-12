import { useState } from "react";
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import "react-time-picker/dist/TimePicker.css";
import "./TimePickerSelect.css";
import PropTypes from "prop-types";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ar';

const TimePickerSelect = ({ 
  textLable, 
  onTimeChange, 
  valueInit,
  locale = 'ar'
}: { 
  textLable: string; 
  onTimeChange: (time: string) => void; 
  valueInit?: string;
  locale?: string;
}) => {
  const [value, onChange] = useState<Dayjs>(dayjs(valueInit));

  const handleChange: TimePickerProps['onChange'] = (time) => {
    if (time) {
      onChange(time);
      onTimeChange(time.format("HH:mm"));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <div className="time-piker-input flex flex-col">
        <label htmlFor="time" className="text-font-gray text-[15px] mb-1">
          {textLable}
        </label>
        <TimePicker
          ampm={true}
          label="With Time Clock"
          onChange={handleChange}
          value={value}
          slotProps={{
            popper: {
              sx: {
                zIndex: 9999
              }
            }
          }}
          views={['hours', 'minutes']}
        />
      </div>
    </LocalizationProvider>
  );
};

TimePickerSelect.propTypes = {
  textLable: PropTypes.string.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  valueInit: PropTypes.string,
  locale: PropTypes.string,
};

export default TimePickerSelect;

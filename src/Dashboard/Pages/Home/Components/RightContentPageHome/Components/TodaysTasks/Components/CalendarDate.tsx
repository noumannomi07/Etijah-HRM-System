import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import useCustomDate from "@/Dashboard/Shared/DatePickerComponent/useCustomDate";
import myCustomLocale from "@/Dashboard/Shared/DatePickerComponent/myCustomLocale";
import React from "react";
import { useTranslation } from "react-i18next";
interface CalendarDateProps {
  onDateChange?: (date: DayValue) => void;

}

const CalendarDate = ({ onDateChange }: CalendarDateProps) => {
  const { selectedDay, setSelectedDay } = useCustomDate();
  const { i18n } = useTranslation('home');
  const lang = i18n.language;

  const handleChangeDate = (date: DayValue) => {
    setSelectedDay(date);
    onDateChange?.(date);
  }

  return (
    <div className="main-calendar">
      <Calendar
        value={selectedDay}
        onChange={handleChangeDate}
        shouldHighlightWeekends
        calendarClassName="w-full shadow-none"
        locale={myCustomLocale(lang)}
      />
    </div>
  );
};

export default CalendarDate;

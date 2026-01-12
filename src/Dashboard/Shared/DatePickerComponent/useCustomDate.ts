import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import { useState } from "react";

const useCustomDate = () => {
  const today = new Date();
  const defaultValue: DayValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  };

  const [selectedDay, setSelectedDay] = useState<DayValue>(defaultValue);
  const [selectedDay2, setSelectedDay2] = useState<DayValue>();

  return {
    selectedDay,
    setSelectedDay,
    selectedDay2,
    setSelectedDay2,
    defaultValue
  };
};

export default useCustomDate;

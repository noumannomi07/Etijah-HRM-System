import { VacationDayNameMapper } from "../constants";
import { EVacationDay } from "../Pages/types"

interface WorkingDaysResult {
  firstWorkingDay?: EVacationDay;
  lastWorkingDay?: EVacationDay;
}

function getWorkingDaysFromVacationDays(vacationDays: Array<EVacationDay>): WorkingDaysResult {
  const allDays = [
    EVacationDay.Sunday,
    EVacationDay.Monday,
    EVacationDay.Tuesday,
    EVacationDay.Wednesday,
    EVacationDay.Thursday,
    EVacationDay.Friday,
    EVacationDay.Saturday
  ];

  const workingDays = allDays.filter(day => !vacationDays.includes(day));

  if (workingDays.length === 0) {
    return {
      firstWorkingDay: undefined,
      lastWorkingDay: undefined
    }
  }

  // Find the first working day by looking for the earliest day that's not a vacation day
  const firstWorkingDay = workingDays.reduce((earliest, current) => {
    const earliestNum = parseInt(earliest);
    const currentNum = parseInt(current);
    return currentNum < earliestNum ? current : earliest;
  });

  // Find the last working day by looking for the latest day that's not a vacation day
  const lastWorkingDay = workingDays.reduce((latest, current) => {
    const latestNum = parseInt(latest);
    const currentNum = parseInt(current);
    return currentNum > latestNum ? current : latest;
  });

  return {
    firstWorkingDay,
    lastWorkingDay
  };
}

function getDayNameFromVacationDay(day?: EVacationDay): string {
  if (day) {
    return VacationDayNameMapper[day];
  }
  return '-';
}

export {
  getWorkingDaysFromVacationDays,
  getDayNameFromVacationDay
};
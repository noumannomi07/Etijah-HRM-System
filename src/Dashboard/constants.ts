import { EVacationDay } from "./Pages/types";

export const VacationDayNameMapper: Record<EVacationDay, string> = {
    [EVacationDay.Sunday]: "sunday",
    [EVacationDay.Monday]: "monday",
    [EVacationDay.Tuesday]: "tuesday",
    [EVacationDay.Wednesday]: "wednesday",
    [EVacationDay.Thursday]: "thursday",
    [EVacationDay.Friday]: "friday",
    [EVacationDay.Saturday]: "saturday",
};

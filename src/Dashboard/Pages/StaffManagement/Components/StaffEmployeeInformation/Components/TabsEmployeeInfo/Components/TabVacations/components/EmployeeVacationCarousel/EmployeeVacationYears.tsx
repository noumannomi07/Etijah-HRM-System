import { Employee } from "@/Dashboard/Pages/types";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";

export default function EmployeeVacationYears(
    { employee, selectedYear, setSelectedYear }:
     { 
        employee: Employee, selectedYear: string, setSelectedYear: (year: string) => void }
    ) {

    const hireDate = employee?.workdata?.hire_date;
 
    let hireDateYear: number | undefined = undefined;
    
    if (hireDate) {
        if (hireDate.includes('/')) {
            hireDateYear = parseInt(hireDate.split('/')[2], 10);
        } else if (hireDate.includes('-')) {
            hireDateYear = parseInt(hireDate.split('-')[0], 10);
        }
    }
 
    const nextYear =  new Date().getFullYear() + 1;

    const years: string[] = useMemo(() => {
        if (!hireDateYear) return [];
        const yearsDiff = nextYear - hireDateYear;
        return Array.from({ length: yearsDiff }, (_, i) => `${nextYear - i}-${nextYear - i + 1}`);
    }, [hireDateYear, nextYear]);

 
    const currentIndex = years.findIndex(y => y === selectedYear);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;

    const handlePrev = () => {
        if (years.length === 0) return;
        const prevIndex = safeIndex === 0 ? years.length - 1 : safeIndex - 1;
        setSelectedYear(years[prevIndex]);
    };

    const handleNext = () => {
        if (years.length === 0) return;
        const nextIndex = safeIndex === years.length - 1 ? 0 : safeIndex + 1;
        setSelectedYear(years[nextIndex]);
    };
    
    React.useEffect(() => {
        // If selectedYear is not set, set it to the first year
        if (!selectedYear && years.length > 0) {
            setSelectedYear(years[0]);
        }
    }, [years, selectedYear, setSelectedYear]);

    return (
        <div className="leave-balance-year">
            <button className="year-nav-btn ltr:rotate-[180deg]" onClick={handlePrev} aria-label="Previous year"><FontAwesomeIcon icon={faChevronRight}/></button>
            <span>{years[safeIndex]}</span>
            <button className="year-nav-btn ltr:rotate-[180deg]" onClick={handleNext} aria-label="Next year"><FontAwesomeIcon icon={faChevronLeft}/></button>
        </div>
    );
}

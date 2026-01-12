import React from "react";
import { useTranslation } from "react-i18next";

interface AttendanceFilterProps {
    activeFilters: string[];
    onFilterChange: (filters: string[]) => void;
    filterTypes?: string[];
}

const AttendanceFilter: React.FC<AttendanceFilterProps> = ({
    activeFilters,
    onFilterChange,
    filterTypes = ["All", "Early", "Late", "Absent", "Overtime"]
}) => {
    const { t } = useTranslation("attendance");

    const toggleFilter = (type: string) => {
        if (type === "All") {
            if (!activeFilters.includes("All")) {
                onFilterChange(filterTypes);
            } else {
                onFilterChange([]);
            }
        } else {
            const newFilters = activeFilters.includes(type)
                ? activeFilters.filter((t) => t !== type)
                : [...activeFilters, type];
            
            if (filterTypes.filter(t => t !== "All").every(t => newFilters.includes(t))) {
                onFilterChange(filterTypes);
            } else {
                onFilterChange(newFilters.filter(t => t !== "All"));
            }
        }
    };

    const getFilterButtonClass = (type: string) => {
        const baseClass =
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer";
        const isActive = activeFilters.includes(type);

        switch (type) {
            case "All":
                return `${baseClass} ${
                    isActive
                        ? "bg-green-700 text-white"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                }`;
            case "Early":
                return `${baseClass} ${
                    isActive
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                }`;
            case "Late":
                return `${baseClass} ${
                    isActive
                        ? "bg-gray-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`;
            case "Absent":
                return `${baseClass} ${
                    isActive
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                }`;
            case "Overtime":
                return `${baseClass} ${
                    isActive
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`;
            default:
                return baseClass;
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {filterTypes.map((type) => (
                <div
                    key={`filter-${type}`}
                    className={getFilterButtonClass(type)}
                    onClick={() => toggleFilter(type)}
                >
                    {t(`type_${type.toLowerCase()}`)}
                    {activeFilters.includes(type) && (
                        <span className="mr-1">✓</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AttendanceFilter; 
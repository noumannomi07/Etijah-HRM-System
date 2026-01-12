import React, { useState } from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { AttendanceEdit } from "@/Dashboard/Pages/types";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useUpdateAttendanceStatus } from "@/hooks/attendance/useUpdateAttendanceStatus";
import AttendanceFilter from "./AttendanceFilter";

interface AcceptedEditsProps {
    data: AttendanceEdit[];
    isPending: boolean;
}

const AcceptedEdits = ({ data, isPending }: AcceptedEditsProps) => {
    const { t } = useTranslation("attendance");
    const [, setSearchParams] = useSearchParams();
    const [activeFilters, setActiveFilters] = useState<string[]>([]);


    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case "All":
                return "bg-green-100 text-green-500";
            case "Early":
                return "bg-green-100 text-green-800";
            case "Absent":
                return "bg-red-100 text-red-800";
            case "Late":
                return "bg-gray-100 text-gray-800";
            case "Overtime":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    const onChangeDateFilter = (date: Date | string) => {
        setSearchParams((prev) => {
            prev.set("date", date.toString());
            return prev;
        });
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            prev.set("search", e.target.value);
            return prev;
        });
    };

    const filterTypes = ["All", "Early", "Late", "Absent", "Overtime"];

    const filteredData = activeFilters.includes("All")
        ? data
        : activeFilters.length === 0
        ? data
        : data.filter((item) => activeFilters.includes(item.type));

    const theadTrContent = [
        "الموظف",
        "التاريخ",
        "النوع",
        "الوحدة",
        "المبلغ",
        // "الإجراءات"
    ];

    const tbodyContent = filteredData.map((item) => [
        <div key={`employee-${item.id}`} className="flex items-center gap-2">
            <img
                src={item.employee.image}
                alt="img user"
                loading="lazy"
                height={48}
                width={32}
            />
            <div className="flex flex-col items-start gap-2">
                <div className="text-overflow-ellipsis max-w-32">
                    {item.employee.name}
                </div>
                <div>{item.employee.jobtitle?.title}</div>
            </div>
        </div>,
        <React.Fragment key={`date-${item.id}`}>{item.date}</React.Fragment>,
        <div
            key={`type-${item.id}`}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getTypeBadgeStyle(
                item.type
            )}`}
        >
            {t(`type_${item.type.toLowerCase()}`)}
        </div>,
        <React.Fragment key={`time-${item.id}`}>
            {item.time === "Day" ? t("one_day") : item.time}
        </React.Fragment>,
        <div
            key={`fine-${item.id}`}
            className={
                item.fine === 0
                    ? ""
                    : item.fine_type === "plus"
                    ? "text-green-600"
                    : "text-red-600"
            }
        >
            {item.fine === 0 ? "" : item.fine_type === "plus" ? "+" : "-"}
            {item.fine}
        </div>,
        // <div key={`actions-${item.id}`} className="flex items-center">
        //   <button
        //     onClick={() => handleReject(item.id)}
        //     className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
        //     title={t("reject")}
        //   >
        //     <div className="flex items-center gap-2">
        //       {t("reject")}
        //       <FontAwesomeIcon icon={faTimes} />
        //     </div>
        //   </button>
        // </div>
    ]);

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    التعديلات المقبولة
                </h2>
                <AttendanceFilter
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                    filterTypes={filterTypes}
                />
            </div>
            <DataTableTwo
                isLoading={isPending}
                theadContent={theadTrContent}
                tbodyContent={tbodyContent}
                withCheckboxes={false}
                isShowContentFilterInfo={true}
                isShowModalButtonFilter={false}
                functionButtonFilter={() => {}}
                isTrueButtonsModalContentRight={false}
                functionButtonModalOne={() => {}}
                textContentButtonOne=""
                isTrueButtonTwoModalContent={false}
                functionModalButtonTwo={() => {}}
                textContetButtonTwo=""
                newClassButtonTwo=""
                showDateFilter={true}
                onChangeDateFilter={onChangeDateFilter}
                onSearchChange={onSearchChange}
            />
        </>
    );
};

export default AcceptedEdits;

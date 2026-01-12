import React, { useEffect, useState } from "react";
import DonateIcon from "@assets/images/sidebaricons/donateicon.svg";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { components } from "react-select";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { usePayrollMonths } from "@/hooks/api";

interface MonthData {
    month: string;
    year: string;
    start_of_month: string;
    end_of_month: string;
    closed: boolean;
    label: string;
    value: string;
}

const DateHeaderSalaryMarches = ({ refetch = false }: { refetch: boolean }) => {
    const { t } = useTranslation("common");
    const location = useLocation();
    const navigate = useNavigate();

    const { queryAll } = usePayrollMonths();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);

    // Wait for data to load and handle initial selection
    useEffect(() => {
        console.log("refetch", refetch);
        if (queryAll.isLoading) {
            setIsLoading(true);
            return;
        }

        if (queryAll.data && Array.isArray(queryAll.data)) {
            setIsLoading(false);

            // Get the month from URL params
            const searchParams = new URLSearchParams(location.search);
            const startOfMonthFromUrl = searchParams.get("start_of_month");

            // Find the month that matches the URL param or use the first month
            const monthToSelect =
                queryAll.data.find(
                    (month: MonthData) => month.closed === false
                ) ||
                queryAll.data.find(
                    (month: MonthData) =>
                        month.start_of_month === startOfMonthFromUrl
                ) ||
                queryAll.data[queryAll.data.length - 1];
            // Always set the selected month on initial load or when data changes
            if (monthToSelect) {
                setSelectedMonth({
                    ...monthToSelect,
                    label: monthToSelect.month,
                    value: monthToSelect.start_of_month,
                });

                // Update URL if needed (only if there's no start_of_month in URL)
                searchParams.set(
                    "start_of_month",
                    monthToSelect.start_of_month
                );
                navigate(`${location.pathname}?${searchParams.toString()}`, {
                    replace: true,
                });
            }
        }
    }, [queryAll.data]); // Only depend on queryAll.data to set initial value

    useEffect(() => {
        queryAll.refetch();
    }, [refetch]);

    const months = React.useMemo(() => {
        if (!queryAll.data || !Array.isArray(queryAll.data)) return [];
        return queryAll.data.map((month: MonthData) => ({
            ...month,
            label: month.month,
            value: month.start_of_month, // Use start_of_month as value for better matching
        }));
    }, [queryAll.data]);

    const handleMonthChange = (selectedOption: MonthData | null) => {
        if (!selectedOption) return;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("start_of_month", selectedOption.start_of_month);
        navigate(`${location.pathname}?${searchParams.toString()}`);
        setSelectedMonth(selectedOption);
    };

    const CustomOption = (props: any) => {
        const data = props.data as MonthData;
        return (
            <components.Option {...props}>
                <button className="flex items-center justify-between gap-2 px-2 py-1 w-full text-right">
                    <div className="flex items-center gap-1 text-sm flex-col">
                        <p className="text-font-dark">
                            {data?.month} - {data?.year}
                        </p>
                        <p className="text-font-gray">
                            {data?.start_of_month} - {data?.end_of_month}
                        </p>
                    </div>
                    <DateIcon closed={data?.closed ?? false} />
                </button>
            </components.Option>
        );
    };

    return (
        <div className={`date-input-picker date-header-year relative`}>
            <label className="block mb-2 text-font-gray text-[15px]">
                {t("month_key")}
            </label>

            <div className="relative w-fit">
                <div className="w-[300px] md:w-[350px]">
                    <SelectBox
                        placeholder={t('date.selectMonth', { ns: 'salaryMarches' })}
                        options={months}
                        getOptionLabel={(option: any) => (
                            <>
                                <button className="flex items-center justify-between gap-2 px-2 py-1 w-full text-right">
                                    <div className="flex items-center gap-1 text-sm flex-col px-0">
                                        <p className="text-font-dark">
                                            {option?.month} - {option?.year}
                                        </p>
                                        <p className="text-font-gray">
                                            {option?.start_of_month} -{" "}
                                            {option?.end_of_month}
                                        </p>
                                    </div>
                                    <DateIcon
                                        closed={option?.closed ?? false}
                                    />
                                </button>
                            </>
                        )}
                        onChange={handleMonthChange}
                        isShowLabel={false}
                        label=""
                        field="month"
                        error=""
                        isSearchable={false}
                        isMulti={false}
                        isClearable={false}
                        isLoading={isLoading || queryAll.isLoading}
                        components={{ Option: CustomOption }}
                        value={selectedMonth}
                    />
                </div>
                {/* <div className="absolute top-1/2 left-[40px] transform -translate-y-1/2">
                    <DateIcon closed={selectedMonth?.closed} />
                </div> */}
            </div>
        </div>
    );
};

export default DateHeaderSalaryMarches;

const DateIcon = ({ closed = false }: { closed?: boolean }) => {
    const { t } = useTranslation('salaryMarches');
    return (
        <div className="flex items-center gap-2">
            <span
                className={`${
                    !closed ? "bg-[#4CAF50]" : "bg-[#FF0000]"
                } text-white px-2 py-0.5 rounded`}
            >
                {closed ? t('date.closed') : t('date.open')}
            </span>
            <img src={DonateIcon} alt="donate" className="w-5 h-5" />
        </div>
    );
};

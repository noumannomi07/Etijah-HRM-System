import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import CardsHeader from "./Components/CardsHeader/CardsHeader";
import ChartAttendancePerformanceInfo from "./Components/ChartAttendancePerformanceInfo/ChartAttendancePerformanceInfo";
import RightContentPageHome from "./Components/RightContentPageHome/RightContentPageHome";
import TableAttendanceSummary from "./Components/TableAttendanceSummary/TableAttendanceSummary";
import React from "react";
import { useHomeData } from "@/hooks/home/useHomeData";
import { useTranslation } from "react-i18next";
import { withPermissions } from "@/hoc";

const HomeDashboard = () => {
    const { data: homeData, isError } = useHomeData();
    const { t } = useTranslation("home");

    if (isError) return <div>{t("pageTitles.error")}</div>;

    return (
        <>
            <HelmetInfo titlePage={t("pageTitles.home")} />
            <div className="home-page-content  flex-1">
                <div className="all-content-home-page grid grid-cols-4 xl:grid-cols-6 gap-4">
                    <div className="col-span-4 md:col-span-4">
                        <CardsHeader
                            all_employees={homeData?.all_employees}
                            all_violations={homeData?.all_violations}
                            all_tasks={homeData?.all_tasks}
                            all_vacations={homeData?.all_vacations}
                        />
                        <ChartAttendancePerformanceInfo
                            month_attendance={homeData?.month_attendance}
                        />
                        <TableAttendanceSummary
                            today_attendance={homeData?.today_attendance}
                        />
                    </div>

                    <div className="right-content-page-home col-span-4 xl:col-span-2">
                        <RightContentPageHome
                            latest_blogs={homeData?.latest_blogs ?? []}
                            today_tasks={homeData?.today_tasks ?? []}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default withPermissions(HomeDashboard, "homepage_statistics");

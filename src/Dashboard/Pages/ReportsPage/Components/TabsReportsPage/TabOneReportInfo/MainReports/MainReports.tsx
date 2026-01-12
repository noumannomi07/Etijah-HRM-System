import React from "react";
import { useTranslation } from "react-i18next";
import DistributionPieChart from "./DistributionPieChart";
import ChartPieReport from "./ChartPieReport";
import { ReportsResponse } from "@/types/Reports";
import BirthdaysCard from "./BirthdaysCard";
import ChartAttendancePerformanceInfo from "./ChartAttendancePerformanceInfo/ChartAttendancePerformanceInfo";
import ChartRadialReport from "./ChartRadialReport";
import ChartRequestRate from "./ChartRequestRate";

type MainReportsProps = {
  data: ReportsResponse;
};

const MainReports: React.FC<MainReportsProps> = ({ data }) => {
  const { t } = useTranslation("staffManagement");

  const _currentMonthAttendance = data?.currentMonthAttendance
    ? Object.entries(data.currentMonthAttendance)
        .filter(([key]) => key !== "month" && key !== "total")
        .map(([key, value]) => ({
          title: t(`reports.tasks.status.${key}`),
          count: value as number
        }))
    : [];
  const _currentMonthTaskStatusCount = data?.currentMonthTaskStatusCount
    ? Object.entries(data.currentMonthTaskStatusCount).map(([key, value]) => ({
        title: t(`reports.tasks.status.${key}`),
        count: value as number
      }))
    : [];

  const _topViolations =
    data?.topViolations?.map((item) => ({
      title: item.title,
      count: item.count
    })) || [];

  return (
    <div className="all-main-reports">
      <div className="main-one grid md:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ChartAttendancePerformanceInfo data={data?.getMonthAttendance ?? {}} />
        <ChartRadialReport
          title={t("reports.attendanceRate")}
          data={_currentMonthAttendance}
        />
      </div>
      <div className="main-one grid md:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/** <ChartPieReport
          title={t("reports.topViolations.title")}
          data={_topViolations}
          colors={["#4C6CB2", "#FC9C0F", "#3B82F6", "#10B981", "#6366F1"]}
        /><ChartPieReport
          title={t("reports.tasks.statusDistribution")}
          data={_currentMonthTaskStatusCount}
          colors={["#32A840", "#FC9C0F", "#FE4D4F", "#4C6CB2", "#10B981"]}
        /> */}

        <DistributionPieChart
          title={t("reports.topViolations.title")}
          data={_topViolations}
          colors={["#4C6CB2", "#FC9C0F", "#3B82F6", "#10B981", "#6366F1"]}
        />
        <DistributionPieChart
          title={t("reports.tasks.statusDistribution")}
          data={_currentMonthTaskStatusCount}
          colors={["#32A840", "#FC9C0F", "#FE4D4F", "#4C6CB2", "#10B981"]}
        />
      </div>

      <div className="main-one grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        <DistributionPieChart
          title={t("reports.nationalities.title")}
          data={
            data?.nationalities?.map((item) => ({
              title: item.title,
              count: item.count
            })) || []
          }
        />
        <DistributionPieChart
          title={t("reports.genders.title")}
          data={
            data?.genders?.map((item) => ({
              title: item.title,
              count: item.count
            })) || []
          }
        />
        <DistributionPieChart
          title={t("reports.categories.title")}
          data={
            data?.categories?.map((item) => ({
              title: item.title,
              count: item.count
            })) || []
          }
        />
      </div>
      <div className="main-one grid md:grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2">
          <ChartRequestRate data={data?.requestChart ?? {}} />
        </div>
        <BirthdaysCard data={data?.getEmployeesBirthdays ?? []} />
      </div>
    </div>
  );
};

export default MainReports;

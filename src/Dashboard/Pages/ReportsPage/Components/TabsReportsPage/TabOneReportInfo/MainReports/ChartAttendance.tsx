import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { ApexOptions } from "apexcharts";
import { CurrentMonthAttendance } from "@/types/Reports";

interface ChartAttendanceProps {
  data: CurrentMonthAttendance;
}

const ChartAttendance: React.FC<ChartAttendanceProps> = ({ data }) => {
  const { t } = useTranslation('staffManagement');

  const chartOptions: ApexOptions = {
    chart: {
      type: "line" as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        t("reports.attendance.total"),
        t("reports.attendance.late"),
        t("reports.attendance.early"),
        t("reports.attendance.overtime"),
        t("reports.attendance.absent")
      ]
    },
    yaxis: {
      title: {
        text: t("reports.attendance.count")
      }
    },
    fill: {
      opacity: 1,
      colors: ["#2F65CC", "#FAAD14", "#32A840", "#FE4D4F", "#722ED1"]
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toString();
        }
      }
    },
    grid: {
      show: false
    }
  };

  const chartSeries = [
    {
      name: t("reports.attendance.count"),
      data: [
        data?.total,
        data?.late,
        data?.early,
        data?.overtime,
        data?.absent
      ]
    }
  ];

  return (
    <div className="chart-info chart-employee border border-lightColorWhite2 rounded-[8px] mt-3 py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mb-4">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {t("reports.attendance.title")}
        </h2>
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ChartAttendance; 
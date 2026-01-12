import React from "react";
import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";

type ChartAttendanceRateProps = {
  data: {
    title: string;
    count: number;
  }[];
};

const getPercentage = (value: number, total: number) => total > 0 ? (value / total) * 100 : 0;

const ChartAttendanceRate = ({ data }: ChartAttendanceRateProps) => {
  const statusValues = {
    present: data.find(item => item.title === "Completed")?.count || 0,
    absent: data.find(item => item.title === "Cancelled")?.count || 0,
    late: data.find(item => item.title === "Late")?.count || 0
  };

  const total = Object.values(statusValues).reduce((sum, count) => sum + count, 0);

  const series = [
    getPercentage(statusValues.present, total),
    getPercentage(statusValues.absent, total),
    getPercentage(statusValues.late, total)
  ];

  const options: ApexOptions = {
    chart: {
      type: "radialBar" as const,
    },
    colors: ["#32A840", "#FC9C0F", "#FE4D4F"],
    labels: ["حضور", "غياب", "تأخير"],
    legend: {
      show: true,
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      labels: {
        useSeriesColors: true
      },
      markers: {
        size: 10,
        shape: 'square' as const
      },
      formatter: function (seriesName: string, opts: { seriesIndex: number }) {
        const values = [statusValues.present, statusValues.absent, statusValues.late];
        return `${seriesName} (${values[opts.seriesIndex]})`;
      }
    }
  };

  return (
    <div className="chart-info chart-attendance border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mb-4">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          معدل الحضور
        </h2>
      </div>
      <ApexCharts options={options} series={series} height={300} />

      <div className="flex gap-6 justify-center mt-4">
        <div className="summary-item flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#32A840]" />
            <span className="text-[14px] text-gray-600">حضور</span>
          </div>
          <span className="text-[18px] font-semibold text-darkColor mt-1">
            {statusValues.present}
          </span>
        </div>
        <div className="summary-item flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FC9C0F]" />
            <span className="text-[14px] text-gray-600">غياب</span>
          </div>
          <span className="text-[18px] font-semibold text-darkColor mt-1">
            {statusValues.absent}
          </span>
        </div>
        <div className="summary-item flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FE4D4F]" />
            <span className="text-[14px] text-gray-600">تأخير</span>
          </div>
          <span className="text-[18px] font-semibold text-darkColor mt-1">
            {statusValues.late}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartAttendanceRate;

import ApexCharts from "react-apexcharts";
import { Select } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";

type ChartLineReportProps = {
  title: string;
  data: { title: string; count: number }[];
  colors?: string[];
};

const ChartLineReport = ({ title, data, colors = ["#32A840", "#FC9C0F", "#FE4D4F", "#3B82F6", "#10B981"] }: ChartLineReportProps) => {
  const { t } = useTranslation('staffManagement');

  const chartOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: data.map(item => item.title)
    },
    yaxis: {
      labels: {
        show: true
      }
    },
    grid: {
      show: false
    },
    stroke: {
      curve: "smooth" as const,
      width: 3
    },
    markers: {
      size: 4
    },
    colors: colors,
    legend: {
      position: "top" as const,
      horizontalAlign: "center" as const
    }
  };

  const chartSeries = [
    {
      name: title,
      data: data.map(item => item.count)
    }
  ];

  return (
    <div className="chart-line-content chart-info border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {title}
        </h2>
      </div>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartLineReport; 
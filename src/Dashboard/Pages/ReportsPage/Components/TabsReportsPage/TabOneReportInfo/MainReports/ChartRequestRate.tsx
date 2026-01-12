import React, { useState } from "react";
import Chart from "react-apexcharts";
import { RequestChart } from "@/types/Reports";
import { useTranslation } from "react-i18next";
import { monthKeys } from "@/utils/financial";
import { ApexOptions } from "apexcharts";

interface ChartRequestRateProps {
  data: RequestChart;
}

const ChartRequestRate: React.FC<ChartRequestRateProps> = ({ data }) => {
  const { t } = useTranslation('staffManagement');
  const [activeIndex, setActiveIndex] = useState(0);

  const requestTypes = [
    {
      label: t("vacations.title"),
      key: "vacation" as keyof RequestChart
    },
    {
      label: t("leave"),
      key: "leave" as keyof RequestChart
    },
    {
      label: t("advance"),
      key: "advance" as keyof RequestChart
    },
    {
      label: t("letter"),
      key: "letter" as keyof RequestChart
    },
    {
      label: t("expenses"),
      key: "expenses" as keyof RequestChart
    },
    {
      label: t("ticket"),
      key: "ticket" as keyof RequestChart
    }
  ];

  const getChartData = (requestType: keyof RequestChart) => {
    const monthlyData = data[requestType];
    return Object.values(monthlyData);
  };

  const [chartData, setChartData] = useState({
    series: [{
      name: requestTypes[0].label,
      data: getChartData(requestTypes[0].key)
    }],
    options: {
      chart: {
        height: 350,
        type: "line" as const,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth" as const,
        width: 4,
        colors: ["#38CB89"]
      },
      fill: {
        type: "solid" as const,
        colors: ["#38CB89"],
        opacity: 1
      },
      xaxis: {
        categories: monthKeys.map(month => {
          const key = `salary.months.${month}`;
          return t(key);
        })
      }
    } as ApexOptions
  });

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    const selectedRequest = requestTypes[index];
    setChartData({
      ...chartData,
      series: [{
        name: selectedRequest.label,
        data: getChartData(selectedRequest.key)
      }]
    });
  };

  return (
    <div className="chart-info chart-employee border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mb-4">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {t("reports.requestRate")}
        </h2>
      </div>
      <div className="all-buttons-chart flex  gap-3 flex-wrap pt-3 pb-5 px-2">
        {requestTypes.map((request, index) => (
          <button
            key={index}
            className={`button-transparent ${index === activeIndex
              ? "bg-lightColorWhite border-primaryColor text-primaryColor"
              : ""
              } `}
            onClick={() => handleButtonClick(index)}
          >
            {request.label}
          </button>
        ))}
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartRequestRate;

import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { ApexOptions } from "apexcharts";

interface DistributionPieChartProps {
  title: string;
  data: Array<{
    title: string;
    count: number;
  }>;
  colors?: string[];
}

const DistributionPieChart: React.FC<DistributionPieChartProps> = ({
  title,
  data = [],
  colors = ["#2F65CC", "#FAAD14", "#32A840", "#FE4D4F", "#722ED1", "#13C2C2", "#EB2F96", "#52C41A", "#F5222D", "#FA8C16"]
}) => {
  const { t } = useTranslation('staffManagement');

  const chartSeries = data.map(item => item.count);
  const chartLabels = data.map(item => item.title);
  const labeledChart = chartLabels.map(
    (label, index) => `${label} (${chartSeries[index]})`
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut" as const
    },
    labels: labeledChart,
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: "85%"
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: 280,
            height: 600
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 330,
        options: {
          chart: {
            width: 250,
            height: 400
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  return (
    <div className="chart-info chart-employee border border-lightColorWhite2 rounded-[8px] mt-3 py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mb-4 gap-2">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {t(title)}
        </h2>
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default DistributionPieChart; 
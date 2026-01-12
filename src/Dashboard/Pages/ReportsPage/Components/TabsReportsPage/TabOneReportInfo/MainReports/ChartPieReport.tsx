import ApexCharts from "react-apexcharts";
import React from "react";

type ChartPieReportProps = {
  title: string;
  data: { title: string; count: number }[];
  colors?: string[];
};

const ChartPieReport = ({ title, data, colors = ["#32A840", "#FC9C0F", "#FE4D4F", "#3B82F6", "#10B981"] }: ChartPieReportProps) => {
  const chartOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: {
        show: false
      }
    },
    labels: data.map(item => item.title),
    colors: colors,
    legend: {
      position: 'bottom' as const,
      horizontalAlign: 'center' as const,
      fontSize: '14px',
      markers: {
        size: 12,
        strokeWidth: 0,
        shape: 'circle' as const
      }
    },
    stroke: {
      width: 0
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: '14px',
        fontFamily: 'inherit',
        fontWeight: 'normal'
      }
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toString();
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%'
        }
      }
    }
  };

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const series = data.map(item => (item.count / total) * 100);

  return (
    <div className="chart-info border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mb-4">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {title}
        </h2>
      </div>
      <ApexCharts
        options={chartOptions}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default ChartPieReport; 
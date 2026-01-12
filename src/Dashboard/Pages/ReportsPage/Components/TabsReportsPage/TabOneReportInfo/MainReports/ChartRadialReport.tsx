import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

type ChartRadialReportProps = {
  title: string;
  data: { title: string; count: number }[];
  colors?: string[];
};

const ChartRadialReport = ({
  title,
  data,
  colors = ["#32A840", "#FC9C0F", "#FE4D4F", "#3B82F6", "#10B981"]
}: ChartRadialReportProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 1);

  const options: ApexOptions = {

    chart: {
      type: "radialBar" as const,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: "45%"
        },
        track: {
          background: "#f0f0f0",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontFamily: "inherit",
            fontWeight: "normal"
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            formatter: function (val: number) {
              return Number(val).toFixed(1) + "%";
            }
          }
        }
      }
    },
    stroke: {
      lineCap: "butt",
      width: 18
    },
    colors: colors,
    labels: data.map(item => item.title),
    legend: {
      show: true,
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      labels: {
        useSeriesColors: true
      },
      markers: {
        size: 12,
        strokeWidth: 0,
        shape: 'circle' as const
      },
      floating: false,
      offsetY: -100,
      offsetX: 0,
      showForNullSeries: true,
      showForSingleSeries: true,
      showForZeroSeries: true,
      formatter: function (seriesName: string, opts: { seriesIndex: number }) {
        return `${seriesName} (${data[opts.seriesIndex].count})`;
      }
    }
  };

  const series = data.map(item => (item.count / total) * 100);

  return (
    <div className="chart-info border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {title}
        </h2>
      </div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={400}
      />
    </div>
  );
};

export default ChartRadialReport; 
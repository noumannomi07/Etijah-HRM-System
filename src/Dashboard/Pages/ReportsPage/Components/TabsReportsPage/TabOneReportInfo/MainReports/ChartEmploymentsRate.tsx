import React from "react";
import Chart from "react-apexcharts";

const ChartEmploymentsRate = () => {
  const chartSeries = [44, 55, 41, 17];
  const chartLabels = ["إحتياط", "مقبول", "معلق", "مرفوض"];
  const labeledChart = chartLabels.map(
    (label, index) => `${label} (${chartSeries[index]})`
  );

  const chartOptions = {

    labels: labeledChart,
    colors: ["#2F65CC", "#FAAD14", "#32A840", "#FE4D4F"],
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
        <h2 className="title text-[16px] text-darkColor  font-[600]">
          معدل التوظيف
        </h2>
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries}
        height={350}
      />
    </div>
  );
};

export default ChartEmploymentsRate;

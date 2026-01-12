import ApexCharts from "react-apexcharts";
import "./ChartAttendancePerformanceInfo.css";
import { Select } from "flowbite-react";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import React from "react";
import { useTranslation } from "react-i18next";

const ChartAttendancePerformanceInfo = ({ month_attendance }: Partial<Pick<HomePageData, "month_attendance">>) => {
  const { t } = useTranslation('home');

  if (!month_attendance) return null;

  const { first_week, fourth_week, second_week, third_week } = month_attendance;

  const lateData = [
    first_week?.late,
    second_week?.late,
    third_week?.late,
    fourth_week?.late
  ]

  const absentData = [
    first_week?.absent,
    second_week?.absent,
    third_week?.absent,
    fourth_week?.absent
  ]

  const onTime = [
    first_week?.on_time,
    second_week?.on_time,
    third_week?.on_time,
    fourth_week?.on_time,
  ]


  const chartOptions = {
    chart: {
      id: "multi-line-chart"
    },
    xaxis: {
      categories: [
        t('dashboard.charts.weeks.week1'),
        t('dashboard.charts.weeks.week2'),
        t('dashboard.charts.weeks.week3'),
        t('dashboard.charts.weeks.week4'),
      ]
    },
    yaxis: {
      labels: {
        show: true
      },
      grid: {
        show: false // Hide horizontal grid lines
      }
    },
    grid: {
      show: false // Hide vertical grid lines
    },
    stroke: {
      curve: "smooth" as "smooth"
    },
    title: {
      text: "Sales Data",
      align: "left"
    },
    markers: {
      size: 4
    },
    colors: ["#FE4D4F", "#FC9C0F", "#32A840"], // Set different colors for each line
    legend: {
      position: "top" as "top",
      horizontalAlign: "center" as "center"
    }
  };

  const chartSeries = [
    {
      name: t('dashboard.charts.statuses.present'),
      data: onTime
    },
    {
      name: t('dashboard.charts.statuses.late'),
      data: lateData
    },
    {
      name: t('dashboard.charts.statuses.absent'),
      data: absentData
    }
  ];

  return (
    <div data-aos="fade-left" className="chart-line-content chart-info border border-lightColorWhite2 rounded-[8px] mt-3 py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3">
        <h2 className="title text-[16px] text-darkColor  font-[600]">
          {t('dashboard.charts.attendancePerformance')}
        </h2>
        <div className="select-option">
          <Select
            className="w-[150px]  text-[16px] text-darkColor  font-[600]"
            id="countries"
            required
          >
            <option disabled selected>
              {t('dashboard.charts.thisMonth')}
            </option>
            <option>{t('dashboard.charts.months.january')}</option>
            <option>{t('dashboard.charts.months.february')}</option>
            <option>{t('dashboard.charts.months.march')}</option>
            <option>{t('dashboard.charts.months.april')}</option>
          </Select>
        </div>
      </div>{" "}
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartAttendancePerformanceInfo;

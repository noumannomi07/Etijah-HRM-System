import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import CalendarDate from "./Components/CalendarDate";
import DateTaskIcon from "@/assets/Icons/DateTaskIcon.svg";
import "./TodaysTasks.css"
import React from "react";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import { useSearchParams } from "react-router-dom";
import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const TodaysTasks = (props: Pick<HomePageData, "today_tasks">) => {
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation('home');

  const { today_tasks } = props;
  const numTasks = today_tasks.length ?? 0;

  const handleDateChange = (date: DayValue) => {
    setSearchParams({ date: `${date?.year}-${date?.month.toString().padStart(2, '0')}-${date?.day.toString().padStart(2, '0')}` });
  }

  return (
    <div data-aos="fade-up" className="todays-tasks border-width-content mb-3">
      <HeaderTableInfo
        titleHeader={`${t('dashboard.rightPanel.todayTasks')} (${numTasks})`}
        routePageInfo={FullRoutes.Dashboard.Tasks.All}
        isButtonAll={true}
        textLink={<img src={DateTaskIcon} />}
      />
      <CalendarDate onDateChange={handleDateChange} />
    </div>
  );
};

export default TodaysTasks;

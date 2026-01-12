import React from "react";
import Missions from "./Components/Missions/Missions";
import NewsSummary from "./Components/NewsSummary/NewsSummary";
import TodaysTasks from "./Components/TodaysTasks/TodaysTasks";
import { HomePageData } from "../../types";

const RightContentPageHome = (props: Pick<HomePageData, "today_tasks" | 'latest_blogs'>) => {
  const { today_tasks, latest_blogs } = props;
  return (
    <>
      <TodaysTasks today_tasks={today_tasks} />
      <Missions today_tasks={today_tasks} />
      <NewsSummary latest_blogs={latest_blogs} />
    </>
  );
};

export default RightContentPageHome;

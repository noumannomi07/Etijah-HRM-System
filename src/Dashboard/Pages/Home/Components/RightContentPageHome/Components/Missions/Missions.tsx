import React from "react";
import CardMission from "./CardMission";
// import { dataMissions } from "./Data/DataMissions";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import { useTranslation } from "react-i18next";

const Missions = (props: Pick<HomePageData, "today_tasks">) => {
  const { today_tasks } = props;
  const { i18n } = useTranslation('home');
  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US';

  if (!today_tasks || today_tasks.length === 0) {
    return (
      <div data-aos="fade-right" className="all-missions border-width-content mb-3">
        <CardMission
          title=""
          description=""
          timeRange=""
          duration={0}
          status=""
          onShow={() => { }}
          onEdit={() => { }}
          onDelete={() => { }}
        />
      </div>
    );
  }

  return (
    <div data-aos="fade-right" className="all-missions border-width-content mb-3">
      <div className="main-cards-missions max-h-[50vh] overflow-auto scrollbarChange pl-3 scrollbarChange-width-5">
        {today_tasks.map((mission, index) => {
          const startDate = new Date(mission.start_date);
          const endDate = new Date(mission.end_date);
          const timeRange = `${startDate.toLocaleString(locale, { hour: 'numeric', minute: 'numeric' })} - ${endDate.toLocaleString(locale, { hour: 'numeric', minute: 'numeric' })}`;
          const duration = endDate.getTime() - startDate.getTime();
          const durationInHours = duration / (1000 * 60 * 60);
          return (
            <CardMission
              key={index}
              title={mission.title}
              description={mission.content}
              timeRange={timeRange}
              duration={durationInHours}
              status={mission.status}
              onShow={() => console.log(`Show mission ${index + 1}`)}
              onEdit={() => console.log(`Edit mission ${index + 1}`)}
              onDelete={() => console.log(`Delete mission ${index + 1}`)}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Missions;

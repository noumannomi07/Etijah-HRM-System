import { useTranslation } from "react-i18next";
import ClocksIconBg from "@assets/images/taskspageicons/clocksiconbg";
import ProjectsIconBg from "@assets/images/taskspageicons/projectsiconbg";
import UsersIconBg from "@assets/images/taskspageicons/usersiconbg.svg";
import CardEmploymentOne from "@/Dashboard/Pages/Employment/Components/HomeEmployment/HeaderCardEmployment/CardEmploymentOne";
import React from "react";

const CardsHeaderTasks = ({ totals }) => {
  const { t } = useTranslation("tasks");

  const cardItems = [
    {
      id: 1,
      title: t("cards.totalTasks"),
      icon: <img src={UsersIconBg} alt={t("cards.totalTasks")} />,
      numberCounter: totals?.all_tasks_count || 0
    },
    {
      id: 2,
      title: t("cards.inProgress"),
      icon: <ProjectsIconBg />,
      numberCounter: totals?.in_progress_tasks || 0
    },
    {
      id: 3,
      title: t("cards.completedTasks"),
      icon: <ClocksIconBg />,
      numberCounter: totals?.completed_tasks || 0
    },
    {
      id: 4,
      title: t("cards.lateTasks"),
      icon: <ClocksIconBg />,
      numberCounter: totals?.late_tasks || 0
    }
  ];
  return (
    <div className="all-card-employment mb-5 grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardItems.map((item) => (
        <CardEmploymentOne
          key={item.id}
          iconCard={item.icon}
          title={item.title}
          numberCounter={item.numberCounter}
          typeCurrency={false}
          isHideCurrency={true}
        />
      ))}
    </div>
  );
};

export default CardsHeaderTasks;

import CardHeaderOne from "./CardHeaderOne";
import PeopleIcon from "@assets/images/homeimages/iconscardheader/people.svg";
import DocumentIcon from "@assets/images/homeimages/iconscardheader/document.svg";
import RemovePersonIcon from "@assets/images/homeimages/iconscardheader/remove_person.svg";
import CalendarIcon from "@assets/images/homeimages/iconscardheader/calendar.svg";
import { HomePageData } from "../../types";
import React from "react";
import { useTranslation } from "react-i18next";

type CardsProps = Partial<Pick<HomePageData, 'all_violations' | 'all_employees' | 'all_tasks' | 'all_vacations'>>

const CardsHeader = (props: CardsProps) => {
  const { all_employees, all_violations, all_tasks, all_vacations } = props;
  const { t, i18n } = useTranslation('home');
  const lang = i18n.language;
  const currentDate = new Date().toLocaleString(lang, {
    hour: 'numeric',
    minute: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false
  });

  const cardData = [
    {
      icon: PeopleIcon,
      titleHead: t('dashboard.cards.totalEmployees'),
      numInfoCount: all_employees,
      isUpPer: false,
      isDownPer: false,
      numPer: 12,
      dateUpdate: currentDate
    },
    {
      icon: DocumentIcon,
      titleHead: t('dashboard.cards.totalVacationRequests'),
      numInfoCount: all_vacations,
      isUpPer: false,
      isDownPer: false,
      numPer: 12,
      dateUpdate: currentDate
    },
    {
      icon: RemovePersonIcon,
      titleHead: t('dashboard.cards.totalViolations'),
      numInfoCount: all_violations,
      isUpPer: false,
      isDownPer: false,
      numPer: 20,
      dateUpdate: currentDate
    },
    {
      icon: CalendarIcon,
      titleHead: t('dashboard.cards.totalTasks'),
      numInfoCount: all_tasks,
      isUpPer: false,
      isDownPer: false,
      numPer: 20,
      dateUpdate: currentDate
    }
  ];

  return (
    <div data-aos="fade-up" className="all-cards grid sm:grid-cols-2 gap-[12px]">
      {cardData.map((itemCard) => {
        return (
          <CardHeaderOne
            key={itemCard.titleHead}
            icon={itemCard.icon}
            titleHead={itemCard.titleHead}
            numInfoCount={itemCard.numInfoCount ?? 0}
            isUpPer={itemCard.isUpPer}
            isDownPer={itemCard.isDownPer}
            numPer={itemCard.numPer}
            dateUpdate={itemCard.dateUpdate}
          />
        );
      })}
    </div>
  );
};

export default CardsHeader;

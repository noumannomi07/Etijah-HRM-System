import React from "react";
import PeopleIcon from "@assets/images/homeimages/iconscardheader/people.svg";
import AddPersonIcon from "@assets/images/homeimages/iconscardheader/add_person.svg";
import CalendarIcon from "@assets/images/homeimages/iconscardheader/calendar.svg";
import DocumentIcon from "@assets/images/homeimages/iconscardheader/document.svg";
import CardHeaderOne from "@/Dashboard/Pages/Home/Components/CardsHeader/CardHeaderOne";
import { ReportsResponse } from "@/types/Reports";
import { useTranslation } from "react-i18next";

type HeaderCardTabProps = {
  data: ReportsResponse;
}

const HeaderCardTab = ({ data }: HeaderCardTabProps) => {
  const { t, i18n } = useTranslation('staffManagement');

  const dateLanguage = i18n.language === "ar" ? "ar-EG" : "en-US";

  const cardData = data?.report ? [
    {
      icon: PeopleIcon,
      titleHead: t("reports.employeesCount"),
      numInfoCount: data?.report?.employees_count,
      isUpPer: true,
      isDownPer: false,
      numPer: 12,
      dateUpdate: new Date().toLocaleString(dateLanguage)
    },
    {
      icon: AddPersonIcon,
      titleHead: t("reports.jobApplications"),
      numInfoCount: data?.report?.applicants,
      isUpPer: true,
      isDownPer: false,
      numPer: 12,
      dateUpdate: new Date().toLocaleString(dateLanguage)
    },
    {
      icon: CalendarIcon,
      titleHead: t("reports.totalTasks"),
      numInfoCount: data?.report?.tasks,
      isUpPer: true,
      isDownPer: false,
      numPer: 20,
      dateUpdate: new Date().toLocaleString(dateLanguage)
    },
    {
      icon: DocumentIcon,
      titleHead: t("reports.totalRequests"),
      numInfoCount: data?.report?.approved_transactions,
      isUpPer: true,
      isDownPer: false,
      numPer: 20,
      dateUpdate: new Date().toLocaleString(dateLanguage)
    }
  ] : [];

  return (
    <div className="all-cards grid sm:col-span-1 md:grid-cols-2 xl:grid-cols-4 gap-[12px]">
      {cardData.map((itemCard, index) => (
        <CardHeaderOne
          key={index}
          icon={itemCard.icon}
          titleHead={itemCard.titleHead}
          numInfoCount={itemCard.numInfoCount}
          isUpPer={itemCard.isUpPer}
          isDownPer={itemCard.isDownPer}
          numPer={itemCard.numPer}
          dateUpdate={itemCard.dateUpdate}
        />
      ))}
    </div>
  )
}

export default HeaderCardTab

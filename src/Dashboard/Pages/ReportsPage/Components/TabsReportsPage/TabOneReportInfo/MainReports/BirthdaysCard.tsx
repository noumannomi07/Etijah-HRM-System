import DateIconBgReport from "@assets/Icons/DateIconBgReport.svg";
import { Employee } from "@/Dashboard/Pages/types";
import React from "react";
import { useTranslation } from "react-i18next";

const BirthdaysCard = ({ data }: { data: Employee[] }) => {
  const { t, i18n } = useTranslation('staffManagement');
  const month = new Date().toLocaleString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { month: 'long' });

  return (
    <div className="birthday-card border-width-content">
      <div className="header-top flex-between mb-4">
        <h2 className="title text-font-dark text-[16px]">{t('reports.birthdays.title')} {month}</h2>
        <img src={DateIconBgReport} />
      </div>
      <div className="all-birthday-card">
        {data.map((item) => {
          return (
            <>
              <div
                key={item.id}
                className="birthday-employee-one item-center-flex mb-3"
              >
                <div className="image-employee">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="content-card-birthday">
                  <h2 className="name-employee text-font-dark text-[16px]">
                    {item.name}
                  </h2>
                  <p className="birth-date text-font-gray text-[15px]">
                    {item.birth_date}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default BirthdaysCard;

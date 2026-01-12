import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import React from "react";
import { useTranslation } from "react-i18next";

type CardMissionProps = {
  title: string;
  description: string;
  timeRange: string;
  duration: number;
  status: string;
  onShow: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EmptyStateMission = () => {
  const { t } = useTranslation('home');

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.missions.noMissions')}</h3>
        <p className="text-sm text-gray-600 mt-1">{t('dashboard.missions.noMissionsFound')}</p>
      </div>
    </div>
  );
};

const CardMission = ({
  title,
  description,
  timeRange,
  duration,
  status,
  onShow,
  onEdit,
  onDelete
}: CardMissionProps) => {
  const isEmpty = !title && !description && !timeRange && !duration && !status;
  const { t } = useTranslation('home');

  if (isEmpty) {
    return <EmptyStateMission />;
  }

  const isCompleted = status ;

  // Map status to translated values if it matches known statuses
  let translatedStatus = status;
  // upcoming,in_progress,completed,cancelled,late
  if (status === "completed") {
    translatedStatus = t('dashboard.missions.statuses.completed');
  } else if (status === "upcoming") {
    translatedStatus = t('dashboard.missions.statuses.upcoming');
  } else if (status === "in_progress") {
    translatedStatus = t('dashboard.missions.statuses.in_progress');
  } else if (status === "late") {
    translatedStatus = t('dashboard.missions.statuses.late');
  } else if (status === "cancelled") {
    translatedStatus = t('dashboard.missions.statuses.cancelled');
  }

  return (
    <div className="card-mission border-b pb-3 mb-3">
      <div className="header-card-mission flex-between-wrap">
        <h2
          className={`title text-font-dark ${isCompleted ? "line-through" : ""
            }`}
        >
          {title}
        </h2>
        {/* <div className="action-button">
          <ButtonsActionShowEditDelete
            functionShow={onShow}
            functionEdit={onEdit}
            functionDelete={onDelete}
            functionLinkCopy={() => { }}
            hideShowFunction={false}
            showLinkCopy={false}
            hideEdit={false}
            hideDelete={false}
          />
        </div> */}
      </div>
      <div className="bottom-content-card">
        <p
          className={`text truncate text-font-gray py-[10px] ${isCompleted ? "line-through" : ""
            }`}
        >
          {description}
        </p>
        <div className="main-card-bottom flex-between-wrap">
          <div className="info-card-right relative pr-3 after:content after:absolute after:bg-primaryColor after:h-[100%] after:w-[4px] after:top-[0%] after:right-[0px] after:rounded-[50px]">
            <h2
              className={`title text-font-dark ${isCompleted ? "line-through" : ""
                }`}
            >
              {timeRange}
            </h2>
            <p
              className={`time-text text-font-gray ${isCompleted ? "line-through" : ""
                }`}
            >
              {t('duration_in_hours', { count: duration })}
            </p>
          </div>
          <div
            className={`badge-info-content ${status === "قادمة" ? "status-oranged" : "status-success"
              }`}
          >
            {translatedStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMission;

import React from "react";
import { DateDisplay } from "./DateDisplay";
import { StatusBadge } from "./StatusBadge";
import { UserAvatar } from "./UserAvatar";
import { useTranslation } from "react-i18next";

interface VacationTableRowProps {
  numInfo: string;
  imgUser: string;
  name: string;
  dateVaca: string;
  typeVaca: string;
  statusInfo: string;
  onViewDetails: () => void;
}

export const VacationTableRow = ({
  numInfo,
  imgUser,
  name,
  dateVaca,
  typeVaca,
  statusInfo,
  onViewDetails
}: VacationTableRowProps) => {
  const { t } = useTranslation("staffManagement");

  return (
    <>
      <td>{numInfo}</td>
      <td><UserAvatar imgUrl={imgUser} name={name} /></td>
      <td><DateDisplay date={dateVaca} /></td>
      <td><StatusBadge status={typeVaca} type="vacation" /></td>
      <td><StatusBadge status={statusInfo} /></td>
      <td>
        <button onClick={onViewDetails} className="btn-main button-green">
          {t("common.view")}
        </button>
      </td>
    </>
  );
};
import { EStatus } from "@/Dashboard/Pages/types";
import React from "react";
import { useTranslation } from "react-i18next";

interface StatusBadgeProps {
  status: string;
  type?: 'vacation' | 'approval';
}

export const StatusBadge = ({ status, type = 'approval' }: StatusBadgeProps) => {
  const { t } = useTranslation("staffManagement");

  const getStatusClass = () => {
    switch (status) {
      case EStatus.Pending: return "status-oranged";
      case EStatus.Approved: return "status-success";
      case EStatus.Rejected: return "status-danger";
      case EStatus.Paid: return "status-success";
      default: return "";
    }
  };

  const getStatusText = () => {
    if (type === 'vacation') {
      return t(`vacations.typeValues.${status.toLowerCase()}`, status);
    }

    return t(`vacations.statusValues.${status.toLowerCase()}`, status);
  };

  return <div className={getStatusClass()}>{getStatusText()}</div>;
};
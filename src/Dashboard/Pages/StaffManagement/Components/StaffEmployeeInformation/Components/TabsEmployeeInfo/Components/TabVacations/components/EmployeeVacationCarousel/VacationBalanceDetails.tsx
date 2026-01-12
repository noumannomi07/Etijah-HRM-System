import React from 'react';
import { useTranslation } from 'react-i18next';

export interface VacationBalanceDetailsProps {
  availableDays: number;
  headerText?: string;
  labelText?: string;
  className?: string;
}

const VacationBalanceDetails: React.FC<VacationBalanceDetailsProps> = ({
  availableDays,
  headerText,
  labelText,
  className = '',
}) => {
  const { t } = useTranslation("staffManagement");

  return (
    <div className={`vacation-balance-details ${className}`}>
      <div className="circle-header">{headerText || t("vacations.available")}</div>
      <div className="circle-value">{availableDays}</div>
      <div className="circle-label">{labelText || t("vacations.calendarDays")}</div>
    </div>
  );
};

export default VacationBalanceDetails;

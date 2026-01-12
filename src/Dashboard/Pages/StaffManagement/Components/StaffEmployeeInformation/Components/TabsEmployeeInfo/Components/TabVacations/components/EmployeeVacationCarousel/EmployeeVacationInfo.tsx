import { VacationType } from '@/Dashboard/Pages/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface EmployeeVacationInfoProps {
  vacationType: VacationType;
}

const EmployeeVacationInfo: React.FC<EmployeeVacationInfoProps> = ({
  vacationType
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className={`leave-balance-info`}>
      <div className="leave-type">
        <span className="leave-title">
          {isArabic ? vacationType.ar_title : vacationType.en_title || vacationType.ar_title}
        </span>
      </div>
      <div className="leave-subtitle">
        {isArabic ? vacationType.ar_content : vacationType.en_content || vacationType.ar_content}
      </div>
    </div>
  );
};

export default EmployeeVacationInfo;
import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { useTranslation } from "react-i18next";

const ContentRightPayrollBenefits = () => {
  const { t } = useTranslation('payrollBenefitsManagement');
  
  return (
    <div className="content-right-payroll-header">
      <InfoSection
        dataAos="fade-left"
        newClassInfoSection={"info-details-payroll-header"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightPayrollBenefits;

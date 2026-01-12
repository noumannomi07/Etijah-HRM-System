import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { useTranslation } from "react-i18next";

const ContentRightRecruitment = () => {
  const { t } = useTranslation('recruitmentManagementServices');
  
  return (
    <div className="content-right-recruitment-header">
      <InfoSection
        dataAos="fade-down"
        newClassInfoSection={"info-details-recruitment-header"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightRecruitment;

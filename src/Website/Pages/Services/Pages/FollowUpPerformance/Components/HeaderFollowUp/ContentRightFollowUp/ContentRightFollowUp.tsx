import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { useTranslation } from "react-i18next";

const ContentRightFollowUp = () => {
  const { t } = useTranslation('followUpPerformance');
  
  return (
    <div className="content-right-follow-header">
      <InfoSection
      dataAos="fade-left"
        newClassInfoSection={"info-details-follow-header"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightFollowUp;

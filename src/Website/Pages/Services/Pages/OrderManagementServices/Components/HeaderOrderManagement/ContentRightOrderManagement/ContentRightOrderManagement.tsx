import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { useTranslation } from "react-i18next";

const ContentRightOrderManagement = () => {
  const { t } = useTranslation('orderManagementServices');
  
  return (
    <div className="content-right-orders-header">
      <InfoSection
        dataAos="fade-left"
        newClassInfoSection={"info-details-orders-header"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightOrderManagement;

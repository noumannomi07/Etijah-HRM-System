import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { useTranslation } from "react-i18next";

const ContentRightAttendanceDeparture = () => {
  const { t } = useTranslation('attendanceDepartureManagement');
  
  return (
    <div className="content-right-blog-header">
      <InfoSection
      dataAos="fade-left"
        newClassInfoSection={"info-details-attenfance-header"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightAttendanceDeparture;

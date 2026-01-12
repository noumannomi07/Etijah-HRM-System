import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import PackagesCards from "./PackagesCards/PackagesCards";
import { useTranslation } from "react-i18next";

const ContentHeaderPackages = () => {
  const { t } = useTranslation('packages');
  
  return (
    <InfoSection
      dataAos="fade-up"
      newClassInfoSection={"center-content-section-info"}
      title={t('header.title')}
      description={t('header.description')}
      hideButtonSendRequest={false}
    >
      <PackagesCards />
    </InfoSection>
  );
};

export default ContentHeaderPackages;

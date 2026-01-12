import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import image from "@assets/images/website/login/1.png";
import { useTranslation } from "react-i18next";

const ContentSubscriptionInfo = () => {
  const { t } = useTranslation('subscription');
  
  return (
    <InfoSection
      dataAos="fade-up"
      newClassInfoSection={"info-content-subscription"}
      title={t('content.title')}
      description={t('content.description')}
      hideButtonSendRequest={true}
    >
      <div className="images-main mt-6">
        <img src={image} alt="image subscription" className="object-cover" loading="lazy" />
      </div>
    </InfoSection>
  );
};

export default ContentSubscriptionInfo;

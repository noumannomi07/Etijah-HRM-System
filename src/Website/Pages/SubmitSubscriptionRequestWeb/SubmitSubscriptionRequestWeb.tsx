import SuccessPartnersSection from "@/Website/Shared/SuccessPartnersSection/SuccessPartnersSection";
import HeaderSubscription from "./Components/HeaderSubscription/HeaderSubscription";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const SubmitSubscriptionRequestWeb = () => {
  const { t } = useTranslation(['subscription', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:subscription.title')}
        description={t('seo:subscription.description')}
        keywords={t('seo:subscription.keywords')}
        type="website"
      />
      <div className="page-subscription-content">
        <HeaderSubscription />
        <SuccessPartnersSection />
      </div>
    </>
  );
};

export default SubmitSubscriptionRequestWeb;

import SuccessPartnersSection from "@/Website/Shared/SuccessPartnersSection/SuccessPartnersSection";
import CardsServicesPage from "./Components/CardsServicesPage/CardsServicesPage";
import HeaderServicesPage from "./Components/HeaderServicesPage/HeaderServicesPage";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const ServicesPage = () => {
  const { t } = useTranslation(['services', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:services.title')}
        description={t('seo:services.description')}
        keywords={t('seo:services.keywords')}
        type="website"
      />
      <div className="services-page">
        <HeaderServicesPage />
        <CardsServicesPage />
        <SuccessPartnersSection />
        <BannerSectionShared />
      </div>
    </>
  );
};

export default ServicesPage;

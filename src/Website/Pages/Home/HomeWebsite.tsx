import HeaderHome from "./Components/HeaderHome/HeaderHome";
import ServicesSection from "./Components/ServicesSection/ServicesSection";
import SuccessPartnersSection from "@/Website/Shared/SuccessPartnersSection/SuccessPartnersSection";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import OpinionsOurCustomers from "./Components/OpinionsOurCustomers/OpinionsOurCustomers";
import AboutEtijah from "./Components/AboutEtijah/AboutEtijah";
import PartnerAllStages from "./Components/PartnerAllStages/PartnerAllStages";
import TheNumbersSpeak from "./Components/TheNumbersSpeak/TheNumbersSpeak";
import EtijahFeatures from "./Components/EtijahFeatures/EtijahFeatures";
import ControlPanelSection from "./Components/ControlPanelSection/ControlPanelSection";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const HomeWebsite = () => {
  const { t } = useTranslation(['homePage', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:home.title')}
        description={t('seo:home.description')}
        keywords={t('seo:home.keywords')}
        type="website"
      />
      <HeaderHome />
      <ServicesSection />
      <EtijahFeatures />
      <PartnerAllStages />
      <ControlPanelSection />
      <AboutEtijah />
      <TheNumbersSpeak />
      <OpinionsOurCustomers />
      <SuccessPartnersSection />
      <BannerSectionShared />
    </>
  );
};

export default HomeWebsite;

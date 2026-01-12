import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import HeaderAbout from "./Components/HeaderAbout/HeaderAbout";
import SuccessPartnersSection from "@/Website/Shared/SuccessPartnersSection/SuccessPartnersSection";
import BannerOpinionAbout from "./Components/BannerOpinionAbout/BannerOpinionAbout";
import CoreValuesEtijah from "./Components/CoreValuesEtijah/CoreValuesEtijah";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation(['aboutUs', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:about.title')}
        description={t('seo:about.description')}
        keywords={t('seo:about.keywords')}
        type="website"
      />
      <div className="page-about-us">
        <HeaderAbout />
        <CoreValuesEtijah />
        <BannerOpinionAbout />
        <SectionCustomerOpinions />
        <SuccessPartnersSection />
        <BannerSectionShared />
      </div>
    </>
  );
};

export default AboutUs;

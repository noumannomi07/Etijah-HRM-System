import BannerFollowUp from "./Components/BannerFollowUp/BannerAttendance";
import HeaderFollowUp from "./Components/HeaderFollowUp/HeaderFollowUp";
import CardsHeaderFollowUp from "./Components/CardsHeaderFollowUp/CardsHeaderFollowUp";
import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const FollowUpPerformance = () => {
  const { t } = useTranslation(['followUpPerformance', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:performance.title')}
        description={t('seo:performance.description')}
        keywords={t('seo:performance.keywords')}
        type="website"
      />
      <div className="follow-up-page">
        <HeaderFollowUp />
        <CardsHeaderFollowUp />
        <BannerFollowUp />
        <ServicesSection />
        <SectionCustomerOpinions />

        <BannerSectionShared />
      </div>
    </>
  );
};

export default FollowUpPerformance;

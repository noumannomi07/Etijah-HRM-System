import HeaderRecruitment from "./Components/HeaderRecruitment/HeaderRecruitment";
import CardsHeaderRecruitment from "./Components/CardsHeaderRecruitment/CardsHeaderRecruitment";
import BannerRecruitment from "./Components/BannerRecruitment/BannerRecruitment";
import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const RecruitmentManagementServices = () => {
  const { t } = useTranslation(['recruitmentManagementServices', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:recruitment.title')}
        description={t('seo:recruitment.description')}
        keywords={t('seo:recruitment.keywords')}
        type="website"
      />
      <div className="payroll-recruitment-page">
        <HeaderRecruitment />
        <CardsHeaderRecruitment />
        <BannerRecruitment />
        <ServicesSection />
        <SectionCustomerOpinions />
        <BannerSectionShared />
      </div>
    </>
  );
};

export default RecruitmentManagementServices;

import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
import BannerPayrollBenefits from "./Components/BannerPayrollBenefits/BannerPayrollBenefits";
import CardsHeaderPayrollBenefits from "./Components/CardsHeaderPayrollBenefits/CardsHeaderPayrollBenefits";
import HeaderPayrollBenefits from "./Components/HeaderPayrollBenefits/HeaderPayrollBenefits";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const PayrollBenefitsManagement = () => {
  const { t } = useTranslation(['payrollBenefitsManagement', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:payroll.title')}
        description={t('seo:payroll.description')}
        keywords={t('seo:payroll.keywords')}
        type="website"
      />
      <div className="payroll-benefit-page">
        <HeaderPayrollBenefits />
        <CardsHeaderPayrollBenefits />
        <BannerPayrollBenefits />
        <ServicesSection />
        <SectionCustomerOpinions />

        <BannerSectionShared />
      </div>
    </>
  );
};

export default PayrollBenefitsManagement;

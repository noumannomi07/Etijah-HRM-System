import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
import BannerSmartRange from "./Components/BannerSmartRange/BannerSmartRange";
import CardsSmartRangeCalc from "./Components/CardsSmartRangeCalc/CardsSmartRangeCalc";
import HeaderSmartRangeCalc from "./Components/HeaderSmartRangeCalc/HeaderSmartRangeCalc";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

const SmartRangeCalculator = () => {
  return (
    <>
      <HelmetInfo titlePage={"حاسبة النطاقات الذكي"} />
      <div className="smart-range-calc-page">
        <HeaderSmartRangeCalc />
        <CardsSmartRangeCalc />
        <BannerSmartRange />
        <ServicesSection />
        <SectionCustomerOpinions />
        <BannerSectionShared />
      </div>
    </>
  );
};

export default SmartRangeCalculator;

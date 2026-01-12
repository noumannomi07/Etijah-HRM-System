import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
import ContentRightPayrollBenefits from "./ContentRightPayrollBenefits/ContentRightPayrollBenefits";
import ContentLeftPayrollBenefits from "./ContentLeftPayrollBenefits/ContentLeftPayrollBenefits";

const HeaderPayrollBenefits = () => {
  return (
    <>
      <BannerLayout
        leftContent={<ContentRightPayrollBenefits />}
        rightContent={<ContentLeftPayrollBenefits />}
        className="banner-header-main-payroll"
      />
    </>
  );
};

export default HeaderPayrollBenefits;

import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import TableComparePackages from "./TableComparePackages/TableComparePackages";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import { useTranslation } from "react-i18next";

const ComparePackages = () => {
  const { t } = useTranslation('packages');
  
  return (
    <div className="compare-packages padding-60-web hidden">
      {/* =================== START CONTAINER ================== */}
      <ContainerMedia>
        {/* ================ START ALL COMPARE PACKAGES ================ */}
        <div data-aos="fade-up" className="all-compare-packages">
          {/* ================ START  SECTION TITLE ===============  */}
          <WebSectionTitle
            isTrueReverseCol={false}
            newClassTitleSection={""}
            ishideText={true}
            textTitleHead={""}
            titleWebSection={t('comparison.sectionTitle')}
          />
          {/* ================ END  SECTION TITLE ===============  */}
          <TableComparePackages />
        </div>
        {/* ================ END ALL COMPARE PACKAGES ================ */}
      </ContainerMedia>
      {/* =================== END CONTAINER ================== */}
    </div>
  );
};

export default ComparePackages;

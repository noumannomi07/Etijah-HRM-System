import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import ComparePackages from "./Components/ComparePackages/ComparePackages";
import HeaderPackages from "./Components/HeaderPackages/HeaderPackages";
import { useTranslation } from "react-i18next";

const PackagesPage = () => {
  const { t } = useTranslation(['packages', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:packages.title')}
        description={t('seo:packages.description')}
        keywords={t('seo:packages.keywords')}
        type="website"
      />
      <div className="packages-page-content">
        <HeaderPackages />
        <ComparePackages />
      </div>
    </>
  );
};

export default PackagesPage;

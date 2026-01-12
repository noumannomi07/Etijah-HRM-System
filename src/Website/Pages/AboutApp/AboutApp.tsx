import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import CardsAboutApp from "./Components/CardsAboutApp/CardsAboutApp";
import HeaderAboutApp from "./Components/HeaderAboutApp/HeaderAboutApp";
import SliderAppImages from "./Components/SliderAppImages/SliderAppImages";
import BannerAboutApp from "./Components/BannerAboutApp/BannerAboutApp";
import SectionDownloadApp from "./Components/SectionDownloadApp/SectionDownloadApp";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";

const AboutApp = () => {
  const { t } = useTranslation(['aboutApp', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:mobileApp.title')}
        description={t('seo:mobileApp.description')}
        keywords={t('seo:mobileApp.keywords')}
        type="website"
      />
      <div className="about-app">
        <HeaderAboutApp />
        <main>
          <CardsAboutApp />
          <BannerAboutApp />
          <SliderAppImages />
          <SectionDownloadApp />
          <BannerSectionShared />
        </main>
      </div>
    </>
  );
};

export default AboutApp;

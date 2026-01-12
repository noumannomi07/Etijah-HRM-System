import BannerShowDetails from "@/Website/Shared/BannerShowDetails/BannerShowDetails";
import { sliderDataItems } from "@/Website/Pages/Auth/Login/Components/SliderLogin/images";
import { useTranslation } from "react-i18next";
const BannerAboutApp = () => {
  const { t } = useTranslation('aboutApp');
  
  // Create translated slider data
  const translatedSliderData = [
    {
      id: 0,
      isTrueBg: false,
      image: sliderDataItems[0].image,
      title: t('banner.features.performanceTracking.title'),
      text: t('banner.features.performanceTracking.description')
    },
    {
      id: 1,
      isTrueBg: true,
      image: sliderDataItems[1].image,
      title: t('banner.features.payrollManagement.title'),
      text: t('banner.features.payrollManagement.description')
    },
    {
      id: 2,
      isTrueBg: false,
      image: sliderDataItems[2].image,
      title: t('banner.features.taskManagement.title'),
      text: t('banner.features.taskManagement.description')
    },
    {
      id: 3,
      isTrueBg: true,
      image: sliderDataItems[3].image,
      title: t('banner.features.orderManagement.title'),
      text: t('banner.features.orderManagement.description')
    },
    {
      id: 4,
      isTrueBg: false,
      image: sliderDataItems[4].image,
      title: t('banner.features.attendanceTracking.title'),
      text: t('banner.features.attendanceTracking.description')
    }
  ];
  
  return (
    <div className="all-cards-banner-details-about-app padding-60-web">
      {translatedSliderData.map((item) => {
        return (
          <BannerShowDetails
            key={item.id}
            isBgLightBlue={item.isTrueBg}
            title={item.title}
            textDiscription={item.text}
            imgBannerShow={item.image}
            altImage={item.title}
          />
        );
      })}
    </div>
  );
};

export default BannerAboutApp;

import BannerShowDetails from "@/Website/Shared/BannerShowDetails/BannerShowDetails";
import img from "@assets/images/website/services/imagesservices/attendancedeparture/apro.png";
import img02 from "@assets/images/website/services/imagesservices/attendancedeparture/02.png";
import img03 from "@assets/images/website/services/imagesservices/attendancedeparture/03.png";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const BannerAttendance = () => {
  const { t } = useTranslation('attendanceDepartureManagement');
  
  const allCards = [
    {
      id: 1,
      isTrueBg: false,
      title: t('banner.items.0.title'),
      text: t('banner.items.0.text'),
      image: img
    },
    {
      id: 2,
      isTrueBg: true,
      title: t('banner.items.1.title'),
      text: t('banner.items.1.text'),
      image: img02
    },
    {
      id: 3,
      isTrueBg: false,
      title: t('banner.items.2.title'),
      text: t('banner.items.2.text'),
      image: img03
    }
  ];
  return (
    <div className="main-banner-attendace padding-60-web">
      <WebSectionTitle
        dataAos="fade-down"
        isTrueReverseCol={true}
        newClassTitleSection={"center-items"}
        ishideText={false}
        textTitleHead={t('banner.subtitle')}
        titleWebSection={t('banner.title')}
      />
      <div className="all-cards-banner-details-attendance">
        {allCards.map((item) => {
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
    </div>
  );
};

export default BannerAttendance;

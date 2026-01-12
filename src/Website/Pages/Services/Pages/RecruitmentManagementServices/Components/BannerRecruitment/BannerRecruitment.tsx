import BannerShowDetails from "@/Website/Shared/BannerShowDetails/BannerShowDetails";
import img01 from "@assets/images/website/services/imagesservices/recruitmentmanagementservices/a001.png";
import img02 from "@assets/images/website/services/imagesservices/recruitmentmanagementservices/a02.png";
import img03 from "@assets/images/website/services/imagesservices/recruitmentmanagementservices/a03.png";
import img04 from "@assets/images/website/services/imagesservices/recruitmentmanagementservices/a04.png";

import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const BannerRecruitment = () => {
  const { t } = useTranslation('recruitmentManagementServices');
  
  const allCards = [
    {
      id: 1,
      isTrueBg: false,
      title: t('banner.items.0.title'),
      text: t('banner.items.0.text'),
      image: img01
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
    },
    {
      id: 4,
      isTrueBg: false,
      title: t('banner.items.3.title'),
      text: t('banner.items.3.text'),
      image: img04
    }
  ];
  return (
    <div className="all-cards-banner-details-recruitment padding-60-web">
      <WebSectionTitle
        dataAos="fade-down"
        isTrueReverseCol={true}
        newClassTitleSection={"center-items"}
        ishideText={false}
        textTitleHead={t('banner.subtitle')}
        titleWebSection={t('banner.title')}
      />
      <div>
        {allCards.map(item => {
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

export default BannerRecruitment;

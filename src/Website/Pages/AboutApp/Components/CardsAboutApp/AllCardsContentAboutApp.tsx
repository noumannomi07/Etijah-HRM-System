import ChartArrowUp from "@assets/images/website/aboutapp/icons/chartarrowup";
import ChartPieIcon from "@assets/images/website/aboutapp/icons/chartpieicon";
import MobileAppIcon from "@assets/images/website/aboutapp/icons/mobileappicon";
import UserAppIcon from "@assets/images/website/aboutapp/icons/userappicon";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import { useTranslation } from "react-i18next";

const AllCardsContentAboutApp = () => {
  const { t } = useTranslation('aboutApp');
  
  const cardData = [
    {
      id: 1,
      title: t('cards.features.productivity.title'),
      text: t('cards.features.productivity.description'),
      icon: <ChartArrowUp />,
    },
    {
      id: 2,
      title: t('cards.features.communication.title'),
      text: t('cards.features.communication.description'),
      icon: <UserAppIcon />,
    },
    {
      id: 3,
      title: t('cards.features.analytics.title'),
      text: t('cards.features.analytics.description'),
      icon: <ChartPieIcon />,
    },
    {
      id: 4,
      title: t('cards.features.userExperience.title'),
      text: t('cards.features.userExperience.description'),
      icon: <MobileAppIcon />,
    },
  ];
  return (
    <div className="all-cards-content-about-app grid-cards-2">
      {cardData.map((card) => (
        <CardBoxOneShared
          key={card.id}
          functionCardBox={() => {}}
          iconHeaderBox={card.icon}
          titleContentCard={card.title}
          textContentCard={card.text}
        />
      ))}
    </div>
  );
};

export default AllCardsContentAboutApp;

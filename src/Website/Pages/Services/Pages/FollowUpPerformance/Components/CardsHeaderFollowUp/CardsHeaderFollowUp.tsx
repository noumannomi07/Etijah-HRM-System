import ChartBlueIcon from "@assets/images/website/services/imagesservices/followupperformance/icons/chartblueicon";
import DateIconY from "@assets/images/website/services/imagesservices/followupperformance/icons/dateicony";
import IdeaIcon from "@assets/images/website/services/imagesservices/followupperformance/icons/ideaicon";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const CardsHeaderFollowUp = () => {
  const { t } = useTranslation('followUpPerformance');
  
  const cardData = [
    {
      id: 1,
      title: t('cards.items.0.title'),
      text: t('cards.items.0.text'),
      icon: <IdeaIcon />
    },
    {
      id: 2,
      title: t('cards.items.1.title'),
      text: t('cards.items.1.text'),
      icon: <DateIconY />
    },
    {
      id: 3,
      title: t('cards.items.2.title'),
      text: t('cards.items.2.text'),
      icon: <ChartBlueIcon />
    }
  ];
  return (
    <section
      data-aos="fade-up"
      className="cards-services-page pages-services padding-60-web"
    >
      {/* ===================== START CONTIANER ================= */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={true}
          newClassTitleSection={"center-items"}
          ishideText={false}
          textTitleHead={t('cards.subtitle')}
          titleWebSection={t('cards.title')}
        />
        {/* ==================== START ALL CARDS SERVICES =================== */}
        <div className="all-cards-services  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
          {cardData.map((card) => (
            <CardBoxOneShared
              key={card.id}
              functionCardBox={() => { }}
              iconHeaderBox={card.icon}
              titleContentCard={card.title}
              textContentCard={card.text}
            />
          ))}
        </div>
        {/* ==================== END ALL CARDS SERVICES =================== */}
      </ContainerMedia>
      {/* ===================== END CONTIANER ================= */}
    </section>
  );
};

export default CardsHeaderFollowUp;

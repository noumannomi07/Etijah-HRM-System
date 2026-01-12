import ChartBarOrder from "@assets/images/website/services/imagesservices/ordermanagementservices/icons/chartbarorder";
import RewardIcon from "@assets/images/website/services/imagesservices/ordermanagementservices/icons/rewardicon";
import UsersIconB from "@assets/images/website/services/imagesservices/payrollbenefitsmanagement/icons/usersiconb.svg";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const CardsHeaderOrderManagement = () => {
  const { t } = useTranslation('orderManagementServices');
  
  const cardData = [
    {
      id: 1,
      title: t('cards.items.0.title'),
      text: t('cards.items.0.text'),
      icon: <ChartBarOrder />
    },
    {
      id: 2,
      title: t('cards.items.1.title'),
      text: t('cards.items.1.text'),
      icon: <img src={UsersIconB} />
    },
    {
      id: 3,
      title: t('cards.items.2.title'),
      text: t('cards.items.2.text'),
      icon: <RewardIcon />
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

export default CardsHeaderOrderManagement;

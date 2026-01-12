import ChartBarIcon from "@assets/images/sidebaricons/chartbaricon.svg";
import CalcIcon from "@assets/images/website/services/imagesservices/payrollbenefitsmanagement/icons/calcicon.svg";
import FileIconB from "@assets/images/website/services/imagesservices/payrollbenefitsmanagement/icons/fileiconb.svg";
import UsersIconB from "@assets/images/website/services/imagesservices/payrollbenefitsmanagement/icons/usersiconb.svg";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const CardsHeaderPayrollBenefits = () => {
  const { t } = useTranslation('payrollBenefitsManagement');
  
  const cardData = [
    {
      id: 1,
      title: t('cards.items.0.title'),
      text: t('cards.items.0.text'),
      icon: <img src={ChartBarIcon} alt="chart" />
    },
    {
      id: 2,
      title: t('cards.items.1.title'),
      text: t('cards.items.1.text'),
      icon: <img src={CalcIcon} alt="calc" />
    },
    {
      id: 3,
      title: t('cards.items.2.title'),
      text: t('cards.items.2.text'),
      icon: <img src={UsersIconB} alt="users" />
    },
    {
      id: 4,
      title: t('cards.items.3.title'),
      text: t('cards.items.3.text'),
      icon: <img src={FileIconB} alt="file" />
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
        <div className="all-cards-services  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
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

export default CardsHeaderPayrollBenefits;

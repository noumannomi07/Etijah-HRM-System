import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import LogOutIcon from "@assets/images/website/services/logouticon.tsx";
import "./ServicesSection.css";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import MoneyArrowDown from "@assets/images/website/services/moneyarrowdown.tsx";
import DocumentTextIcon from "@assets/images/website/services/documenttexticon.tsx";
import UserCircleAddIcon from "@assets/images/website/services/usercircleaddicon.tsx";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import ButtonSendRequest from "@/Website/Shared/ButtonSendRequest/ButtonSendRequest";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
const ServicesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('homePage');

  const cardData = [
    {
      id: 1,
      title: t('services.cards.attendance.title'),
      text: t('services.cards.attendance.description'),
      icon: <LogOutIcon />,
      route: "attendance-departure-management-page"
    },
    {
      id: 2,
      title: t('services.cards.payroll.title'),
      text: t('services.cards.payroll.description'),
      icon: <MoneyArrowDown />,
      route: "payroll-benefits-management"
    },
    {
      id: 3,
      title: t('services.cards.orders.title'),
      text: t('services.cards.orders.description'),
      icon: <DocumentTextIcon />,
      route: "order-management-services"
    },
    {
      id: 4,
      title: t('services.cards.recruitment.title'),
      text: t('services.cards.recruitment.description'),
      icon: <UserCircleAddIcon />,
      route: "recruitment-management-services"
    }
  ];
  return (
    <section data-aos={"fade-up"} className={`services-section padding-60-web`}>
      {/* ===================== START CONTIANER ================= */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={false}
          textTitleHead={t('services.sectionTitle')}
          titleWebSection={t('services.sectionSubtitle')}
        />
        {/* ==================== START ALL CARDS SERVICES =================== */}
        <div className="all-cards-services grid-cards-2">
          {cardData.map((card) => (
            <CardBoxOneShared
              key={card.id}
              functionCardBox={() => {
                navigate(`/${card.route}`);
              }}
              iconHeaderBox={card.icon}
              titleContentCard={card.title}
              textContentCard={card.text}
            />
          ))}
        </div>
        {/* ==================== END ALL CARDS SERVICES =================== */}
        <ButtonSendRequest
          addNewClassButton={"mt-[35px] mx-auto"}
          isTextSendReuestNow={false}
          addNewTextButton={t('services.allServices')}
          isRoutePageSendRequest={false}
          newFunctionButtonSendRequest={() => {
            navigate(FullRoutes.Website.ServicesPage);
          }}
        />
      </ContainerMedia>
      {/* ===================== END CONTIANER ================= */}
    </section>
  );
};

export default ServicesSection;

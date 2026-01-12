import ChartArrowUpIcon from "@assets/images/website/services/chartarrowupicon";
import DocumentTextIcon from "@assets/images/website/services/documenttexticon";
import LogOutIcon from "@assets/images/website/services/logouticon";
import MoneyArrowDown from "@assets/images/website/services/moneyarrowdown";
import UserCircleAddIcon from "@assets/images/website/services/usercircleaddicon";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useNavigate } from "react-router-dom";
import "./CardsServicesPage.css";
import ZoomBgIcon from "@assets/images/website/services/zoombgicon";
import { useTranslation } from "react-i18next";
const CardsServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('services');

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
      title: t('services.cards.performance.title'),
      text: t('services.cards.performance.description'),
      icon: <ChartArrowUpIcon />,
      route: "follow-up-performance"
    },
    {
      id: 3,
      title: t('services.cards.payroll.title'),
      text: t('services.cards.payroll.description'),
      icon: <MoneyArrowDown />,
      route: "payroll-benefits-management"
    },
    {
      id: 4,
      title: t('services.cards.orders.title'),
      text: t('services.cards.orders.description'),
      icon: <DocumentTextIcon />,
      route: "order-management-services"
    },
    {
      id: 5,
      title: t('services.cards.payroll.title'),
      text: t('services.cards.payroll.description'),
      icon: <MoneyArrowDown />,
      route: "payroll-benefits-management"
    },
    // {
    //   id: 5,
    //   title: "حاسبة النطاقات",
    //   text: "تتبع حضور الموظفين والانصراف بشكل دقيق، مما يسهل إدارة الإجازات والغيابات وتقديم تقارير مفصلة للإدارة.",
    //   icon: <ZoomBgIcon />,
    //   route: "smart-range-calculator"

    // },
    {
      id: 6,
      title: t('services.cards.recruitment.title'),
      text: t('services.cards.recruitment.description'),
      icon: <UserCircleAddIcon />,
      route: "recruitment-management-services"

    }
  ];
  return (
    <section data-aos={"fade-up"} className="cards-services-page padding-60-web">
      {/* ===================== START CONTIANER ================= */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={"center-items"}
          ishideText={false}
          textTitleHead={t('services.sectionTitle')}
          titleWebSection={t('services.sectionSubtitle')}
        />
        {/* ==================== START ALL CARDS SERVICES =================== */}
        <div className="all-cards-services  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
          {cardData.map((card) => (
            <div
              className={`card-content-services h-full cursor-pointer`}
              key={card.id}
            >
              <CardBoxOneShared
                functionCardBox={() => {
                  navigate(`/${card.route}`);
                }}
                iconHeaderBox={card.icon}
                titleContentCard={card.title}
                textContentCard={card.text}
              />
            </div>
          ))}
        </div>
        {/* ==================== END ALL CARDS SERVICES =================== */}
      </ContainerMedia>
      {/* ===================== END CONTIANER ================= */}
    </section>
  );
};

export default CardsServicesPage;

import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxDetails from "@/Website/Shared/CardBoxDetails/CardBoxDetails";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";
import "./PartnerAllStages.css";

const PartnerAllStages = () => {
  const { t } = useTranslation('homePage');
  
  const arrayItems = [
    {
      id: 0,
      title: t('partnerStages.items.employeeDevelopment.title'),
      text: t('partnerStages.items.employeeDevelopment.description')
    },
    {
      id: 1,
      title: t('partnerStages.items.projectManagement.title'),
      text: t('partnerStages.items.projectManagement.description')
    },
    {
      id: 2,
      title: t('partnerStages.items.performanceManagement.title'),
      text: t('partnerStages.items.performanceManagement.description')
    },
    {
      id: 3,
      title: t('partnerStages.items.employeeExperience.title'),
      text: t('partnerStages.items.employeeExperience.description')
    },
    {
      id: 4,
      title: t('partnerStages.items.compensationManagement.title'),
      text: t('partnerStages.items.compensationManagement.description')
    },
    {
      id: 5,
      title: t('partnerStages.items.smartRecruitment.title'),
      text: t('partnerStages.items.smartRecruitment.description')
    }
  ];
  return (
    <div className="partner-all-stages padding-60-web">
      {/* ================= START CONTAINER ================== */}
      <ContainerMedia>
        {/* ================ START MAIN PARTNER INFO =============== */}
        <div className="main-partner-info grid-cards-2">
          <div className="header-partner-stages">
            <WebSectionTitle
              dataAos="fade-down"
              isTrueReverseCol={true}
              newClassTitleSection={"margin-initial"}
              ishideText={false}
              textTitleHead={t('partnerStages.sectionSubtitle')}
              titleWebSection={t('partnerStages.sectionTitle')}
            />
          </div>

          {/* ================== START ALL CARDS PARTNER STAGES ===================== */}
          <div data-aos={"fade-up"} className="all-cards-partner-stages">
            {arrayItems.map((item) => {
              return (
                <CardBoxDetails
                  key={item.id}
                  isNumberTop={false}
                  numberTop={""}
                  titleDetails={item.title}
                  textDetails={item.text}
                />
              );
            })}
          </div>
          {/* ================== END ALL CARDS PARTNER STAGES ===================== */}
        </div>
        {/* ================ END MAIN PARTNER INFO =============== */}
      </ContainerMedia>
      {/* ================= END CONTAINER ================== */}
    </div>
  );
};

export default PartnerAllStages;

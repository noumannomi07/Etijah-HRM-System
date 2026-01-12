import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxDetails from "@/Website/Shared/CardBoxDetails/CardBoxDetails";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const TheNumbersSpeak = () => {
  const { t } = useTranslation('homePage');
  
  const arrayItems = [
    {
      id: 0,
      num: "4.8%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description1')
    },
    {
      id: 1,
      num: "41.4%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description2')
    },
    {
      id: 2,
      num: "50%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description3')
    },
    {
      id: 3,
      num: "35%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description4')
    },
    {
      id: 4,
      num: "45%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description4')
    },
    {
      id: 5,
      num: "65%",
      title: t('numbers.statistics.startups.title'),
      text: t('numbers.statistics.startups.description4')
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
              textTitleHead={t('numbers.sectionSubtitle')}
              titleWebSection={t('numbers.sectionTitle')}
            />
          </div>

          {/* ================== START ALL CARDS PARTNER STAGES ===================== */}
          <div data-aos={"fade-up"} className="all-cards-partner-stages">
            {arrayItems.map((item) => {
              return (
                <CardBoxDetails
                  key={item.id}
                  isNumberTop={true}
                  numberTop={item.num}
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

export default TheNumbersSpeak;

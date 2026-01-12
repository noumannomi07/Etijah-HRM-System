import FileServIcon from "@assets/images/website/services/imagesservices/smartrangecalc/icons/fileservicon";
import UsersColorIcon from "@assets/images/website/services/imagesservices/smartrangecalc/icons/userscoloricon";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";

const CardsSmartRangeCalc = () => {
  const cardData = [
    {
      id: 1,
      title: "تحليل دقيق لنسبة السعودة",
      text: "تتيح لك الخدمة تحليل دقيق لنسبة السعودة في منشأتك، مما يساعدك على فهم وضعك الحالي في سوق العمل. ",
      icon: <UsersColorIcon />
    },

    {
      id: 2,
      title: "تقارير مرئية سهلة الفهم",
      text: "توفر لك الخدمة تقارير مرئية تساعدك في فهم البيانات بشكل أسرع.  مما يسهل عليك التعرف على المجالات التي تحتاج إلى تحسين والاحتفاء بالنجاحات الموجودة.",
      icon: <FileServIcon />
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
          textTitleHead={
            "إستكشف كيف يمكن لمتابعة الآداء أن تحفز الموظفين على الأداء العالي"
          }
          titleWebSection={"فوائد لا حصر لها"}
        />
        {/* ==================== START ALL CARDS SERVICES =================== */}
        <div className="all-cards-services  grid grid-cols-1 sm:grid-cols-2   gap-4">
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

export default CardsSmartRangeCalc;

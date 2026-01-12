import BannerShowDetails from "@/Website/Shared/BannerShowDetails/BannerShowDetails";
import img from "@assets/images/website/services/imagesservices/smartrangecalc/a01.png";
import img02 from "@assets/images/website/services/imagesservices/smartrangecalc/a02.png";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";

const BannerSmartRange = () => {
  const allCards = [
    {
      id: 1,
      isTrueBg: false,
      title: "إدخال بيانات سهل ومرن",
      text: "يمكن للمستخدمين إدخال بيانات المنشأة بسهولة إما عبر النظام مباشرة أو يدويًا. يتم إدخال النشاط الاقتصادي والنشاط الفرعي وعدد الموظفين السعوديين وغير السعوديين، مما يوفر لك المرونة في كيفية استخدام الخدمة.",
      image: img
    },
    {
      id: 2,
      isTrueBg: true,
      title: "تحليل النتائج بشكل فوري",
      text: "بعد إدخال البيانات، يقوم النظام بتحليل النتائج وتقديم مستوى نطاق المنشأة الحالي ونسبة السعودة بشكل دقيق. ستحصل على تقييم واضح لموقفك، مما يساعد في فهم مستوى التوطين بشكل أفضل.",
      image: img02
    }
  ];
  return (
    <div className="all-cards-banner-details-recruitment padding-60-web">
      <WebSectionTitle
        dataAos="fade-down"
        isTrueReverseCol={true}
        newClassTitleSection={"center-items"}
        ishideText={false}
        textTitleHead={
          "تقدم لك خدمة حاسبة النطاقات المتكاملة أداة فعالة ومبسطة لتحليل مستوى السعودة في منشأتك. "
        }
        titleWebSection={"إكتشف مستوى توطين منشأتك"}
      />
      <div>
        {allCards.map((item) => {
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

export default BannerSmartRange;

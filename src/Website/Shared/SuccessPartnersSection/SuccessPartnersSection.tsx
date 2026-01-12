import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import image_1 from "@assets/images/website/partners/a01.jpg";
import image_2 from "@assets/images/website/partners/a02.png";
import image_3 from "@assets/images/website/partners/a03.png";
import image_4 from "@assets/images/website/partners/a04.png";
import image_5 from "@assets/images/website/partners/a05.png";
import image_6 from "@assets/images/website/partners/a06.png";
import image_7 from "@assets/images/website/partners/a07.png";
import image_8 from "@assets/images/website/partners/a08.png";
import image_9 from "@assets/images/website/partners/a09.png";
import image_10 from "@assets/images/website/partners/a010.png";
import WebSectionTitle from "../WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const SuccessPartnersSection = () => {
  const { t } = useTranslation('homePage');
  
  const arrayCardsPartner = [
    { id: 0, image: image_1, alt: "مصرف الراجحى" },
    { id: 1, image: image_9, alt: "وزارة التعليم" },
    { id: 2, image: image_3, alt: "وزارة الصحة" },
    { id: 3, image: image_4, alt: "البنك" },
    { id: 4, image: image_5, alt: "siemens" },
    { id: 5, image: image_6, alt: "مصرف 1 الراجحى" },
    { id: 6, image: image_7, alt: "مصرف 2 الراجحى" },
    { id: 7, image: image_8, alt: "مصرف 3 الراجحى" },
    { id: 8, image: image_2, alt: "مصرف  4 الراجحى" },
    { id: 9, image: image_10, alt: "مصرف  4 الراجحى" },

    
  ];
  return (
    <div
      data-aos={"fade-up"}
      className="success-partners-sections padding-60-web"
    >
      {/* ====================== START CONTANINER ======================= */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={false}
          textTitleHead={t('successPartners.sectionTitle')}
          titleWebSection={t('successPartners.sectionSubtitle')}
        />
        {/* ==================== START ALL CARDS PARTNER ================= */}
        <div className="all-cards-partner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {arrayCardsPartner.map((item) => {
            return (
              <div
                className="card-partner-one border  border-lightColorWhite2 p-3 relative flex  items-center justify-center"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="object-cover lg:h-[70px]"
                  loading="lazy"
                  
                />
              </div>
            );
          })}
        </div>
        {/* ==================== END ALL CARDS PARTNER ================= */}
      </ContainerMedia>
      {/* ====================== END CONTANINER ======================= */}
    </div>
  );
};

export default SuccessPartnersSection;

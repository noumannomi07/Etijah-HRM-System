import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import FormContactUs from "./FormContactUs";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import imageContact from "@assets/images/website/contact/01.svg";
import { useTranslation } from "react-i18next";
const MainContactUs = () => {
  const { t } = useTranslation('contactUs');
  
  return (
    <div data-aos="fade-left" className="main-contact-info padding-60-web">
      {/* ====================== START CONTAINER ===================== */}
      <ContainerMedia>
        {/* ================== START ALL MIAN CONTACT INFO =================== */}
        <div className="all-main-contact-info grid-cards-2 gap-5">
          {/* ====================== START CONTENT RIGHT CONTACT =================== */}
          <div className="contact-right-content">
            <WebSectionTitle
              isTrueReverseCol={false}
              newClassTitleSection={
                "main-title-contact !text-start !items-start"
              }
              ishideText={false}
              textTitleHead={t('main.subtitle')}
              titleWebSection={t('main.title')}
            />
            <div className="image-bg-contact-main relative">
              <img
                src={imageContact}
                alt="image contact"
                className="w-full h-full object-cover rounded-[12px]"
                loading="lazy"
              />
            </div>
          </div>
          {/* ====================== END CONTENT RIGHT CONTACT =================== */}

          <FormContactUs />
        </div>
        {/* ================== END ALL MIAN CONTACT INFO =================== */}
      </ContainerMedia>
      {/* ====================== END CONTAINER ===================== */}
    </div>
  );
};

export default MainContactUs;

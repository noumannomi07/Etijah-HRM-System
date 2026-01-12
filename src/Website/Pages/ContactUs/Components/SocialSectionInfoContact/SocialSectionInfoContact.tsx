import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import "./SocialSectionInfoContact.css";
import CardsContactSocial from "./CardsContactSocial";
import { useTranslation } from "react-i18next";
const SocialSectionInfoContact = () => {
  const { t } = useTranslation('contactUs');
  
  return (
    <div
      data-aos="fade-up"
      className="social-section-cards-contact padding-60-web"
    >
      {/* ==================== START CONTAINER =================== */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={true}
          newClassTitleSection={"social-title-contact !items-center"}
          ishideText={false}
          textTitleHead={t('social.description')}
          titleWebSection={t('social.title')}
        />
        <CardsContactSocial />
      </ContainerMedia>
      {/* ==================== END CONTAINER =================== */}
    </div>
  );
};

export default SocialSectionInfoContact;

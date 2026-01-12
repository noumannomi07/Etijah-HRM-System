import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import "./HeaderContactUs.css";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import AllCardsContact from "./Components/AllCardsContact";
import { useTranslation } from "react-i18next";

const HeaderContactUs = () => {
  const { t } = useTranslation('contactUs');
  
  return (
    <div className="header-contactUs relative">
      <BannerBgWeb>
        <WebSectionTitle
          isTrueReverseCol={true}
          newClassTitleSection={"web-white-content !items-center"}
          ishideText={true}
          textTitleHead={""}
          titleWebSection={t('header.title')}
        />
        <div className="image-bg-contact" />

        <AllCardsContact />
      </BannerBgWeb>
    </div>
  );
};

export default HeaderContactUs;

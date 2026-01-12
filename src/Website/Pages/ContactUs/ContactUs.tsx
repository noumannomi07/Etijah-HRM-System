import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import HeaderContactUs from "./Components/HeaderContactUs/HeaderContactUs";
import MainContactUs from "./Components/MainContactUs/MainContactUs";
import SocialSectionInfoContact from "./Components/SocialSectionInfoContact/SocialSectionInfoContact";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation(['contactUs', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:contact.title')}
        description={t('seo:contact.description')}
        keywords={t('seo:contact.keywords')}
        type="website"
      />
      <div className="contactUs-page">
        <HeaderContactUs />
        <MainContactUs />
        <SocialSectionInfoContact />
      </div>
    </>
  );
};

export default ContactUs;

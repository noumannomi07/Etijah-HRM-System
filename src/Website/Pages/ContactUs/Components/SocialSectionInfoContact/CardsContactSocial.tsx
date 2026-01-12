import iconInsta from "@assets/images/website/contact/iconssocial/insta.svg";
import iconX from "@assets/images/website/contact/iconssocial/x.svg";
import iconFacebook from "@assets/images/website/contact/iconssocial/facebook.svg";
import CardContactUs from "../HeaderContactUs/Components/CardContactUs";
import { useTranslation } from "react-i18next";

const CardsContactSocial = () => {
  const { t } = useTranslation('contactUs');
  
  const dataContact = [
    {
      id: 0,
      hrefLink: "https://www.instagram.com/etijah.sa",
      icon: iconInsta,
      title: t('social.platforms.instagram')
    },
    {
      id: 1,
      hrefLink: "https://x.com/ETIJAH1",
      icon: iconX,
      title: t('social.platforms.x')
    },
    {
      id: 2,
      hrefLink: "https://www.facebook.com/etijah.sa",
      icon: iconFacebook,
      title: t('social.platforms.facebook')
    }
  ];
  return (
    <div className="all-cards-social-contact relative ">
      <div className="main-contact-social-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dataContact.map((item) => (
          <CardContactUs
            newClassCard={"card-social-one--1"}
            key={item.id}
            hrefLink={item.hrefLink}
            iconContact={item.icon}
            titleInfoContact={item.title}
            hideText={true}
            textInfoContact={""}
            hideArrow={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContactSocial;

import CardContactUs from "./CardContactUs";
import iconEmail from "@assets/images/website/contact/icons/gmail.svg";
import iconCall from "@assets/images/website/contact/icons/callus.svg";
import iconLocation from "@assets/images/website/contact/icons/location.svg";
import { useTranslation } from "react-i18next";

const AllCardsContact = () => {
  const { t } = useTranslation('contactUs');
  
  const dataContact = [
    {
      id: 0,
      hrefLink: "mailto:info@etijah.sa",
      icon: iconEmail,
      title: t('header.cards.email.title'),
      text: t('header.cards.email.value')
    },
    {
      id: 1,
      hrefLink: "tel:+966538180881",
      icon: iconCall,
      title: t('header.cards.phone.title'),
      text: t('header.cards.phone.value')
    },
    {
      id: 2,
      hrefLink: "https://www.google.com/maps?q=1234+Example+St,riyadh",
      icon: iconLocation,
      title: t('header.cards.location.title'),
      text: t('header.cards.location.value')
    }
  ];

  return (
    <div data-aos="fade-up" className="all-cards-contact relative z-[1001]">
      <div className="main-contact-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dataContact.map((item) => (
          <CardContactUs
            key={item.id}
            newClassCard={""}
            hrefLink={item.hrefLink}
            iconContact={item.icon}
            titleInfoContact={item.title}
            hideText={false}
            textInfoContact={item.text}
            hideArrow={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCardsContact;

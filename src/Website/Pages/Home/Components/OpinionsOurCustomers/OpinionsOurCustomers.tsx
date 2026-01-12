import { useState, useEffect } from "react";
import "./OpinionsOurCustomers.css";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CustomerCardOpinion from "./CustomerCardOpinion";
import { getCardsImages } from "./Data";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

const OpinionsOurCustomers = () => {
  const { t } = useTranslation('homePage');
  
  // Get cards data with translations
  const cardsImages = getCardsImages(t);
  
  // ADD ACTIVE CLASS TO CARDS
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cardsImages.length);
    }, 35000);

    return () => clearInterval(intervalId);
  }, [cardsImages.length]);

  return (
    <div data-aos={"fade-up"} className="opinion-customer-new padding-60-web">
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={false}
          textTitleHead={t('opinions.sectionTitle')}
          titleWebSection={t('opinions.sectionSubtitle')}
        />

        {/* ================= START ALL FEATURE UP ================= */}
        <div className="all-customer-up  relative">
          <div className="my-3 buttons-group-info flex">
            {cardsImages.map((image, index) => (
              <button
                key={image.id}
                className={`custom-button custom-button-top flex items-center gap-3 ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={image.imgUser}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt="image"
                  loading="lazy"
                />{" "}
                <div className="content-detials-user">
                  <h2 className="name-user text-font-dark text-[17px] text-start">
                    {" "}
                    {image.nameUser}
                  </h2>
                  <p className="title-job text-start text-font-dark text-darkColor_02 text-[14px]">
                    {" "}
                    {image.titleJob}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="data-filter-customer">
            {cardsImages.map((image, index) => (
              <CustomerCardOpinion
                key={index}
                newClassName={""}
                activeIndex={activeIndex}
                index={index}
                titleHeadReview={t('opinions.defaultReviewTitle')}
                textDetails={image.text}
                imgUserBottom={image.imgUser}
                altImageUserBottom={image.nameUser}
                nameUser={image.titleJob}
                titleJob={image.titleJob}
                hideImagFullScreen={false}
                imageUserFull={image.src}
                imageAltUserFull={image.alt}
              />
            ))}
          </div>
        </div>
        {/* ================= END ALL FEATURE UP ================= */}
      </ContainerMedia>
    </div>
  );
};

export default OpinionsOurCustomers;

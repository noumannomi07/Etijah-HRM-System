import AllCardsContentAboutApp from "./AllCardsContentAboutApp";
import imageApp from "@assets/images/new/01.png";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import React from "react";
import { useTranslation } from "react-i18next";
const CardsAboutApp = () => {
  const { t } = useTranslation('aboutApp');
  
  return (
    <div className="cards-about-app  padding-60-web">
      {/* ========================= START CONTAINER ================= */}
      <ContainerMedia>
        <WebSectionTitle
          dataAos="fade-down"
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={true}
          textTitleHead={""}
          titleWebSection={t('cards.sectionTitle')}
        />
        <div className="all-cards-about-app flex flex-col-reverse lg:grid grid-cols-1  lg:grid-cols-6 gap-5">
          {/* ================== START COL SPAN ================ */}
          <div data-aos="fade-left" className="col-span-1 lg:col-span-4">
            <AllCardsContentAboutApp />
          </div>
          {/* ================== END COL SPAN ================ */}

          {/* ================== START COL SPAN ================ */}
          <div data-aos="fade-right" className="col-span-1 lg:col-span-2">
            {/* ================== START IMAGE ABOUT APP ================= relative after:content p-[10px] after:absolute after:z-[-1] after:bg-primaryLightColor_03 after:w-full after:h-full after:top-0 after:left-0  after:rounded-[12px] */}
            <div className="image-about-app h-full md:h-[450px] lg:h-full ">
              {/**after:absolute  after:bg-darkLightColor_03 after:w-full after:h-full after:top-0 after:left-0  after:rounded-[12px] */}
              <div className="h-full relative after:content  ">
                <img
                  src={imageApp}
                  alt="image about app"
                  className="w-full h-full object-cover rounded-[12px]"
                  loading="lazy"
                />
              </div>
            </div>
            {/* ================== END IMAGE ABOUT APP ================= */}
          </div>
          {/* ================== END COL SPAN ================ */}
        </div>
      </ContainerMedia>
      {/* ========================= END CONTAINER ================= */}
    </div>
  );
};

export default CardsAboutApp;

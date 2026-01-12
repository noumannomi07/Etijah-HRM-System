import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import AccordionFaq from "@/Website/Shared/AccordionFaq/AccordionFaq";
import { accordionData } from "./accordionData";
import React from "react";
import { Faq } from "@/Website/Pages/BlogsEtijah/BlogType";
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";
import { useTranslation } from "react-i18next";

const AllFaqContent = ({ faqs }: { faqs: Faq }) => {
  const { t } = useTranslation('faq');
  
  return (
    <div data-aos="fade-up" className="all-faq-content-page padding-60-web">
      {/* ================== START CONTAINER ==================== */}
      <ContainerMedia>
        {/* ==================== START MAIN FAQ PAGE =============== */}
        {faqs && (
          <div className="main-faq-page grid-cards-2 gap-[25px]">
            {faqs.map((card) => (
              <div key={card.id}>
              <AccordionFaq
                hideTitleHeaderAccordion={false}
                titleCardAccordion={card.title}
                items={card.faqs}
              />
            </div>
          ))}
          </div>
        )}

        {!faqs.length && (
          <NotDataFound />
        )}

        {/* ==================== END MAIN FAQ PAGE =============== */}
      </ContainerMedia>
      {/* ================== END CONTAINER ==================== */}
    </div>
  );
};

export default AllFaqContent;

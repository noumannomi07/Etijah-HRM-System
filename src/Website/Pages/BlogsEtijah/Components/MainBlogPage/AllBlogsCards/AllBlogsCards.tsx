import React from "react";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import "./AllBlogsCards.css";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import SearchInputFaq from "@/Website/Pages/FaqEtijah/Components/HeaderFaq/SearchInputFaq";
import MainAllCardsBlog from "./MainAllCardsBlog/MainAllCardsBlog";
import { useTranslation } from "react-i18next";
const AllBlogsCards = () => {
  const { t } = useTranslation('blogs');
  
  return (
    <div data-aos="fade-up" className="all-cards-blogs padding-60-web">
      {/* ================== START CONTAINER ===================== */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={true}
          newClassTitleSection={"web-blog-section-title"}
          ishideText={false}
          textTitleHead={t('mainPage.content.sectionDescription')}
          titleWebSection={t('mainPage.content.sectionTitle')}
        />

        <div className="mt-5">
          <SearchInputFaq  />
        </div>
        {/* ================= START INFO CARDS BLOGS =================== */}
        <MainAllCardsBlog />
        {/* ================= END INFO CARDS BLOGS =================== */}
      </ContainerMedia>
      {/* ================== END CONTAINER ===================== */}
    </div>
  );
};

export default AllBlogsCards;

import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import "./HeaderFaq.css"
import SearchInputFaq from "./SearchInputFaq";
import React from "react";
import { useTranslation } from "react-i18next";

const HeaderFaq = ({ search, handleSearch }: { search: string, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const { t } = useTranslation('faq');
  
  return (
    <div className="header-faq-content">
      <BannerBgWeb>
        {/* =================== START ALL CONTENT PACKAGES =================== */}
        <div className="all-header-faq">
          <InfoSection
          dataAos="fade-left"
            newClassInfoSection={"center-content-section-info"}
            title={t('header.title')}
            description={t('header.description')}
            hideButtonSendRequest={true}
          >
            <SearchInputFaq search={search} handleSearch={handleSearch} />
            </InfoSection>
        </div>
        {/* =================== END ALL CONTENT PACKAGES =================== */}
      </BannerBgWeb>
    </div>
  );
};

export default HeaderFaq;

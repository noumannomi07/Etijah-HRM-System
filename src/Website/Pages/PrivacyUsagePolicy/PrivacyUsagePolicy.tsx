import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import CardPrivacy from "./Components/CardPrivacy";
import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import { getPrivacyData } from "./Data/DataPrivacy";
import { useTranslation } from "react-i18next";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

const PrivacyUsagePolicy = () => {
  const { t } = useTranslation(['privacyPolicy', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:privacyPolicy.title')}
        description={t('seo:privacyPolicy.description')}
        keywords={t('seo:privacyPolicy.keywords')}
        type="website"
      />
      <div className="privacy-usage-policy">
      <BannerBgWeb>
        <div data-aos="fade-up" className="header-privacy text-center">
          <h2 className="title-top text-font-white text-[30px] font-[700]">
            {t('header.title')}
          </h2>
        </div>
      </BannerBgWeb>

      {/* ================= START CONTIANER ================== */}

      <ContainerMedia>
        {/* =============== START ALL CARDS PRIVACY ============== */}
        <div data-aos="fade-up" className="all-cards-privacy  padding-60-web">
          {/* ================== START MAIN CARDS PRIVACY =============== */}
          <div className="main-cards-privacy">
            {getPrivacyData(t).map((item, index) => (
              <CardPrivacy
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
          {/* ================== END MAIN CARDS PRIVACY =============== */}
        </div>
        {/* =============== END ALL CARDS PRIVACY ============== */}
      </ContainerMedia>
      {/* ================= END CONTIANER ================== */}
      </div>
    </>
  );
};

export default PrivacyUsagePolicy;

import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import AppsWeb from "@/Website/Shared/AppsWeb/AppsWeb";
import { useTranslation } from "react-i18next";

const SectionDownloadApp = () => {
  const { t } = useTranslation('aboutApp');
  
  return (
    <div data-aos="fade-down" className="section-download-app padding-60-web ">
      {/* ================ START CONTAINER ================ */}
      <ContainerMedia>
        {/* =================== START ALL CONTENT SECTION APP =================== */}
        <div className="all-content-section-app flex-items-center flex-col text-center gap-3">
          <h2 className="title-app text-font-dark text-[20px] sm:text-[27px]">
            {t('download.title')}
          </h2>
          <p className="text-app text-font-dark text-[14px] sm:text-[16px]">
            {t('download.description')}
          </p>

          <AppsWeb />
        </div>
        {/* =================== END ALL CONTENT SECTION APP =================== */}
      </ContainerMedia>
      {/* ================ END CONTAINER ================ */}
    </div>
  );
};

export default SectionDownloadApp;

import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import "./CoreValuesEtijah.css";
import CardsCoreValuesEtijah from "./CardsCoreValuesEtijah";
import { useTranslation } from "react-i18next";

const CoreValuesEtijah = () => {
  const { t } = useTranslation('aboutUs');
  
  return (
    <div data-aos={"fade-up"} className="core-value-etijah padding-60-web">
      {/* ================== START CONTAINER =================== */}
      <ContainerMedia>
        {/* ================= START HEADER TITLE ================= */}
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={false}
          textTitleHead={t('coreValues.sectionTitle')}
          titleWebSection={t('coreValues.sectionSubtitle')}
        />
        {/* ================= END HEADER TITLE ================= */}
        <CardsCoreValuesEtijah />
      </ContainerMedia>
      {/* ================== END CONTAINER =================== */}
    </div>
  );
};

export default CoreValuesEtijah;

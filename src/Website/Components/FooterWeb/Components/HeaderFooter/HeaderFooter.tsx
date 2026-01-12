import ButtonSendRequest from "@/Website/Shared/ButtonSendRequest/ButtonSendRequest";
import { useTranslation } from "react-i18next";

const HeaderFooter = () => {
  const { t } = useTranslation('footer');
  
  return (
    <div className="header-footer flex-between-wrap">
      <h2 className="title text-font-white text-[20px] sm:text-[25px]">
        {t('header.title')}
      </h2>
      <ButtonSendRequest
        addNewClassButton={""}
        isTextSendReuestNow={true}
        addNewTextButton={""}
        isRoutePageSendRequest={true}
  
      />
    </div>
  );
};

export default HeaderFooter;

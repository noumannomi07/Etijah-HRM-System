import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import ButtonSendRequest from "@/Website/Shared/ButtonSendRequest/ButtonSendRequest";
import UserDetailsAnimation from "@/Website/Shared/UserDetailsAnimation/UserDetailsAnimation";
import imageUser01 from "@assets/images/new/user01.png";
import imageUser02 from "@assets/images/new/user02.png";
import { useTranslation } from "react-i18next";

import "./HeaderServicesPage.css";
const HeaderServicesPage = () => {
  const { t } = useTranslation('services');
  
  return (
    <div className="header-services-page">
      <BannerBgWeb>
        {/* ========== START INFO CONTENT ========= */}
        <div
          data-aos={"fade-up"}
          className="info-content-header center-content-banner"
        >
          <h2 className="title">{t('header.title')}</h2>
          <p className="text">
            {t('header.description')}
          </p>
          <div className="buttons-header mt-4 flex  items-center  gap-5 ">
            <ButtonSendRequest
              addNewClassButton={""}
              isTextSendReuestNow={true}
              addNewTextButton={""}
              isRoutePageSendRequest={true}

            />
          </div>
        </div>
        {/* ========== END INFO CONTENT ========= */}

        {/* ================== START USER DETAILS ANIMATION =================== */}
        <UserDetailsAnimation
          dataAos="fade-right"
          isRightTrue={false}
          imageUser={imageUser01}
          isLeftShareIcon={true}
          isRightShareIcon={false}
          isBgBlueContent={false}
          userName={t('header.userNames.user1')}
          titleJob={t('header.userTitles.user1')}
        />
        <UserDetailsAnimation
          dataAos="fade-left"
          isRightTrue={true}
          imageUser={imageUser02}
          isLeftShareIcon={false}
          isRightShareIcon={true}
          isBgBlueContent={false}
          userName={t('header.userNames.user2')}
          titleJob={t('header.userTitles.user2')}
        />
        {/* ================== END USER DETAILS ANIMATION =================== */}
      </BannerBgWeb>
    </div>
  );
};

export default HeaderServicesPage;

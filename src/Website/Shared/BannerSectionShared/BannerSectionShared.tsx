import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import "./BannerSectionShared.css";
import ButtonSendRequest from "../ButtonSendRequest/ButtonSendRequest";
import { useTranslation } from "react-i18next";

import UserDetailsAnimation from "../UserDetailsAnimation/UserDetailsAnimation";
import imageUser01 from "@assets/images/new/03.png";
import imageUser02 from "@assets/images/new/04.png";

const BannerSectionShared = () => {
  const { t } = useTranslation('homePage');

  return (
    <div className="banner-section-shared margin-60-web">
      {/* ======================= START CONTIANER ====================== */}
      <ContainerMedia>
        {/* ============== START MAIN INFO BANNER SHARED =============== */}
        <div className="main-info-banner-shared relative overflow-hidden">
          <div className="circle-rounded-banner">
            <div className="circle-01 circle-001" />
            <div className="circle-01 circle-002" />
            <div className="circle-01 circle-003" />
          </div>
          {/* ================= START CONTENT INFO BANNER SHARED ================== */}
          <div
            data-aos={"fade-up"}
            className="content-info-banner-shared relative flex justify-center items-center flex-col gap-5 text-center"
          >
            <h2 className="title-banner-shared text-font-white text-[25px] sm:text-[45px]">
              {t('bannerSection.title')}
            </h2>
            <p className="text-banner-shared text-font-white text-[13px] sm:text-[17px] max-w-full md:max-w-[600px] leading-[1.8]">
              {t('bannerSection.subtitle')}
            </p>

            <ButtonSendRequest
              addNewClassButton={""}
              isTextSendReuestNow={true}
              addNewTextButton={""}
              isRoutePageSendRequest={true}

            />

            {/* ================== START USER DETAILS ANIMATION =================== */}
            <div className="user-shared-one">
              <UserDetailsAnimation
                isRightTrue={false}
                imageUser={imageUser01}
                isLeftShareIcon={true}
                isRightShareIcon={false}
                isBgBlueContent={false}
                userName={t('bannerSection.userNames.user1')}
                titleJob={t('bannerSection.userTitles.user1')}
              />
            </div>
            <div className="user-shared-two">
              <UserDetailsAnimation
                isRightTrue={true}
                imageUser={imageUser02}
                isLeftShareIcon={false}
                isRightShareIcon={true}
                isBgBlueContent={false}
                userName={t('bannerSection.userNames.user2')}
                titleJob={t('bannerSection.userTitles.user2')}
              />
            </div>

            {/* <div className="user-shared-two">
            
            <UserDetailsAnimation
              isRightTrue={true}
              imageUser={imageUser02}
              isLeftShareIcon={false}
              isRightShareIcon={true}
              isBgBlueContent={false}
              userName={t('bannerSection.userNames.user2')}
              titleJob={t('bannerSection.userTitles.user2')}
            />
            </div> */}

            {/* ================== END USER DETAILS ANIMATION =================== */}
          </div>
          {/* ================= END CONTENT INFO BANNER SHARED ================== */}
        </div>
        {/* ============== END MAIN INFO BANNER SHARED =============== */}
      </ContainerMedia>
      {/* ======================= END CONTIANER ====================== */}
    </div>
  );
};

export default BannerSectionShared;

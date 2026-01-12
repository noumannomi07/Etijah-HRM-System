import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import image from "@assets/images/website/main/01.png";
import AppsWeb from "@/Website/Shared/AppsWeb/AppsWeb";
import ButtonSendRequest from "@/Website/Shared/ButtonSendRequest/ButtonSendRequest";
import UserDetailsAnimation from "@/Website/Shared/UserDetailsAnimation/UserDetailsAnimation";

import imageUser01 from "@assets/images/new/user01.png";
import imageUser02 from "@assets/images/new/user02.png";
import { useTranslation } from "react-i18next";

import "./AboutEtijah.css";
const AboutEtijah = () => {
  const { t } = useTranslation('homePage');
  
  return (
    <div data-aos={"fade-up"} className="about-etijah bg-whiteColor_02  pt-[60px] pb-[45px] relative">
      <div className="bg-gradient-banner after:content after:absolute after:w-full after:h-[50%] after:bg-custom-gradient-2 after:bottom-0 after:left-0"></div>
      {/* ======================= START CONTAINER =================== */}
      <ContainerMedia>
        {/* ================== START USER DETAILS ANIMATION =================== */}
        <UserDetailsAnimation
          isRightTrue={false}
          imageUser={imageUser01}
          isLeftShareIcon={true}
          isRightShareIcon={false}
          isBgBlueContent={true}
          userName={t('header.userNames.user1')}
          titleJob={t('header.userTitles.user1')}
        />
        <UserDetailsAnimation
          isRightTrue={true}
          imageUser={imageUser02}
          isLeftShareIcon={false}
          isRightShareIcon={true}
          isBgBlueContent={true}
          userName={t('header.userNames.user2')}
          titleJob={t('header.userTitles.user2')}
        />
        {/* ================== END USER DETAILS ANIMATION =================== */}
        <div className="about-etijah-header flex flex-col justify-center items-center gap-3 mb-[50px]">
          <WebSectionTitle
            isTrueReverseCol={false}
            newClassTitleSection={"!m-0"}
            ishideText={false}
            textTitleHead={t('about.sectionTitle')}
            titleWebSection={t('about.sectionSubtitle')}
          />
          <ButtonSendRequest
            addNewClassButton={""}
            isTextSendReuestNow={false}
            addNewTextButton={t('about.exploreMore')}
            isRouteSendRequest={false}

          />
        </div>
        {/* ================= START MAIN CONETN INFO ================= */}
        <div className="main-content-info-about relative   ">
          {/* ================ STAER IMAGE ABOUT APP ================= */}
          <div className="main-image-app relative overflow-hidden">
            <div className="image-about-app  relative top-[15px]">
              <img
                src={image}
                alt="about app"
                className="image-about-app-src w-[50%]  m-auto h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* ================ END IMAGE ABOUT APP ================= */}
          <div className="main-apps absolute bottom-[-15px] left-1/2 -translate-x-1/2 ">
            <AppsWeb />
          </div>
        </div>
        {/* ================= END MAIN CONETN INFO ================= */}
      </ContainerMedia>
      {/* ======================= END CONTAINER =================== */}
    </div>
  );
};

export default AboutEtijah;

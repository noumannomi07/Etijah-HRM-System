import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import image from "@assets/images/website/aboutapp/01.png";
import UserDetailsAnimation from "@/Website/Shared/UserDetailsAnimation/UserDetailsAnimation";
import imageUser01 from "@assets/images/new/06.png";
import imageUser02 from "@assets/images/new/05.png";
import { useTranslation } from "react-i18next";

const ContentAboutApp = () => {
  const { t } = useTranslation('aboutApp');
  
  return (
    <InfoSection
      dataAos="fade-up"
      newClassInfoSection={"center-content-section-info"}
      title={t('header.title')}
      description={t('header.description')}
      hideButtonSendRequest={false}
    >
      {/* ================== START USER DETAILS ANIMATION =================== */}

      <UserDetailsAnimation
        dataAos="fade-right"
        isRightTrue={false}
        imageUser={imageUser01}
        isLeftShareIcon={false}
        isRightShareIcon={false}
        isBgBlueContent={false}
        userName={""}
        titleJob={""}
      />

      <UserDetailsAnimation
        dataAos="fade-left"
        isRightTrue={true}
        imageUser={imageUser02}
        isLeftShareIcon={false}
        isRightShareIcon={false}
        isBgBlueContent={false}
        userName={""}
        titleJob={""}
      />
      {/* ================== END USER DETAILS ANIMATION =================== */}
      {/* ==================== START IMAGES HEADER ABOUT ================= */}
      <div className="image-header-about-app mt-[0px] w-full flex-items-center transform translate-y-[51px]">
        <img
          data-aos="fade-up"
          src={image}
          alt="image app"
          className="w-full md:w-[650px] h-full object-cover"
          loading="lazy"
        />
      </div>
      {/* ==================== END IMAGES HEADER ABOUT ================= */}
    </InfoSection>
  );
};

export default ContentAboutApp;

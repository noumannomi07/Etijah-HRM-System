import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import image1 from "@assets/images/new/about/01.svg";
import image2 from "@assets/images/new/about/02.svg";
import image3 from "@assets/images/new/about/03.svg";
import image4 from "@assets/images/new/about/04.svg";
import { useTranslation } from "react-i18next";

const InfoContentAbout = () => {
  const { t } = useTranslation('aboutUs');
  
  const images = [
    { id: 0, image: image1 },
    { id: 1, image: image2 },
    { id: 2, image: image3 },
    { id: 3, image: image4 }
  ];
  return (
    <div data-aos={"fade-up"}>
      <InfoSection
        newClassInfoSection={"center-content-section-info"}
        title={t('header.title')}
        description={t('header.description')}
        hideButtonSendRequest={false}
      >
        {/* ==================== START IMAGES HEADER ABOUT ================= */}
        <div className="images-header-about grid  grid-cols-2 sm:grid-cols-4 gap-[15px] mt-[60px] w-full">
          {images.map((item) => {
            return (
              <div
                className="image-about-one relative after:content after:absolute after:w-full after:h-full after:bg-black after:opacity-30 after:top-0 after:left-0 after:rounded-[12px] after:hidden"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={`iamge ${item.id}`}
                  className="h-full w-full object-cover rounded-[12px]"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        {/* ==================== END IMAGES HEADER ABOUT ================= */}
      </InfoSection>
    </div>
  );
};

export default InfoContentAbout;

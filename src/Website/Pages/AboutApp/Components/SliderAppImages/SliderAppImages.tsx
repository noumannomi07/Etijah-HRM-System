import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import img1 from "@assets/images/website/aboutapp/sliderapp/1.png";
import img2 from "@assets/images/website/aboutapp/sliderapp/2.png";
import img3 from "@assets/images/website/aboutapp/sliderapp/3.png";
import img4 from "@assets/images/website/aboutapp/sliderapp/4.png";
import img5 from "@assets/images/website/aboutapp/sliderapp/5.png";
import img6 from "@assets/images/website/aboutapp/sliderapp/6.png";
import img7 from "@assets/images/website/aboutapp/sliderapp/7.png";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";
const SliderAppImages = () => {
  const { t } = useTranslation('aboutApp');
  
  const imagesApp = [
    { id: 0, image: img1 },
    { id: 1, image: img2 },
    { id: 2, image: img3 },
    { id: 3, image: img4 },
    { id: 4, image: img5 },
    { id: 5, image: img6 },
    { id: 6, image: img7 }
  ];
  return (
    <div data-aos="fade-up" className="slider-app-images padding-60-web slider-padding">
      {/* =================== START CONTAINER ================== */}
      <ContainerMedia>
        <WebSectionTitle
          isTrueReverseCol={false}
          newClassTitleSection={""}
          ishideText={true}
          textTitleHead={""}
          titleWebSection={t('slider.sectionTitle')}
        />
        {/* =================== START SLIDER IMAGES ================ */}
        <Swiper
          spaceBetween={15}
          slidesPerView={5}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: { slidesPerView: 1.5, centeredSlides: true },
            450: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
          }}
          loop={true}
        >
          {imagesApp.map((itemImage) => {
            return (

              <SwiperSlide key={itemImage.id}>
                <div className="image-app-src" key={itemImage.id}>
                  <img
                    src={itemImage.image}
                    className="w-full h-full object-cover"
                    alt={`iamge ${itemImage.id}`}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>

            );
          })}
        </Swiper>
        {/* =================== END SLIDER IMAGES ================ */}
      </ContainerMedia>
      {/* =================== END CONTAINER ================== */}
    </div>
  );
};

export default SliderAppImages;

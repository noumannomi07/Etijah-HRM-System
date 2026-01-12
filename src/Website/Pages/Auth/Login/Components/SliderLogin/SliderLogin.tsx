
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./SliderLogin.css";
import { sliderDataItems } from "./images";
import { useTranslation } from "react-i18next";
const SliderLogin = () => {
  const { t } = useTranslation('login');
  
  // Create translated slider data
  const translatedSliderData = [
    {
      id: 0,
      isTrueBg: false,
      image: sliderDataItems[0].image,
      title: t('slider.features.performanceTracking.title'),
      text: t('slider.features.performanceTracking.description')
    },
    {
      id: 1,
      isTrueBg: true,
      image: sliderDataItems[1].image,
      title: t('slider.features.payrollManagement.title'),
      text: t('slider.features.payrollManagement.description')
    },
    {
      id: 2,
      isTrueBg: false,
      image: sliderDataItems[2].image,
      title: t('slider.features.taskManagement.title'),
      text: t('slider.features.taskManagement.description')
    },
    {
      id: 3,
      isTrueBg: true,
      image: sliderDataItems[3].image,
      title: t('slider.features.orderManagement.title'),
      text: t('slider.features.orderManagement.description')
    },
    {
      id: 4,
      isTrueBg: false,
      image: sliderDataItems[4].image,
      title: t('slider.features.attendanceTracking.title'),
      text: t('slider.features.attendanceTracking.description')
    }
  ];
  
  return (
    <div className="slider-content-login relative z-1 md:pr-[25px] xl:pr-[50px]">
      <div className="swiper-container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false
          }}
        >
          {translatedSliderData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="swiper-slide-content flex items-center flex-col gap-[4rem]">
                  <div className="swiper-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="swiper-text">
                    <h2 className="text-font-white text-[20px] mb-3">
                      {item.title}
                    </h2>
                    <p className="text-font-white mb-3">{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderLogin;

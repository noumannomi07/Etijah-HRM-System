import CustomerCardOpinion from "@/Website/Pages/Home/Components/OpinionsOurCustomers/CustomerCardOpinion";
import { getCardsImages } from "@/Website/Pages/Home/Components/OpinionsOurCustomers/Data";
import "./CardsSectionCustomerOpinions.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const CardsSectionCustomerOpinions = () => {
  const { t } = useTranslation('homePage');
  const cardsImages = getCardsImages(t);
  
  return (
    <div data-aos={"fade-up"} className="main-cards-section-customer-opinions">
      <Swiper
        loop={true}
        grabCursor={true}
        watchOverflow={true}
        watchSlidesProgress={true}
        preventInteractionOnTransition={true}
        slidesPerView={1}
        spaceBetween={15}
        autoplay={{
          delay: 500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Pagination]}
        className="mySwiper-v"
      >
        {cardsImages.map((image) => (
          <SwiperSlide key={image.id}>
            <CustomerCardOpinion
              newClassName={"card-section-cutomer-opinion"}
              activeIndex={Number()}
              index={Number()}
              titleHeadReview={t('opinions.defaultReviewTitle')}
              textDetails={
          image.text
              }
              imgUserBottom={image.imgUser}
              altImageUserBottom={image.nameUser}
              nameUser={image.titleJob}
              titleJob={image.titleJob}
              hideImagFullScreen={true}
              imageUserFull={""}
              imageAltUserFull={""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardsSectionCustomerOpinions;

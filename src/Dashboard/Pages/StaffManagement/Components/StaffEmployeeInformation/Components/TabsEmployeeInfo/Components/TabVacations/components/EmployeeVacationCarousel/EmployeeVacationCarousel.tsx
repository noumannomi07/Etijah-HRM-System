import React, { useCallback, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import "./EmployeeVacationCarousel.css";
import CircularProgress from "@/Dashboard/Components/CircularProgress";
import VacationBalanceDetails from "./VacationBalanceDetails";
import EmployeeVacationInfo from "./EmployeeVacationInfo";
import { VacationType } from "@/Dashboard/Pages/types";
import { useLanguage } from "@/Website/Shared/LanguagesDropMenu/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
interface EmployeeVacationCarouselProps {
  vacationTypes: VacationType[];
  isLoading?: boolean;
}

const EmployeeVacationCarousel: React.FC<EmployeeVacationCarouselProps> = ({
  vacationTypes = [],
  isLoading = false
}) => {
  const { selectedLang } = useLanguage();

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  // Color selection based on vacation type
  const getCircleColor = useCallback((type: string): string => {
    switch (type?.toLowerCase()) {
      // return rendom color

      case "sick":
        return "#333";
      case "hajj":
        return "#4a90e2";
      case "unpaid":
        return "#d1b3ff";
      default:
        return "#ccc222";
    }
  }, []);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // Calculate percentage with better edge case handling
  const calculatePercentage = useCallback(
    (used?: number, total?: number): number => {
      if (typeof used !== "number" || typeof total !== "number" || total === 0)
        return 0;
      return Math.min((used / total) * 100, 100);
    },
    []
  );

  const renderCarouselContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor"></div>
        </div>
      );
    }

    if (vacationTypes.length === 0) {
      return (
        <div className="text-center text-font-dark py-8">
          لا يوجد طلبات إجازة
        </div>
      );
    }

    return (
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1.5, centeredSlides: true },
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 3 }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onInit={(swiper) => {
            // Re-assign after DOM refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {vacationTypes.map((vacationType, index) => {
            const { days_calculated = {} } = vacationType;
            const takenDays = days_calculated.taken_days ?? 0;
            const totalDays = days_calculated.real_days ?? 0;
            const leftDays = days_calculated.left_days ?? 0;

            return (
              <SwiperSlide
                key={vacationType.id || index}
                className="leave-balance-item"
              >
                <div className="leave-balance-card">
                  <div className="leave-balance-chart">
                    <CircularProgress
                      percentage={calculatePercentage(takenDays, totalDays)}
                      progressColor={getCircleColor(vacationType.ar_title)}
                      backgroundColor="#e0e0e0"
                      size={150}
                      strokeWidth={15}
                      className="leave-chart"
                    >
                      <VacationBalanceDetails
                        availableDays={leftDays}
                        className="circle-content"
                      />
                    </CircularProgress>
                    <div className="leave-usage">
                      <span>{`المستخدمة ${takenDays} من ${totalDays} `}</span>
                      <br />
                      <div className="flex items-center justify-center gap-1 w-full">
                        <span className="text-center">
                          {vacationType.title} -{" "}
                          {vacationType.paid > 0
                            ? "مدفوعة بنسبة " + vacationType.paid_percent + "%"
                            : "غير مدفوعة"}
                        </span>
                        <div className="group relative inline-flex items-center">
                          <span className="cursor-help text-xs text-gray-500 hover:text-primary-600">
                            !
                          </span>
                          <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-1/2 transform -translate-x-1/2 top-full mt-1 bg-white text-gray-800 text-sm rounded-md p-3 shadow-lg border border-gray-200 w-48 z-10 transition-all duration-200 ease-in-out">
                            <div className="relative">
                              <div className="absolute w-3 h-3 bg-white transform rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-gray-200"></div>
                              {vacationType.content || "تفاصيل الإجازة"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <EmployeeVacationInfo vacationType={vacationType} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          ref={prevRef}
          className="custom-swiper-button-prev absolute top-1/2 left-0 md:left-[-40px] transform -translate-y-1/2 z-10 cursor-pointer"
        >
          <button className="w-[40px] h-[40px] border border-[#e2e2e2] bg-white text-primaryColor rounded-full transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>

        <div
          ref={nextRef}
          className="custom-swiper-button-next absolute top-1/2 right-0 md:right-[-40px] transform -translate-y-1/2 z-10 cursor-pointer"
        >
          <button className="w-[40px] h-[40px] border border-[#e2e2e2] bg-white text-primaryColor rounded-full transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="leave-balance-container md:px-[40px]">
      {!isLoading && vacationTypes.length > 0 && (
        <div className="leave-balance-header">
          <h2 className="leave-balance-title ltr:pl-[10px] rtl:pr-[10px]">
            {" "}
            إدارة الإجازات{" "}
          </h2>
        </div>
      )}
      {renderCarouselContent()}
    </div>
  );
};

export default EmployeeVacationCarousel;

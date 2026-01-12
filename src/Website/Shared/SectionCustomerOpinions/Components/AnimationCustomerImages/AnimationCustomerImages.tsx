

import { useEffect, useRef } from 'react';
import image from "@assets/images/new/customer/cl1.png";
import image2 from "@assets/images/new/customer/cl2.png";
import image3 from "@assets/images/new/customer/cl3.png";
import image4 from "@assets/images/new/customer/cl4.png";
import "./AnimationCustomerImages.css";
import WebSectionTitle from '@/Website/Shared/WebSectionTitle/WebSectionTitle';
import { useTranslation } from "react-i18next";

const AnimationCustomerImages = () => {
  const { t } = useTranslation('homePage');
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((el) => {
        if (isElementInViewport(el)) {
          el.classList.add('now-in-view');
        } else {
          el.classList.remove('now-in-view');
        }
      });
    };



    // TO SHOW VIEWPORT OF PAGE SCROLL
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
      );
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const images = [image, image2, image3, image4];
  return (
    <>
      {/* ========== START ALL IMAGES TEAM ======== */}
      <div className="all-images-team mt-5 mt-lg-0">
        {/* ======= START ABOUT LIST IMAGE ========== */}
        <ul className="about-images-team">
          {[...Array(5)].map((_, index) => (
            <li
              key={`team-${index + 1}`}
              ref={(el) => (elementsRef.current[index] = el)}
            >
              {index !== 3 ? (
                <div className="image-team animation-bg-plus">
                   <img
                    className="image-team-one"
                    src={images[index > 3 ? index - 1 : index]} // ✅ استخدم الصورة حسب الفهرس
                    alt={`image team ${index + 1}`}
                    loading="lazy"
                  />

                </div>
              ) : (
                <WebSectionTitle
                  isTrueReverseCol={false}
                  newClassTitleSection={"!m-0"}
                  ishideText={false}
                  textTitleHead={t('opinions.animationSection.title')}
                  titleWebSection={t('opinions.animationSection.subtitle')}
                />
              )}
            </li>
          ))}
        </ul>
        {/* ======= END ABOUT LIST IMAGE ========== */}
      </div>
      {/* ========== END ALL IMAGES TEAM ========== */}
    </>
  );
};

export default AnimationCustomerImages;

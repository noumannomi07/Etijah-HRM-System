import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useEffect, useState } from "react";
import image1 from "@assets/images/website/feature/01.svg";
import image2 from "@assets/images/website/feature/02.svg";
import image3 from "@assets/images/website/feature/03.svg";
import image4 from "@assets/images/website/feature/04.svg";
import image5 from "@assets/images/website/feature/05.svg";
import image6 from "@assets/images/website/feature/06.svg";
import image7 from "@assets/images/website/feature/07.svg";
import image8 from "@assets/images/website/feature/08.svg";
import image9 from "@assets/images/website/feature/09.svg";
import image10 from "@assets/images/website/feature/010.svg";
import image11 from "@assets/images/website/feature/011.svg";

import "./EtijahFeatures.css";
import LoginIcon from "@/assets/images/sidebaricons/loginIcon";
import OrderIconText from "@/assets/images/sidebaricons/ordericontext";
import DateIcon from "@/assets/images/sidebaricons/dateicon";
import ZoomIcon from "@/assets/images/sidebaricons/zoomicon";
import MoneyIcon from "@/assets/images/sidebaricons/moneyicon";
import ChartIcon from "@/assets/images/sidebaricons/charticon";
import StarIcon from "@/assets/images/sidebaricons/staricon";
import ListViewRectangle from "@/assets/images/sidebaricons/listviewrectangle";
import TaskDeleteIcon from "@/assets/images/sidebaricons/taskdeleteicon";
import UserAdd from "@/assets/images/sidebaricons/useradd";
import FileSharing from "@/assets/images/sidebaricons/filesharing";
import React from "react";
import { useTranslation } from "react-i18next";

const EtijahFeatures = () => {
  const { t } = useTranslation('homePage');
  
  const items = [
    {
      id: 1,
      img: image1,
      text: t('features.items.attendance'),
      icon: <LoginIcon />
    },
    {
      id: 2,
      img: image2,
      text: t('features.items.orders'),
      icon: <OrderIconText />
    },
    { id: 3, img: image3, text: t('features.items.calendar'), icon: <DateIcon /> },
    // { id: 4, img: image4, text: "حاسبة النطاقات", icon: <ZoomIcon /> },
    { id: 5, img: image5, text: t('features.items.payroll'), icon: <MoneyIcon /> },
    { id: 6, img: image6, text: t('features.items.performance'), icon: <ChartIcon /> },
    { id: 7, img: image7, text: t('features.items.tasks'), icon: <ListViewRectangle /> },
    { id: 8, img: image8, text: t('features.items.recruitment'), icon: <UserAdd /> },
    { id: 9, img: image9, text: t('features.items.rewards'), icon: <StarIcon /> },
    { id: 10, img: image10, text: t('features.items.violations'), icon: <TaskDeleteIcon /> },
    { id: 11, img: image11, text: t('features.items.structure'), icon: <FileSharing /> }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="etijah-feature-web bg-custom-gradient margin-60-web padding-inside-section">
      <ContainerMedia>
        <WebSectionTitle
          dataAos="fade-up"
          isTrueReverseCol={false}
          newClassTitleSection={"web-white-content"}
          ishideText={false}
          textTitleHead={t('features.sectionTitle')}
          titleWebSection={t('features.sectionSubtitle')}
        />
        <div className="all-etijah-feature">
          {/* ================== START BUTTONS FEATURE ================== */}
          <div data-aos={"fade-up"} className="buttons-feature">
            <div className="all-buttons-feature flex flex-col gap-[5px]">
              {items.map((item, index) => (
                <button
                  key={index}
                  className={`${
                    activeIndex === index ? "active" : ""
                  } btn-feature flex items-center  p-[11px_16px] rounded-[50px] gap-2 text-[16px] font-[600] text-primaryLightColor_02 `}
                  onClick={() => handleButtonClick(index)}
                >
                  {item.icon}
                  {item.text}
                </button>
              ))}
            </div>
          </div>
          {/* ================== END BUTTONS FEATURE ================== */}
          {/* ================== START BUTTONS FEATURE ================== */}
          <div data-aos={"fade-right"} className="images-feature">
            {items.map((item, index) => (
              <div
                key={index}
                className={`image-feature-div ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <img
                  src={item.img}
                  alt={`Image ${index + 1}`}
                  className={`w-full h-full object-cover`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* ================== END BUTTONS FEATURE ================== */}
        </div>
      </ContainerMedia>
    </div>
  );
};

export default EtijahFeatures;

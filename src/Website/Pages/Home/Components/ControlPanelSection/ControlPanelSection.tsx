import { useState, useEffect } from "react";
import img1 from "@assets/images/website/controlpanelsection/01.png";
import img2 from "@assets/images/website/controlpanelsection/02.png";
import img3 from "@assets/images/website/controlpanelsection/03.png";
import img4 from "@assets/images/website/controlpanelsection/04.png";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { useTranslation } from "react-i18next";

import "./ControlPanelSection.css";

const ControlPanelSection = () => {
  const { t } = useTranslation('homePage');
  
  const contentItems = [
    {
      id: 1,
      title: t('controlPanel.items.dataAnalysis.title'),
      text: t('controlPanel.items.dataAnalysis.description'),
      image: img1
    },
    {
      id: 2,
      title: t('controlPanel.items.communication.title'),
      text: t('controlPanel.items.communication.description'),
      image: img2
    },
    {
      id: 3,
      title: t('controlPanel.items.orderManagement.title'),
      text: t('controlPanel.items.orderManagement.description'),
      image: img3
    },
    {
      id: 4,
      title: t('controlPanel.items.userExperience.title'),
      text: t('controlPanel.items.userExperience.description'),
      image: img4
    }
  ];

  const [activeId, setActiveId] = useState(1); // Default to show the first image
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991); // MEDIA SCREEN 991PX

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (id) => {
    if (isMobile) {
      setActiveId(id); // Use click event on mobile
    }
  };

  const handleMouseEnter = (id) => {
    if (!isMobile) {
      setActiveId(id); // Use hover event on larger screens
    }
  };

  return (
    <div className="control-panel-section bg-custom-gradient margin-60-web padding-inside-section">
      {/* ==================== START CONTAINER =================== */}
      <ContainerMedia>
        <WebSectionTitle
          dataAos="fade-down"
          isTrueReverseCol={false}
          newClassTitleSection={"web-white-content"}
          ishideText={false}
          textTitleHead={t('controlPanel.sectionTitle')}
          titleWebSection={t('controlPanel.sectionSubtitle')}
        />
        {/* =============== START ALL CONTROL PANEL INFO ================= */}
        <div className="all-control-panel-info">
          {/* ===================== START CONTENT INFO DETAILS CONTROL ===================== */}
          <div
            data-aos={"fade-up"}
            className="all-cards-content-control h-[450px] overflow-y-auto"
          >
            {contentItems.map((item) => (
              <div
                key={item.id}
                className={`card-control-one mb-2  py-4 cursor-pointer ${activeId === item.id
                    ? "opacity-100 active-text"
                    : "opacity-50"
                  } hover:transition-all duration-300`}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <h2 className="title-control text-font-white text-[19px] md:text-[25px]">
                  {item.title}
                </h2>
                <p className="text-control leading-[1.8] text-font-white text-[14px] sm:text-[17px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          {/* ===================== END CONTENT INFO DETAILS CONTROL ===================== */}

          {/* ================== START IMAGES CONTROL ============== */}
          <div data-aos={"fade-up"} className="images-control-panel">
            <div className="relative w-full h-full overflow-hidden transition-all duration-500 ease-in-out">
              {contentItems.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={`Hovered Content ${item.id}`}
                  className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeId === item.id ? "opacity-100" : "opacity-0 absolute"
                    }`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          {/* ================== END IMAGES CONTROL ============== */}
        </div>
        {/* =============== END ALL CONTROL PANEL INFO ================= */}
      </ContainerMedia>
      {/* ==================== END CONTAINER =================== */}
    </div>
  );
};

export default ControlPanelSection;

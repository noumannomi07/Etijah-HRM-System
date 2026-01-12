import { Link, NavLink, useLocation } from "react-router-dom";
import ContainerMedia from "../ContainerMedia/ContainerMedia";
import "./NavbarMenuWeb.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LogoWeb from "../LogoWeb/LogoWeb";
import LanguagesDropMenu from "@/Website/Shared/LanguagesDropMenu/LanguagesDropMenu";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const NavbarMenuWeb = () => {
  const location = useLocation();
  const { t } = useTranslation('navbar');

  const menuItems = [
    // { name: "الرئيسية", path: "/" },
    { name: t('website.menuItems.about'), path: FullRoutes.Website.About },
    { name: t('website.menuItems.services'), path: FullRoutes.Website.ServicesPage },
    { name: t('website.menuItems.aboutApp'), path: FullRoutes.Website.AboutApp },
    { name: t('website.menuItems.packages'), path: FullRoutes.Website.PackagesPage },
    // { name: "الأسئلة الشائعة", path: FullRoutes.Website.FaqEtijah },
    {
      name: t('website.menuItems.blog'),
      path: FullRoutes.Website.BlogsEtijah[CommonRouteKeys.Base]
    }
    // { name: t('website.menuItems.contact'), path: FullRoutes.Website.ContactUs }
  ];

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // FIXED TOP NAVBAR
  const [isMenuFixed, setMenuFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position
      const scrollTop = window.scrollY;
      const shouldBeFixed = scrollTop > 100; // Change 100 to the scroll position where you want the menu to become fixed

      // UPDATE STATE TO FIXED MENU
      setMenuFixed(shouldBeFixed);
    };
    //  scroll event
    window.addEventListener("scroll", handleScroll);
  }, []);
  const isJobPage = location.pathname.includes("job");

  return (
    <div
      className={`navbar-menu-web ${isMenuFixed ? "menu-fixed" : ""} ${
        isJobPage ? "bg-blue-600 !top-0" : ""
      }`}
    >
      {/* ===================== START MIAN NAVBAR MENU WEB ======================= */}
      <div className={`main-navbar-menu-web`}>
        {/* ===================== START CONTIANER =================== */}
        <ContainerMedia>
          {/* =================== START ALL NAVBAR WEB ================ */}
          <div
            className={`all-navbar-web flex items-center justify-between  p-[5px_15px] rounded-full ${
              isJobPage ? "!border-none" : ""
            }`}
          >
            {/* ================== START LOGO WEB =================== */}
            <div data-aos={"fade-left"}>
              <LogoWeb />
            </div>
            {/* ================== END LOGO WEB =================== */}
            <div
              className={`content-navbar-menu w-full ${
                isOpenMenu ? "active" : ""
              }`}
            >
              <div
                onClick={toggleMenuBar}
                className={`overlay-bg fixed hidden top-0 w-full h-full bg-black bg-opacity-60 right-0 bottom-0 ${
                  isOpenMenu ? "active" : ""
                }`}
              />
              {/* =================== START ALL LINKS MENU NAVBAR ===================== */}
              <div
                className={`all-links-menu-navbar flex-items-center  w-full  ${
                  isOpenMenu ? "active" : ""
                } ${isJobPage ? "justify-end" : "justify-between"}`}
              >
                {/* ================== START CLOSE BUTTON ================== */}
                <div
                  onClick={toggleMenuBar}
                  className="close-button p-[13px_16px] mr-3 cursor-pointer  flex-items-center hidden text-[20px] border border-[#ffffff42] rounded-[0_0_10px_0] text-whiteColor  transition-all duration-300 hover:bg-red-600 hover:border-red-600 absolute top-0 left-0"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                {/* ================== END CLOSE BUTTON ================== */}

                {/* ================== START LIST LINK NAV WEB ============= */}
                {isJobPage ? (
                  ""
                ) : (
                  <nav className="list-nav-links m-auto ">
                    {/* ================= START UL LIST ================ */}
                    <ul
                      data-aos={"fade-down"}
                      className="ul-list-menu m-0 p-0 flex-items-center  gap-5"
                    >
                      {menuItems.map((item, index) => (
                        <li key={index} className="nav-item">
                          <NavLink
                            to={item.path}
                            onClick={toggleMenuBar}
                            className="link-nav text-whiteColor text-[16px] font-[600] hover:text-orangeColor transition-all duration-300"
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    {/* ================= END UL LIST ================ */}
                  </nav>
                )}
                {/* ================== END LIST LINK NAV WEB ============= */}
                <div
                  data-aos={"fade-right"}
                  className="left-content-nav flex-items-center  gap-3"
                >
                  <LanguagesDropMenu
                    hideGlobal={true}
                    newClassLang={"text-white"}
                  />

                  {/* ================== START BUTTON LOGIN  ================ */}
                  <div
                    className="main-button-login flex items-center  gap-3"
                    onClick={toggleMenuBar}
                  >
                    <Link
                      to={FullRoutes.Website.SubmitSubscriptionRequestWeb}
                      className="button-login button-transparent bg-white text-darkColor hover:bg-orangeColor hover:text-white transition-all duration-500 rounded-full p-[11px_25px]      !border-[0.2px] "
                    >
                      {t('website.buttons.trySystem')}
                    </Link>
                    <Link
                      to={FullRoutes.Website.LoginWeb}
                      className="button-login button-transparent hover:bg-orangeColor transition-all duration-500 rounded-full p-[11px_25px] text-whiteColor     !border-[0.2px] "
                    >
                      {t('website.buttons.login')}
                    </Link>
                  </div>
                  {/* ================== END BUTTON LOGIN  ================ */}
                </div>
              </div>
              {/* =================== END ALL LINKS MENU NAVBAR ===================== */}
            </div>
            <div
              data-aos={"fade-right"}
              className="all-toggle-bars  flex items-center gap-1"
            >
              <LanguagesDropMenu
                hideGlobal={true}
                newClassLang={"text-white mr-10"}
                textAr="Ar"
              />
              {/* =================== START TOGGLE MENU ===================== */}
              <div
                onClick={toggleMenuBar}
                className="toggle-menu hidden p-[14px_16px] mr-3 cursor-pointer  flex-items-center text-[20px] border rounded-full text-whiteColor  transition-all duration-300 hover:bg-orangeColor hover:border-orangeColor"
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
              {/* =================== END TOGGLE MENU ===================== */}
            </div>
          </div>
          {/* =================== END ALL NAVBAR WEB ================ */}
        </ContainerMedia>
        {/* ===================== END CONTIANER =================== */}
      </div>
      {/* ===================== END MIAN NAVBAR MENU WEB ======================= */}
    </div>
  );
};

export default NavbarMenuWeb;

import React, { useEffect, useState, useRef } from "react";
import NavEditIcon from "@assets/images/navbaricons/navediticon.svg";
import NavSearchIcon from "@assets/images/navbaricons/navsearchicon.svg";
import "./NavBarDashboard.css";
import NavBellIcon from "@assets/images/navbaricons/navbellicon.svg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import male from "@assets/images/homeimages/users/male.png";
import NavArrowIcon from "@assets/images/navbaricons/navarrowicon.svg";
import { Link, useNavigate } from "react-router-dom";
import NavUserIcon from "@assets/images/navbaricons/navusericon.svg";
import NavLoginIcon from "@assets/images/navbaricons/navloginicon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronLeft,
  faCog,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import ModalNotifications from "../ModalNotifications/ModalNotifications";
import MyTasks from "../MyTasks/MyTasks";
import DiamondBgIcon from "@assets/Icons/DiamondBgIcon.svg";
import PropTypes from "prop-types";
import LanguagesDropMenu from "@/Website/Shared/LanguagesDropMenu/LanguagesDropMenu";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import LogoutLottie from "@/Dashboard/Layout/LogoutLottie";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";
import { FullRoutes } from "@/Routes/routes";

interface SearchResult {
  id: number;
  name: string;
  email: string;
  image: string;
}

const NavBarDashboard = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [open, setOpen] = useState(false);
  const [openMyTasks, setOpenMyTasks] = useState(false);
  const [openlogout, setOpenlogout] = useState(false);
  const [userProfile, setuserProfile] = useState<any>(null);
  const [loading, setloading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("navbar");

  const logOutFunc = () => {
    Cookies.set("userState", "0");
    Cookies.remove("access_token");
    navigate(FullRoutes.Website.Base);
    toast.success(t("userMenu.logoutSuccess"));
  };

  useEffect(() => {
    axiosInstance
      .get("/profile", {
        headers: { "Accept-Language": i18next.language }
      })
      .then((res) => {
        setuserProfile(res.data.data);
        setloading(false);
      });
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 0) {
        axiosInstance
          .get(`/search?search=${query}`)
          .then((res) => {
            setResults(res.data.data);
            setShowDropdown(true);
          })
          .catch(() => {
            setResults([]);
            setShowDropdown(false);
          });
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ModalNotifications open={open} hiddenModal={() => setOpen(false)} />
      <MyTasks
        openMyTasks={openMyTasks}
        hiddenModalMyTasks={() => setOpenMyTasks(false)}
      />

      <div className="navbar-dashboard flex-between border-b pb-3 mb-[1.60rem]">
        <div className="right-nav-dashboard">
          <h2 className="name-user text-font-dark text-[20px]">
            {userProfile?.first_name
              ? t("greeting.welcome", { name: userProfile.first_name })
              : t("greeting.welcome", { name: "" })}
          </h2>
          <p className="text text-font-gray">
            {new Date().getHours() < 12
              ? t("greeting.goodMorning")
              : t("greeting.goodEvening")}
          </p>
        </div>

        <div
          onClick={toggleSidebar}
          className="icon-Toggle-bar flex-items-center hidden button-transparent p-[12px_15px] text-[20px]"
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className="all-input-search ms-auto relative" ref={searchRef}>
          <div className="input-search-info relative flex w-full gap-2 md:w-max">
            <input
              type="text"
              id="search_input"
              className="input-search w-[350px] rounded-[6px] !border-lightColorWhite2 py-[10px] bg-lightGrayColor placeholder:text-blue-gray-300 focus:!border-lightColorWhite2 focus:shadow-none"
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            <div className="search-table-icon !absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={NavSearchIcon} alt="search" loading="lazy" />
            </div>
          </div>
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full mt-2 z-50 w-[350px] rounded-md bg-white shadow-lg border border-gray-200 max-h-[300px] overflow-auto">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 hover:bg-gray-100 border-b cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/dashboard/staff-management/staff-employee-information/${item.id}`
                    );
                    setShowDropdown(false);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <img
                    src={item.image}
                    alt="employee"
                    className="w-10 h-10 rounded-full object-cover me-3"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.email} - #{item.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============= START LEFT NAV DASHBOARD ============== */}
        <div className="left-nav-dashboard item-center-flex  flex-wrap  gap-[10px]">
          <div className="all-left-content item-center-flex   gap-[10px]">
            {/* ================== START ICON EDIT NAV =============== */}
            <div
              onClick={() => setOpenMyTasks(true)}
              className="icon-edit-nav button-transparent p-[10px_15px] h-[52px]"
            >
              <img src={NavEditIcon} alt="edit" />
            </div>
            {/* ================== END ICON EDIT NAV =============== */}
            {/* ================== START ICON EDIT NAV =============== */}
            <div
              onClick={() => setOpen(true)}
              className="icon-bell-nav button-transparent p-[10px_15px] h-[52px]"
            >
              <img src={NavBellIcon} alt="notifications" />
            </div>
            {/* ================== END ICON EDIT NAV =============== */}
          </div>
          {/* ================== START USER MENU ================= */}
          <div className="user-menu">
            <Menu>
              <MenuHandler>
                <div className="p-0 cursor-pointer  item-center-flex  w-full">
                  {/* =============== START IMAGE USER =============== */}
                  <div className="image-user-nav">
                    {" "}
                    <img
                      src={userProfile?.image || male}
                      alt="image user"
                      className="!w-[55px] !h-[55px] object-cover rounded-[8px]"
                      loading="lazy"
                    />
                  </div>
                  {/* =============== END IMAGE USER =============== */}
                  {/* =============== START CONTENT USER =========== */}
                  <div className="content-user-nav">
                    <h2 className="text-font-dark p-0 m-0 leading-none flex-between gap-[12px] ">
                      {loading ? (
                        <Skeleton variant="text" width={110} height={20} />
                      ) : (
                        userProfile?.name
                      )}
                      <img src={NavArrowIcon} alt="arrow" />
                    </h2>
                    <p className="text-title-job leading-none pt-1 text-font-gray text-[14px]">
                      {loading ? (
                        <Skeleton variant="text" width={110} height={20} />
                      ) : (
                        userProfile?.office?.title
                      )}
                    </p>
                  </div>
                  {/* =============== END CONTENT USER =========== */}
                </div>
              </MenuHandler>
              <MenuList
                className="menu-list-nav menu-list-nav-lang px-0 min-w-[245px]"
                placeholder=""
              >
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <div className="p-0 cursor-pointer  item-center-flex">
                    {/* =============== START IMAGE USER =============== */}
                    <div className="image-user-nav">
                      {" "}
                      <img
                        src={userProfile?.image || male}
                        alt="image user"
                        className="!w-[55px] !h-[55px] object-cover rounded-[8px]"
                        loading="lazy"
                      />
                    </div>
                    {/* =============== END IMAGE USER =============== */}
                    {/* =============== START CONTENT USER =========== */}
                    <div className="content-user-nav">
                      <h2 className="text-font-dark p-0 m-0 leading-none flex itmes-center gap-[12px] justify-between">
                        {loading ? (
                          <Skeleton variant="text" width={110} height={20} />
                        ) : (
                          userProfile.first_name
                        )}
                      </h2>
                      <p className="text-title-email leading-none pt-1 text-font-gray text-[14px]">
                        {loading ? (
                          <Skeleton variant="text" width={110} height={20} />
                        ) : (
                          userProfile.email
                        )}
                      </p>
                    </div>
                    {/* =============== END CONTENT USER =========== */}
                  </div>
                </MenuItem>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <Link
                    to={FullRoutes.Dashboard.PackagesProfileUser}
                    className="btn-main--1 btn-orange-bg py-[10px] flex-between-wrap"
                  >
                    <div className="flex-items-center gap-3">
                      <img src={DiamondBgIcon} />

                      <div className="content-diamond">
                        <p className="title text-font-dark text-[14px]">
                          {t("userMenu.currentPackage")}
                        </p>
                        <p className="text text-font-gray text-[13px]">
                          {t("userMenu.basicPackage")}
                        </p>
                      </div>
                    </div>
                    <div className="icon-arrow">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <Link
                    to={
                      FullRoutes.Dashboard.StaffManagement
                        .StaffEmployeeInformation +
                      "/" +
                      userProfile?.id
                    }
                    className="btn-main--1 btn-light-bg"
                  >
                <FontAwesomeIcon icon={faUser}/> {t("userMenu.profile")}
                  </Link>
                </MenuItem>
                <div className="px-3">
                  <Link
                    to={"/dashboard/change-password"}
                    className="btn-main--1 btn-light-bg"
                  >
                    <FontAwesomeIcon icon={faCog} />{" "}
                    {t("userMenu.securitySettings")}
                  </Link>
                </div>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <div className=" border-y py-3">
                    <LanguagesDropMenu />
                  </div>
                </MenuItem>

                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <Link
                    to={FullRoutes.Dashboard.Base}
                    className="btn-main--1 btn-danger-bg"
                    onClick={() => setOpenlogout(true)}
                  >
                    <img src={NavLoginIcon} alt="logout" />{" "}
                    {t("userMenu.logout")}
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          {/* ================== END USER MENU ================= */}
        </div>
        <div>
          <CustomModal
            isOpen={openlogout}
            handleOpen={() => {
              setOpenlogout(false);
            }}
            titleModal={t("userMenu.logoutConfirmation.title")}
          >
            <LogoutLottie />
            <h1
              style={{
                textAlign: "center",
                margin: "-10px auto 20px",
                fontSize: "20px",
                fontWeight: "600",
                color: "#3d3d3d",
                borderBottom: "1px solid #afafaf78",
                paddingBottom: "10px"
              }}
            >
              {t("userMenu.logoutConfirmation.message")}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "-10px"
              }}
            >
              <button
                className="btn-main"
                style={{
                  margin: "0 5px",
                  backgroundColor: "#f44336",
                  borderColor: "#f44336"
                }}
                onClick={logOutFunc}
              >
                {t("userMenu.logoutConfirmation.confirm")}
              </button>
              <button
                onClick={() => {
                  setOpenlogout(false);
                }}
                className="button-transparent"
                style={{ margin: "0 5px" }}
              >
                {t("userMenu.logoutConfirmation.cancel")}
              </button>
            </div>
          </CustomModal>
        </div>
        {/* ============= END LEFT NAV DASHBOARD ============== */}
      </div>
    </>
  );
};
NavBarDashboard.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};
export default NavBarDashboard;

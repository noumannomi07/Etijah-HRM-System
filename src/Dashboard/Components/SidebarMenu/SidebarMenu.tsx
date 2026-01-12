import ArrowsLeft from "@assets/Icons/ArrowsLeft.svg";
import ArrowsRight from "@assets/Icons/ArrowsRight.svg";
import anim1 from "@assets/images/animation/animation1.json";
import Logo from "@components/Logo/Logo";
import { Tooltip } from "flowbite-react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "./SidebarMenu.css";
import { groupedLinks } from "./constants";
import { FullRoutes } from "@/Routes/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRoles } from "@/contexts";
// dd
const SidebarMenu = ({
    isOpen,
    toggleSidebar,
    closeToggleSidebar,
    isSmallScreen, 
}: {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeToggleSidebar: () => void;
    isSmallScreen: boolean;
}) => {
    const { userRoles } = useRoles();
    const permissions = userRoles?.permissions;
    const { t } = useTranslation("sidebar");
    const [openMenus, setOpenMenus] = useState({});

    const toggleSubmenu = (key: string) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <aside className="all-sidebar-menu">
                <div
                    className={`overlay-bg-side ${
                        isOpen ? "activeOverlay" : ""
                    }`}
                    onClick={closeToggleSidebar}
                ></div>
                <div
                    className={`sidebar-nav h-[100%] flex flex-col w-[250px] px-5 py-8 bg-lightColorWhite border-[1px] border-lightColorWhite2 rounded-[20px] ${
                        isOpen ? "close-sidebar" : ""
                    }`}
                >
                    {/* ================== START HEADER ================= */}
                    <div className="header-nav flex items-center justify-between">
                        <Link to={FullRoutes.Dashboard.Home}>
                            <Logo logoType={isOpen ? "icon" : "all"} />
                        </Link>
                        <div
                            onClick={toggleSidebar}
                            className="icon-arrow cursor-pointer"
                        >
                            <img
                                src={
                                    isOpen === false ? ArrowsRight : ArrowsLeft
                                }
                            />
                        </div>
                    </div>
                    {/* ================== END HEADER ================= */}
                    {/* ================== START NAVBAR ================= */}
                    <div className="flex flex-col justify-between mt-6">
                        <nav className="nav-content flex-1 -mx-3 space-y-3">
                            {groupedLinks.map((group, index) => {
                                const hasValidChildren = group.links.some(
                                    (itemLink) => {
                                        // Special handling for request permissions
                                        if (itemLink.permission === "request") {
                                            const ordersPermissionsList = [
                                                "vacations_requests-read",
                                                "advances_requests-read",
                                                "letters_requests-read",
                                                "flight_requests-read",
                                            ];
                                            return permissions?.some((p) =>
                                                ordersPermissionsList.includes(p)
                                            );
                                        }
                                        
                                        // Regular permission check
                                        return permissions?.includes(
                                            `${itemLink.permission}-read`
                                        );
                                    }
                                );
                                return (
                                    hasValidChildren && (
                                        <div key={index}>
                                            <h3
                                                className={`text-head-nav-side font-medium text-[16px] ${
                                                    group.title ===
                                                    "معلومات عامة"
                                                        ? ""
                                                        : "border-t-2 border-lightColorWhite2"
                                                } text-grayColor pt-2 mb-2`}
                                            >
                                                {t(`${group.title}`)}
                                            </h3>

                                            {group.links.map((itemLink) => {
                                                const ordersPermissionsList = [
                                                    "vacations_requests-read",
                                                    "advances_requests-read",
                                                    "letters_requests-read",
                                                    "flight_requests-read",
                                                ];

                                                const hasOrdersPermissions =
                                                    itemLink.permission ===
                                                        "request" &&
                                                    permissions?.some((p) =>
                                                        ordersPermissionsList.includes(
                                                            p
                                                        )
                                                    );
                                                const isPermission =
                                                    permissions?.includes(
                                                        `${itemLink.permission}-read`
                                                    ) || hasOrdersPermissions;

                                                return (
                                                    isPermission && (
                                                        <div
                                                            key={itemLink.path}
                                                        >
                                                            {itemLink.children ? (
                                                                <div>
                                                                    <button
                                                                        className="nav-item-link flex items-center justify-between w-full p-4 sm:p-3 rounded-lg hover:bg-lightColorblue hover:text-primaryColor"
                                                                        onClick={() =>
                                                                            toggleSubmenu(
                                                                                itemLink.path
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className="flex items-center">
                                                                            {
                                                                                itemLink.icon
                                                                            }
                                                                            <span className="text-link mx-2 text-[16px] font-medium text-left">
                                                                                {t(
                                                                                    `${itemLink.text}`
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        <span
                                                                            className={`transition-transform duration-300 ${
                                                                                openMenus[
                                                                                    itemLink
                                                                                        .path
                                                                                ]
                                                                                    ? "rotate-180"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="16"
                                                                                height="16"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="feather feather-chevron-down"
                                                                            >
                                                                                <polyline points="6 9 12 15 18 9" />
                                                                            </svg>
                                                                        </span>
                                                                    </button>

                                                                    {openMenus[
                                                                        itemLink
                                                                            .path
                                                                    ] && (
                                                                        <div className="ml-4 space-y-2">
                                                                            {itemLink.children.map(
                                                                                (
                                                                                    child
                                                                                ) => (
                                                                                    <NavLink
                                                                                        key={
                                                                                            child.path
                                                                                        }
                                                                                        className="nav-item-link flex items-center p-3 rounded-lg hover:bg-lightColorblue hover:text-primaryColor"
                                                                                        to={
                                                                                            child.path
                                                                                        }
                                                                                        onClick={
                                                                                            closeToggleSidebar
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            child.icon
                                                                                        }
                                                                                        <span className="text-link mx-2 text-[14px] font-medium">
                                                                                            {t(
                                                                                                `${child.text}`
                                                                                            )}
                                                                                        </span>
                                                                                    </NavLink>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {isOpen ===
                                                                        false ||
                                                                    isSmallScreen ? (
                                                                        <NavLink
                                                                            className="nav-item-link flex items-center p-4 sm:p-3 rounded-lg hover:bg-lightColorblue hover:text-primaryColor"
                                                                            to={
                                                                                itemLink.path
                                                                            }
                                                                            onClick={
                                                                                closeToggleSidebar
                                                                            }
                                                                        >
                                                                            {
                                                                                itemLink.icon
                                                                            }
                                                                            <span className="text-link mx-2 text-[16px] font-medium">
                                                                                {t(
                                                                                    `${itemLink.text}`
                                                                                )}
                                                                            </span>
                                                                        </NavLink>
                                                                    ) : (
                                                                        <Tooltip
                                                                            content={
                                                                                itemLink.text
                                                                            }
                                                                            placement="left"
                                                                        >
                                                                            <NavLink
                                                                                className="nav-item-link flex items-center px-3 py-3 rounded-lg hover:bg-lightColorblue hover:text-primaryColor"
                                                                                to={
                                                                                    itemLink.path
                                                                                }
                                                                                onClick={
                                                                                    closeToggleSidebar
                                                                                }
                                                                            >
                                                                                {
                                                                                    itemLink.icon
                                                                                }
                                                                            </NavLink>
                                                                        </Tooltip>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    )
                                                );
                                            })}
                                        </div>
                                    )
                                );
                            })}
                        </nav>
                    </div>
                    {/* ================== END NAVBAR ================= */}
                    {/* =============== START CONTENT BOTTOM NAVBAR ============== */}
                    <div className="bottom-content-sidebar bg-whiteColor p-[0px_12px_15px_12px] rounded-[12px] border border-lightColorWhite2">
                        <div className="image-animation flex items-center justify-center w-[100%]">
                            <Lottie animationData={anim1} />
                        </div>
                        <Link
                            to={FullRoutes.Dashboard.InviteEmployees}
                            className="btn-main"
                        >
                            {t("invite_employees")}
                        </Link>
                    </div>
                    {/* =============== END CONTENT BOTTOM NAVBAR ============== */}
                </div>
            </aside>
        </>
    );
};

SidebarMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    closeToggleSidebar: PropTypes.func.isRequired,
    isSmallScreen: PropTypes.bool.isRequired,
};

export default SidebarMenu;

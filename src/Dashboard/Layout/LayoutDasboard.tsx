import React from "react";
import SidebarMenu from "../Components/SidebarMenu/SidebarMenu";
import SideBarOpenClose from "../Components/SidebarMenu/SideBarOpenClose";
import LayoutMain from "./LayoutMain";
import useGoogleTranslateSync from "@/hooks/useGoogleTranslateSync";
import { useInactivityLogout } from "@/hooks/useInactivityLogout";

const LayoutDashboard = () => {
  // THIS FOR OPEN AND CLOSE SIDEBAR
  const {
    isSmallScreen,
    isSmallScreenOpen,
    isLargeScreenOpen,
    handleSidebarToggle,
    closeToggleSidebar
  } = SideBarOpenClose();

  // Google Translate sync hook
  useGoogleTranslateSync();

  // Inactivity logout hook - automatically logout after inactivity
  useInactivityLogout({
    timeout: 30 * 60 * 1000, // 2 minutes for testing (change to 29 * 60 * 1000 for production)
    enabled: true, // Enable auto-logout
  });

  return (
    <div className="all-page-content-dashboard flex min-h-[100vh]">
      <SidebarMenu
        toggleSidebar={handleSidebarToggle}
        isOpen={isSmallScreen ? isSmallScreenOpen : isLargeScreenOpen}
        closeToggleSidebar={closeToggleSidebar}
        isSmallScreen={isSmallScreen}
      />
      <LayoutMain
        activeOpen={isSmallScreen ? isSmallScreenOpen : isLargeScreenOpen}
        toggleSidebar={handleSidebarToggle}
      />
    </div>
  );
};

export default LayoutDashboard;

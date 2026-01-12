import NavBarDashboard from "../NavBarDashboard/NavBarDashboard";
import SidebarMenu from "./SidebarMenu";
import SideBarOpenClose from "./SideBarOpenClose";

const SideBarOutLayout = () => {
  const {
    isSmallScreen,
    isSmallScreenOpen,
    handleSidebarToggle,
    closeToggleSidebar
  } = SideBarOpenClose();
  return (
    <>
      <NavBarDashboard toggleSidebar={handleSidebarToggle} />
      {isSmallScreen && (
        <SidebarMenu
          toggleSidebar={handleSidebarToggle}
          isOpen={isSmallScreenOpen}
          closeToggleSidebar={closeToggleSidebar}
          isSmallScreen={isSmallScreen}
        />
      )}
    </>
  );
};

export default SideBarOutLayout;

import { useEffect, useState } from "react";

const SideBarOpenClose = () => {
  // STATE TO TRACK WHETHER THE SCREEN IS SMALL (<= 767PX)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 767);

  // STATE FOR SMALL SCREEN SIDEBAR OPEN/CLOSE
  const [isSmallScreenOpen, setIsSmallScreenOpen] = useState(false);

  // STATE FOR LARGE SCREEN SIDEBAR OPEN/CLOSE, LOADED FROM LOCALSTORAGE
  const [isLargeScreenOpen, setIsLargeScreenOpen] = useState(() => {
    const storedState = localStorage.getItem("largeScreenSidebarOpen");
    return storedState !== null ? JSON.parse(storedState) : false;
  });

  // SAVE LARGE SCREEN SIDEBAR STATE IN LOCALSTORAGE WHENEVER IT CHANGES
  useEffect(() => {
    localStorage.setItem(
      "largeScreenSidebarOpen",
      JSON.stringify(isLargeScreenOpen)
    );
  }, [isLargeScreenOpen]);

  // HANDLE SCREEN RESIZE TO UPDATE ISSMALLSCREEN STATE
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsSmallScreen(currentWidth <= 767);

      // IF THE SCREEN SIZE CHANGES TO LARGE, RESTORE THE SIDEBAR STATE
      if (currentWidth > 767) {
        const storedState = localStorage.getItem("largeScreenSidebarOpen");
        if (storedState !== null) {
          setIsLargeScreenOpen(JSON.parse(storedState));
        }
      } else {
        // CLOSE SIDEBAR ON SMALL SCREENS
        setIsSmallScreenOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // INITIAL CALL TO SET CORRECT SCREEN SIZE AND STATE ON MOUNT
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TOGGLE SIDEBAR FOR SMALL SCREENS
  const toggleSmallScreenSidebar = () => {
    setIsSmallScreenOpen((prev) => !prev);
  };

  // TOGGLE SIDEBAR FOR LARGE SCREENS
  const toggleLargeScreenSidebar = () => {
    setIsLargeScreenOpen((prev) => !prev);
  };

  // HANDLE SIDEBAR TOGGLE BASED ON SCREEN SIZE
  const handleSidebarToggle = () => {
    if (isSmallScreen) {
      toggleSmallScreenSidebar();
    } else {
      toggleLargeScreenSidebar();
    }
  };

  // CLOSE SIDEBAR ONLY WHEN NAVIGATING IN MOBILE VIEW
  const closeToggleSidebar = () => {
    if (isSmallScreen) {
      setIsSmallScreenOpen(false);
    }
  };

  // CHECK IF THE BROWSER IS FIREFOX AND ADD A CLASS TO THE BODY ELEMENT
  useEffect(() => {
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
      document.body.classList.add("firefox");
    }
  }, []);
  return {
    isSmallScreen,
    isSmallScreenOpen,
    isLargeScreenOpen,
    handleSidebarToggle,
    closeToggleSidebar
  };
};

export default SideBarOpenClose;

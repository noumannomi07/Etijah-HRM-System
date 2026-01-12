import { Outlet } from "react-router-dom";
import NavbarMenuWeb from "../Components/NavbarMenuWeb/NavbarMenuWeb";
import FooterWeb from "../Components/FooterWeb/FooterWeb";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    const checkSectionsVisibility = () => {
      const screenWidth = window.innerWidth;
      const sections = document.querySelectorAll(".partner-all-stages, .banner-show-details-card");

      let isAnySectionInViewport = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          isAnySectionInViewport = true;
        }
      });

      if (isAnySectionInViewport) {
        if (screenWidth > 767 || document.querySelector(".banner-show-details-card")) {
          document.body.classList.add("web-page-home");
        }
      } else {
        document.body.classList.remove("web-page-home");
      }
    };

    checkSectionsVisibility();

    const onScroll = () => {
      checkSectionsVisibility();
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="page-web flex flex-col min-h-screen">
      <nav>
        <NavbarMenuWeb />
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <FooterWeb />
      </footer>
    </div>
  );
};

export default Layout;

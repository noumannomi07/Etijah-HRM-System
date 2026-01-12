import React from "react";
import ContainerMedia from "../ContainerMedia/ContainerMedia";
import BottomRightLeftFooter from "./Components/BottomRightLeftFooter/BottomRightLeftFooter";
import HeaderFooter from "./Components/HeaderFooter/HeaderFooter";

import "./FooterWeb.css";
import { useLocation } from "react-router-dom";
const FooterWeb = () => {
   const location = useLocation();
  if (location.pathname === "/packages-page") {
    return null;
  }
  return (
    <>
      {/* ===================== START FOOTER ===================== */}
      <div className="footer margin-60-web">
        {/* ================== START CONTAINER ================= */}
        <ContainerMedia>
          {/* ================= START ALL FOOTER ================= */}
          <div data-aos={"fade-up"} className="all-footer">
            {/* ================= START HEADER FOOTER =============== */}
            <HeaderFooter />
            {/* ================= END HEADER FOOTER =============== */}
            {/* ================= START BOTTOM FOOTER ============= */}
            <BottomRightLeftFooter />
            {/* ================= END BOTTOM FOOTER ============= */}
          </div>
          {/* ================= END ALL FOOTER ================= */}
        </ContainerMedia>
        {/* ================== END CONTAINER ================= */}
      </div>
      {/* ===================== END FOOTER ===================== */}
    </>
  );
};

export default FooterWeb;

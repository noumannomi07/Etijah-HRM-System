import Lottie from "lottie-react";
import notDataFound from "@assets/images/error/notfoundanimation.json";
import "./NotFoundPage.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { FullRoutes } from "@/Routes/routes";
const NotFoundPage = () => {
  const location = useLocation();

  const targetLink = location.pathname.startsWith("/dashboard")
    ? FullRoutes.Dashboard.Home
    : FullRoutes.Website.Base;

  // IF IN DASHBOARD GO TO DASHBOARD/HOMEDASHBOARD ELSE GO TO "/"

  // ب
  useEffect(() => {
    // ADD CLASS TO BODY
    document.body.classList.add("not-found-body");
    return () => {
      document.body.classList.remove("not-found-body");
    };
  }, []);
  return (
    <div className="not-page-found flex items-center justify-center h-[100vh] flex-col">
      <div className="all-content-page">
        <div className="animtion-lottie-data">
          <Lottie animationData={notDataFound} />
        </div>
        <div className="main-content-found">
          <h2 className="text-font-dark text-center text-[25px] font-[500] text-darkColor">
            الصفحة غير موجودة!
          </h2>

          <Link to={targetLink} className="btn-main  w-max m-auto mt-4">
            <FontAwesomeIcon icon={faHome} />
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

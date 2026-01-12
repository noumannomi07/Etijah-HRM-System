import Lottie from "lottie-react";
import notDataFound from "@assets/images/animation/datanotfound.json";
import "./NotDataFound.css"
const NotDataFound = () => {
  return (
    <div className="not-data-found py-3">
      <div className="animtion-lottie-data">
        <Lottie animationData={notDataFound} />
      </div>
      {/* <h2 className="text-font-dark text-center text-[25px] font-[500] text-redColor01">
        لا يوجد بيانات
      </h2> */}
    </div>
  );
};

export default NotDataFound;

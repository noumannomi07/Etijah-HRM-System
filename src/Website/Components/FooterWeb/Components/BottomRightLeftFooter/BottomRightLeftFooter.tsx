import LeftFooterWeb from "./LeftFooterWeb/LeftFooterWeb";
import RightFooterWeb from "./RightFooterWeb/RightFooterWeb";
import { useTranslation } from "react-i18next";

const BottomRightLeftFooter = () => {
  const { t } = useTranslation('footer');
  
  return (
    <div className="bottom-footer-web ">
      {/* ================= START ALL BOTTOM FOOTER WEB ================ */}
      <div className="all-footer-web py-[30px] grid sm:grid-cols-1 md:grid-cols-6 gap-5">
        <div className="col-span-1 sm:col-span-6 lg:col-span-4">
          <RightFooterWeb />
        </div>
        <div className="col-span-1 sm:col-span-4 lg:col-span-2">
          <LeftFooterWeb />
        </div>
      </div>
      {/* ================= END ALL BOTTOM FOOTER WEB ================ */}
      {/* ================= START END BOTTOM FOOTER ================== */}
      <div className="end-bottom-footer border-t border-[#ffffff2a] py-6 md:py-5 text-center">
        <p className="text-footer-bottom text-font-white text-[14px] font-[600] sm:text-[16px] sm:font-[500]">
          {t('bottom.copyright')}
        </p>
      </div>
      {/* ================= END END BOTTOM FOOTER ================== */}
    </div>
  );
};

export default BottomRightLeftFooter;

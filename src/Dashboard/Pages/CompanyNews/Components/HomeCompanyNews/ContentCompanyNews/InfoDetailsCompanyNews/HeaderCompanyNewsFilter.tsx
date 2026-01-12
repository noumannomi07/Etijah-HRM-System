import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InfoDetailsCompanyNews.css";
import NavSearchIcon from "@assets/images/navbaricons/navsearchicon.svg";
import ExcelButtonFunction from "@/Dashboard/Shared/DataTableInfo/Components/ExcelButtonFunction";
import PdfButtonFunction from "@/Dashboard/Shared/DataTableInfo/Components/PdfButtonFunction";
import { Link } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import { withPermissions } from "@/hoc";
const HeaderCompanyNewsFilter = ({ handleOpen, permissions }: { handleOpen: () => void, permissions: any }) => {
  const { t } = useTranslation("addNewNewsCompany");
  return (
    <div className="all-table-content all-header-company">
      <div
        className={`main-content-filter-top flex justify-between items-center   gap-[15px] mt-2 mb-5`}
      >
        {/* =============== START ALL INPUT SEARCH =============== */}
        <div className={`all-input-search  item-center-flex flex-wrap`}>
          {/* =============== START BUTTONS CONTENT MODAL =============== */}

          {permissions?.create && <div className="item-main--1 buttons-modal-content item-center-flex">
            <Link to={FullRoutes.Dashboard.CompanyNews.AddNewNewsCompany} className="btn-main py-[10px]">
              <FontAwesomeIcon icon={faPlus} /> {t("addNewNews")}
            </Link>
          </div>}
          {/* =============== END BUTTONS CONTENT MODAL =============== */}
          {/* =============== START UNPUT SEARCH ============ */}
          <div className="input-search-info item-main--1 relative flex w-full gap-2 md:w-max">
            <input
              type="text"
              id="search_input2"
              className={`w-[300px] input-search  rounded-[6px]  !border-lightColorWhite2 py-[12px] bg-lightGrayColor placeholder:text-blue-gray-300 focus:!border-lightColorWhite2 focus:shadow-none`}
              placeholder="بحث"
              required
            />
            <div className="!absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={NavSearchIcon} alt="search" />
            </div>
          </div>
          {/* =============== END UNPUT SEARCH ============ */}

          {/* <button
            type="button"
            onClick={handleOpen}
            className="button-transparent btn-filter-table !p-[12px_14px] !gap-[5px]"
          >
            <FilterIcon /> تصفية
          </button> */}
        </div>
        {/* =============== END ALL INPUT SEARCH =============== */}
        {/* =============== START ALL BUTTONS ACTIONS =============== */}
        <div className="all-buttons-actions item-center-flex">
          <ExcelButtonFunction />
          <PdfButtonFunction />
        </div>
        {/* =============== END ALL BUTTONS ACTIONS =============== */}
      </div>
    </div>
  );
};

export default withPermissions(HeaderCompanyNewsFilter, "company_news", {
  isComponent: true,
});

import { useState } from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const PaginationPage = ({ itemCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    onPageChange({ selected }); // onPageChange function
  };
const { t } = useTranslation();
  return (
    <div className="all-pagination flex  justify-center w-full align-items-center mt-7 mb-3">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <div className="button-arrow button-arrow-left p-[8px_15px] max-w-fit border  item-center-flex rounded-[8px] text-font-dark">
            <span className="text-button-pag">{t("common.next")}</span>{" "}
            <span className="icon-arrow-left transform_2">
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </span>
          </div>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={parseInt(itemCount)}
        previousLabel={
          <div className="button-arrow button-arrow-right p-[8px_15px] max-w-fit border  item-center-flex rounded-[8px] text-font-dark">
            <span className="icon-arrow-left transform_2">
              <FontAwesomeIcon icon={faArrowRightLong} />
            </span>{" "}
            <span className="text-button-pag">{t("common.previous")}</span>
          </div>
        }
        renderOnZeroPageCount={null}
        containerClassName="pagination item-center-flex"
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item-1"}
        nextClassName={"page-item-1 page-item-2"}
        previousLinkClassName={"page-link-1"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active-1"}
      />
    </div>
  );
};

PaginationPage.propTypes = {
  itemCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default PaginationPage;

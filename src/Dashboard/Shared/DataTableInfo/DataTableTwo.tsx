import PropTypes from "prop-types";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import "./DataTableInfo.css";
import CopyFunction from "./Components/CopyFunction";
import ExcelButtonFunction from "./Components/ExcelButtonFunction";
import PdfButtonFunction from "./Components/PdfButtonFunction";
import NavSearchIcon from "@assets/images/navbaricons/navsearchicon.svg";
import PaginationPage from "../Pagination/Pagination";
import FilterIcon from "./Icons/iconsFilter/FilterIcon";
import NotDataFound from "../NotDataFound/NotDataFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import { useSearchParams } from "react-router-dom";
import Loading from "@/components/loading";
import { useTranslation } from "react-i18next";
import ActionData from "./ActionData";
type ActionMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

type DataTableTwoProps = {
  theadContent: string[];
  tbodyContent: (string | React.ReactElement)[][];
  withCheckboxes: boolean;
  isShowContentFilterInfo: boolean;
  isShowModalButtonFilter: boolean;
  functionButtonFilter: () => void;
  isTrueButtonsModalContentRight: boolean;
  functionButtonModalOne: () => void;
  textContentButtonOne: string;
  isTrueButtonTwoModalContent: boolean;
  newClassButtonTwo: string;
  functionModalButtonTwo: () => void;
  showDateFilter: boolean;
  onChangeDateFilter: (date: Date | string) => void;
  textContetButtonTwo: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  onRowSelection?: (selectedIndices: number[]) => void;
  showButtonImportExcel: boolean;
  actionButtonsDrop?: ActionMenuItem[];
};

const DataTableTwo = ({
  theadContent,
  tbodyContent,
  withCheckboxes,
  isShowContentFilterInfo,
  isShowModalButtonFilter,
  functionButtonFilter,
  isTrueButtonsModalContentRight,
  functionButtonModalOne,
  textContentButtonOne,
  isTrueButtonTwoModalContent,
  newClassButtonTwo,
  functionModalButtonTwo,
  showDateFilter,
  onChangeDateFilter,
  textContetButtonTwo,
  onSearchChange,
  isLoading,
  onRowSelection,
  showButtonImportExcel = false,
  actionButtonsDrop
}: DataTableTwoProps) => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(tbodyContent.length).fill(false)
  );
  const [searchParams] = useSearchParams();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !checkedItems[index];
    setCheckedItems(updatedCheckedItems);
    setIsAllChecked(updatedCheckedItems.every((item) => item === true));

    // Get all selected indices
    const selectedIndices = updatedCheckedItems
      .map((checked, idx) => (checked ? idx : -1))
      .filter((idx) => idx !== -1);

    onRowSelection && onRowSelection(selectedIndices);
  };

  const handleSelectAllChange = () => {
    const newCheckedState = !isAllChecked;
    const updatedCheckedItems = new Array(tbodyContent.length).fill(
      newCheckedState
    );
    setCheckedItems(updatedCheckedItems);
    setIsAllChecked(newCheckedState);

    // Get all selected indices when "Select All" is checked
    const selectedIndices = newCheckedState
      ? Array.from({ length: tbodyContent.length }, (_, i) => i)
      : [];

    onRowSelection && onRowSelection(selectedIndices);
  };

  // FILTERED DATA BASED ON SEARCH
  const filteredData = onSearchChange
    ? tbodyContent
    : tbodyContent.filter(
        (row) =>
          row &&
          row.some((cell) => {
            // HANDLE UNDEFINED OR NULL TD
            if (cell === undefined || cell === null) {
              return false;
            }

            // CHECK IS CODE IS TEXT OR NOT
            if (typeof cell === "string") {
              return cell.toLowerCase().includes(searchTerm.toLowerCase());
            }

            // CHECK CONVERT THE ELEMENT TO JSX CODE
            if (React.isValidElement(cell)) {
              const element = cell as React.ReactElement;
              const children = element.props?.children;
              return (
                children &&
                children
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
            }

            return false; // Fallback
          })
      );

  // Calculate the current items to display based on pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // SHOW DATA TABLE ITEMS I WANT TO SHOW 10
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const { t } = useTranslation(["main"]);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <div className="all-table-content">
      {isShowContentFilterInfo && (
        <div
          className={`main-content-filter-top flex justify-between items-center   gap-[15px] mt-2 mb-5 ${
            isTrueButtonsModalContentRight
              ? "main-table-top-content"
              : "flex-wrap"
          }`}
        >
          {/* =============== START ALL INPUT SEARCH =============== */}
          <div
            className={`all-input-search  item-center-flex ${
              isTrueButtonsModalContentRight === true ? "activeMainContent" : ""
            }`}
          >
            {/* =============== START BUTTONS CONTENT MODAL =============== */}
            {isTrueButtonsModalContentRight && (
              <div className="item-main--1 buttons-modal-content item-center-flex">
                {isTrueButtonTwoModalContent && (
                  <button
                    onClick={functionModalButtonTwo}
                    className={`btn-main py-[10px]  ${newClassButtonTwo}`}
                  >
                    <FontAwesomeIcon icon={faPlus} /> {textContetButtonTwo}
                  </button>
                )}
                <div className="main-button-show flex items-center">
                  <button
                    onClick={functionButtonModalOne}
                    className={`btn-main py-[10px] ${
                      showButtonImportExcel ? "rounded-[0px_8px_8px_0px]" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faPlus} /> {textContentButtonOne}
                  </button>
                  {showButtonImportExcel && (
                    <ActionData
                      menuItems={actionButtonsDrop}
                      isChevronDown={true}
                    />
                  )}
                </div>
              </div>
            )}

            {/* =============== END BUTTONS CONTENT MODAL =============== */}

            {/* =============== START UNPUT SEARCH ============ */}
            <div className="input-search-info item-main--1 relative flex w-full gap-2 md:w-max">
              <input
                type="text"
                id="search_input2"
                className={`${
                  isShowModalButtonFilter === true ? "w-[260px]" : "w-[330px]"
                } input-search  rounded-[6px]  !border-lightColorWhite2 py-[12px] bg-lightGrayColor placeholder:text-blue-gray-300 focus:!border-lightColorWhite2 focus:shadow-none`}
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearchChange?.(e);
                }}
                required
              />
              <div className="search-table-icon !absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={NavSearchIcon} alt="search" />
              </div>
            </div>
            {/* =============== END UNPUT SEARCH ============ */}

            {showDateFilter && (
              <DatePickerComponent
                maxDate={new Date()}
                addTextPlaceHolder="--/--/--"
                value={
                  searchParams.get("date")
                    ? new Date(searchParams.get("date"))
                    : new Date()
                }
                onDateChange={(date) => onChangeDateFilter(date)}
              />
            )}
            {isShowModalButtonFilter && (
              <button
                type="button"
                onClick={functionButtonFilter}
                className="button-transparent btn-filter-table !p-[12px_14px] !gap-[5px]"
              >
                <FilterIcon />{t('filter')}
              </button>
            )}
          </div>
          {/* =============== END ALL INPUT SEARCH =============== */}
          {/* =============== START ALL BUTTONS ACTIONS =============== */}
          <div className="all-buttons-actions item-center-flex">
            <CopyFunction filteredData={filteredData} />
            <ExcelButtonFunction />
            <PdfButtonFunction />
          </div>
          {/* =============== END ALL BUTTONS ACTIONS =============== */}
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`overflow-x-auto data-table-content--1 scrollbarChange ${
            withCheckboxes ? "data-table-checkbox" : ""
          }`}
        >
          <Table id="dataTable">
            {filteredData.length === 0 ? (
              <NotDataFound />
            ) : (
              <>
                <Table.Head className="border-b rounded-[15px] bg-lightGrayColor">
                  {withCheckboxes && (
                    <Table.HeadCell className="th-table th-check-top !bg-transparent !rounded-[0px] text-font-dark text-start">
                      <div className="th-div">
                        <label className="custom-checkbox-container">
                          <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleSelectAllChange}
                            className="custom-checkbox"
                          />
                          <span className="custom-checkmark"></span>
                        </label>
                      </div>
                    </Table.HeadCell>
                  )}
                  {theadContent.map((header, index) => (
                    <Table.HeadCell
                      className="th-table !bg-transparent !rounded-[0px] text-font-dark text-start"
                      key={index}
                    >
                      <div className="th-div">{header}</div>
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {paginatedData.map((row, rowIndex) => (
                    <Table.Row
                      key={rowIndex}
                      className="bg-white text-font-dark table-row-hover"
                    >
                      {withCheckboxes && (
                        <Table.Cell className="whitespace-nowrap td-check">
                          <label className="custom-checkbox-container">
                            <input
                              type="checkbox"
                              checked={checkedItems[rowIndex]}
                              onChange={() => handleCheckboxChange(rowIndex)}
                              className="custom-checkbox"
                            />
                            <span className="custom-checkmark"></span>
                          </label>
                        </Table.Cell>
                      )}
                      {row.map((cell, cellIndex) => (
                        <Table.Cell
                          key={cellIndex}
                          className="whitespace-nowrap"
                        >
                          {cell ?? "-"}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </>
            )}
          </Table>
        </div>
      )}
      {/* PAGINATION */}

      {filteredData.length > itemsPerPage && (
        <>
          <div className="pagination-info text-[15px] font-semibold mt-5 text-gray-500  ltr:text-end rtl:text-start">
            الصفحة{" "}
            <span className="text-[18px] text-darkColor">
              {currentPage + 1}
            </span>{" "}
            /{" "}
            <span className="text-[18px] text-darkColor">
              {Math.ceil(filteredData.length / itemsPerPage)}
            </span>
          </div>
          <PaginationPage
            itemCount={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

DataTableTwo.propTypes = {
  theadContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  tbodyContent: PropTypes.arrayOf(PropTypes.array).isRequired,
  withCheckboxes: PropTypes.bool,
  isShowContentFilterInfo: PropTypes.bool,
  isShowModalButtonFilter: PropTypes.bool,
  functionButtonFilter: PropTypes.func,
  isTrueButtonsModalContentRight: PropTypes.bool,
  functionButtonModalOne: PropTypes.func,
  textContentButtonOne: PropTypes.string,
  isTrueButtonTwoModalContent: PropTypes.bool,
  functionModalButtonTwo: PropTypes.func,
  textContetButtonTwo: PropTypes.string,
  newClassButtonTwo: PropTypes.string
};

export default DataTableTwo;

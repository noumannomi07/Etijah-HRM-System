import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { ReactNode, useState } from "react";
import "./ModalDetails.css";

import axiosInstance from "@/utils/axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { toast } from "react-toastify";
import ModalAddCommentTabs from "@/Dashboard/Pages/Orders/Components/ModalAddCommentTabs/ModalAddCommentTabs";
import useTabId from "@/Dashboard/Pages/Orders/hook/useTabId";
import DataComments from "@/Dashboard/Pages/Orders/Components/ModalAddCommentTabs/DataComments";
import DetailsInfoDiv from "./DetailsInfoDiv";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";

interface ModalDetailsProps {
  titleHeaderModal: string;
  openModalDetails: boolean;
  onClikEdit: () => void;
  hiddenModalDetails: () => void;
  selectedRow: any;
  children?: ReactNode;
  refetch?: () => void;
  isShowProgress?: boolean;
  route: string;
  newClassModalAdd: string;
  childenContent2?: ReactNode;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  titleHeaderModal,
  onClikEdit,
  openModalDetails,
  hiddenModalDetails,
  selectedRow,
  children,
  refetch,
  isShowProgress,
  route,
  newClassModalAdd = "",
  childenContent2
}) => {
  const { t } = useTranslation("orders");
  //   OPEN MODAL ADD COMMENT
  const tabId = useTabId();
  const [isOpenModalComments, setIsOpenModalComments] = useState(false);
  
  const openModalComments = () => {
    setIsOpenModalComments(true);
  };

  const closeAllModals = () => {
    setIsOpenModalComments(false);
    hiddenModalDetails();
  };

  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ إرسال الحالة
  const sendStatus = (status: "approved" | "rejected") => {
    if (!selectedRow?.id) return;

    setIsUpdating(true);
    axiosInstance
      .post(`/${route}`, {
        request_id: selectedRow.id,
        status: status
      })
      .then(() => {
        refetch && refetch();
        hiddenModalDetails();
        toast.success(
          t(
            status == "approved"
              ? "modals.success.requestAccepted"
              : "modals.reject.successMessage"
          )
        );
      })
      .catch((err) => {
        console.error("selectedRow status error:", err);
        toast.error(
          err.response?.data?.message || t("modals.error.requestRejected")
        );
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const calculatedPercentage =
    ((selectedRow?.days_calculated?.left_days ?? 0) /
      (selectedRow?.days_calculated?.real_days ?? 1)) *
    100;

  return (
    <>
      <CustomModal
        newClassModal={`modal-request ${newClassModalAdd}`}
        isOpen={openModalDetails}
        handleOpen={hiddenModalDetails}
        titleModal={
          <div className="header-modal-details flex items-center justify-between ml-2">
            {titleHeaderModal}
            <div
              onClick={onClikEdit}
              className="button-transparent button-hover-svg h-[42px]"
            >
              <EditIcon />
            </div>
          </div>
        }
        classBodyContent={""}
      >
        <div className="card-info-content">
          {isShowProgress && (
            <div className="header-top-info">
              <div className="progress-info w-full mt-2 mb-6">
                <div className="top-content-pro self-stretch w-full mb-2 justify-between items-center inline-flex">
                  <h2 className="text-font-gray leading-snug">
                    {t("modals.details.remainingBalance")}
                  </h2>
                  <p className="text-font-dark text-[16px] leading-snug">
                    {selectedRow?.days_calculated?.left_days ?? "-"} {t("modals.details.daysOf")}{" "}
                    {selectedRow?.days_calculated?.real_days ?? "-"} {t("modals.details.day")}
                  </p>
                </div>
                <div className="relative w-full h-[16px] bg-lightColorWhite2 rounded-[10px]">
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: `${calculatedPercentage}%`
                    }}
                    className="h-[16px] bg-orangeColor rounded-[10px]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="content-details  border-width-content my-5">
            <div className="main-content-details-info">
              {children}

              {selectedRow?.status && (
                <DetailsInfoDiv
                  newClassName={"flex-between"}
                  titleDetails={t("modals.details.approvalManager")}
                  textDetails={""}
                >
                  <p className="status-m  text-[16px] font-semibold ">
                    <StatusBadge status={selectedRow.status} />
                  </p>
                </DetailsInfoDiv>
              )}
              {selectedRow?.comments && (
                <div className="comments-scroll">
                  <DataComments comments={selectedRow.comments} onAddCommentClick={openModalComments}/>
                </div>
              )}
            </div>
            {childenContent2}
          </div> 

          {selectedRow?.status === "pending" && (
            <div className="footer-card item-center-flex mt-5 flex justify-end items-end">
              <button
                disabled={isUpdating}
                onClick={() => sendStatus("approved")}
                className="btn-main w-full sm:w-auto button-green height--50"
              >
                {isUpdating ? <SpinnerLoader /> : t("buttons.approve")}
              </button>
              <button
                disabled={isUpdating}
                onClick={() => sendStatus("rejected")}
                className="btn-main w-full sm:w-auto height--50 bg-redColor01 border-redColor01"
              >
                {isUpdating ? <SpinnerLoader /> : t("buttons.reject")}
              </button>
              {/* <button
                className={`btn-main w-full sm:w-auto  height--50 ${
                  selectedRow?.status === "pending" ? "" : "ms-auto"
                }`}
                onClick={openModalComments}
              >
                {t("modals.details.addComment")}
              </button> */}
            </div>
          )}
        </div>
      </CustomModal>

      <ModalAddCommentTabs
        openModalComments={isOpenModalComments}
        hiddenModalComments={closeAllModals}
        selectedRowId={selectedRow?.id}
        tabId={tabId}
        comments={selectedRow?.comments}
        refetch={refetch}
      />
    </>
  );
}; 

export default ModalDetails;

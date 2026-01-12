import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import { ReactNode, useState } from "react";
import "./ModalVacationDetails.css";

import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";

import FetchDataById from "@/Dashboard/Components/FetchingDataByID/FetchEmployeeByID";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import React from "react";

import { AirlineTicket } from "@/Dashboard/Pages/types";
import ModalSendComment from "../../../ModalsOrder/ModalSendComment/ModalSendComment";
import ModalReject from "../../../ModalsOrder/ModalReject/ModalReject";
import { useTranslation } from "react-i18next";

interface ModalVacationDetailsProps {
  endPoint: string;
  titleHeaderModal: string;
  openModalDetails: boolean;
  hiddenModalDetails: () => void;
  routePageAdd?: string;
  isShowButtons?: boolean;
  isShowProgress?: boolean;
  SelectedElement?: AirlineTicket;
  children?: ReactNode;
}

const ModalVacationDetails: React.FC<ModalVacationDetailsProps> = ({
  endPoint,
  titleHeaderModal,
  openModalDetails,
  hiddenModalDetails,
  isShowButtons,
  isShowProgress,
  SelectedElement,
  children,
}) => {
  const { t } = useTranslation("orders");

  const deleteVacationRequest = (id: number) => {
    axiosInstance
      .delete(`${endPoint}/${id}`, {
        headers: {
          "Accept-Language": i18next.language,
        },
      })
      .then((res) => {
        // refetchFunc();
      });
  };
  // MODAL SUCCESS FUNCTION
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const openModalSuccessFunction = () => {
    setOpenModalSuccess(true);
    hiddenModalDetails();
  };

  const hideModalSuccess = () => {
    setOpenModalSuccess(false);
  };

  // MODAL DELTE FUNCTION
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const openModalDeleteFunction = () => {
    setOpenModalDelete(true);
    hiddenModalDetails();
  };

  const hideModalDelete = () => {
    setOpenModalDelete(false);
  };
  // MODAL DELTE FUNCTION
  const [openModalSendComment, setOpenModalSendComment] = useState(false);
  const openModalSendCommentFunction = () => {
    setOpenModalSendComment(true);
    hiddenModalDetails();
  };

  const hideModalSendComment = () => {
    setOpenModalSendComment(false);
  };

  // MODAL DELTE FUNCTION
  const [openModalReject, setOpenModalReject] = useState(false);
  const openModalRejectFunction = () => {
    setOpenModalReject(true);
    hiddenModalDetails();
  };

  const hideModalReject = () => {
    setOpenModalReject(false);
  };

  return (
    <>
      <FetchDataById
        id={SelectedElement?.employee}
        onDataFetched={() => null}
      />
      <SuccessSend
        newClassModal="small-modal"
        openSuccess={openModalSuccess}
        hiddenModalSuccess={hideModalSuccess}
        textTitleTop={t("modals.approve.success")}
        textInfoModal={t("modals.approve.successMessage")}
      />
      <ModalDelete
        openModalDelete={openModalDelete}
        hiddenModalDelete={hideModalDelete}
        titleModal={t("modals.delete.title")}
        textModal={t("modals.delete.message")}
        onDelete={() => {
          if (SelectedElement?.id) {
            deleteVacationRequest(SelectedElement.id);
          }
        }}
      />

      <ModalSendComment
        openModalSendComment={openModalSendComment}
        hiddenModalSendComment={hideModalSendComment}
      />
      <ModalReject
        openModalReject={openModalReject}
        hiddenModalReject={hideModalReject}
      />
      <CustomModal
        newClassModal={"modal-request"}
        isOpen={openModalDetails}
        handleOpen={hiddenModalDetails}
        titleModal={titleHeaderModal}
        classBodyContent={""}
      >
        <div className="card-info-content">
          <div className="content-details border-width-content my-5">
            <div className="main-content-details-info">{children}</div>
          </div>
          {isShowButtons && (
            <>
              <div className="footer-card item-center-flex mt-5 flex justify-end items-end">
                <button
                  onClick={openModalSuccessFunction}
                  className="btn-main w-full sm:w-auto button-green height--50"
                >
                  {t("buttons.approve")}
                </button>
                <button
                  onClick={openModalRejectFunction}
                  className="btn-main w-full sm:w-auto height--50 bg-redColor01 border-redColor01"
                >
                  {t("buttons.reject")}
                </button>
                <button
                  onClick={openModalSendCommentFunction}
                  className="btn-main w-full sm:w-auto height--50"
                >
                  {t("buttons.comment")}
                </button>
              </div>
            </>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default ModalVacationDetails;

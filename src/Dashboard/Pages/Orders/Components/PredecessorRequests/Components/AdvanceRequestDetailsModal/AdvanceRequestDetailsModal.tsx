import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import { ReactNode, useState } from "react";
import "./AdvanceRequestDetailsModal.css";

import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";

import React from "react";
import { Advance, EStatus } from "@/Dashboard/Pages/types";
import ModalReject from "../../../ModalsOrder/ModalReject/ModalReject";
import { useUpdateAdvanceStatus } from "@/hooks/orders/advances/useUpdateAdvanceStatus";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface AdvanceRequestDetailsModalProps {
  titleHeaderModal: string;
  openModalDetails: boolean;
  hiddenModalDetails: () => void;
  routePageAdd?: string;
  isShowButtons?: boolean;
  isShowProgress?: boolean;
  SelectedElement?: Advance;
  children?: ReactNode;
}

const AdvanceRequestDetailsModal: React.FC<AdvanceRequestDetailsModalProps> = ({
  titleHeaderModal,
  openModalDetails,
  hiddenModalDetails,
  isShowButtons,
  SelectedElement,
  children,
}) => {
  const { t } = useTranslation("orders");
  const { mutate: updateAdvanceStatus, isPending: isUpdating } = useUpdateAdvanceStatus({
    onSuccess: (_, variables) => {
      hiddenModalDetails();
      if (variables.status === EStatus.Approved) {
        setOpenModalSuccess(true);
      } else if (variables.status === EStatus.Rejected) {
        toast.success(t("advanceRequests.rejectedSuccessMessage"));
      }
    },
    onError: () => {
      hiddenModalDetails();
      toast.error(t("toasts.updateStatusError"));
    }
  });

  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const openModalSuccessFunction = () => {
    if (SelectedElement?.id) {
      updateAdvanceStatus({
        advance_id: SelectedElement.id,
        status: EStatus.Approved
      });
    }
  };

  const hideModalSuccess = () => {
    setOpenModalSuccess(false);
  };

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const hideModalDelete = () => {
    setOpenModalDelete(false);
  };

  const [openModalSendComment, setOpenModalSendComment] = useState(false);

  const openModalSendCommentFunction = () => {
    if (SelectedElement?.id) {
      updateAdvanceStatus({
        advance_id: SelectedElement.id,
        status: EStatus.Pending
      });
    }
  };

  const hideModalSendComment = () => {
    setOpenModalSendComment(false);
  };

  const [openModalReject, setOpenModalReject] = useState(false);
  const openModalRejectFunction = () => {
    if (SelectedElement?.id) {
      updateAdvanceStatus({
        advance_id: SelectedElement.id,
        status: EStatus.Rejected
      });
    }
  };

  const hideModalReject = () => {
    setOpenModalReject(false);
  };

  return (
    <>
      <SuccessSend
        newClassModal="small-modal"
        openSuccess={openModalSuccess}
        hiddenModalSuccess={hideModalSuccess}
        textTitleTop={t("advanceRequests.approvedSuccessTitle")}
        textInfoModal={t("advanceRequests.approvedSuccessMessage")}
      />
      <ModalDelete
        openModalDelete={openModalDelete}
        hiddenModalDelete={hideModalDelete}
        titleModal={t("modals.delete.deleteRequestTitle")}
        textModal={t("modals.delete.deleteRequestDescription")}
        onDelete={() => { }}
      />

      {/* <ModalSendComment
        openModalSendComment={openModalSendComment}
        hiddenModalSendComment={hideModalSendComment}
      /> */}
      <ModalReject
        openModalReject={false}
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
                  disabled={isUpdating}
                  onClick={openModalSuccessFunction}
                  className="btn-main w-full sm:w-auto button-green height--50"
                >
                  {t("buttons.approve")}
                </button>
                <button
                  disabled={isUpdating}
                  onClick={openModalRejectFunction}
                  className="btn-main w-full sm:w-auto height--50 bg-redColor01 border-redColor01"
                >
                  {t("buttons.reject")}
                </button>
                {/* <button
                  onClick={openModalSendCommentFunction}
                  className="btn-main w-full sm:w-auto height--50"
                >
                  {t("buttons.comment")}
                </button> */}
              </div>
            </>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default AdvanceRequestDetailsModal;

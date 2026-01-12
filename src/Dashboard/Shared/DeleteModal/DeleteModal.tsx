import React from "react";
import TrashIconBg from "@assets/Icons/TrashIconBg.svg";
import CustomModal from "../CustomModal/CustomModal";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  iconDelete?: React.ReactNode;
  toggleModalDelete: () => void;
  titleModal: string;
  isOpen: boolean;
  textModal: string;
  textButtonYes?: string;
  onDelete: () => void;
  isDeleting: boolean;
  className?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  iconDelete = <img src={TrashIconBg} alt="Delete icon" aria-hidden="true" />,
  toggleModalDelete,
  isOpen,
  titleModal,
  textModal,
  textButtonYes,
  onDelete,
  isDeleting,
  className = ""
}) => {
  const { t } = useTranslation("main");
  const yesText = textButtonYes || t("YesDelete");
  const modalTitle = titleModal;
  const modalText = textModal;
  return (
    <CustomModal
      newClassModal={`modal-delete small-modal ${className}`}
      isOpen={isOpen} // Controlled by parent
      handleOpen={toggleModalDelete}
      titleModal={iconDelete}
      classBodyContent=""
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className="content-delete-modal">
        <h2
          id="delete-modal-title"
          className="title text-font-dark text-[15px] sm:text-[17px] font-medium"
        >
          {modalTitle}
        </h2>
        <p
          id="delete-modal-description"
          className="text text-font-gray text-[14px] sm:text-[15px] pt-2 leading-normal"
        >
          {modalText}
        </p>
        <div className="all-buttons-modal-bottom flex items-center justify-end gap-3 w-full mt-4">
          <button
            onClick={toggleModalDelete}
            className="button-transparent height--50 w-full sm:w-auto px-4"
            disabled={isDeleting}
            aria-label="Cancel deletion"
          >
            {t("NoBack")}
          </button>
          <button
            onClick={onDelete}
            className="btn-main button-danger height--50 w-full sm:w-auto px-4"
            disabled={isDeleting}
            aria-label={textButtonYes}
            aria-busy={isDeleting}
          >
            {isDeleting ? <SpinnerLoader /> : yesText}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default React.memo(DeleteModal);

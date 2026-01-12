import React from "react";
import TrashIconBg from "@assets/Icons/TrashIconBg.svg";
import CustomModal from "../CustomModal/CustomModal";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useState } from "react";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";

interface ModalDeleteProps {
    iconDelete?: React.ReactNode;
    openModalDelete: boolean;
    hiddenModalDelete: () => void;
    titleModal: string;
    textModal: string;
    textButtonYes?: string;
    onDelete: () => void;
}

interface CustomModalProps {
    newClassModal: string;
    isOpen: boolean;
    handleOpen: () => void;
    titleModal: string | React.ReactNode;
    classBodyContent: string;
    children?: React.ReactNode;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
    iconDelete = <img src={TrashIconBg} alt="delete" />,
    openModalDelete,
    hiddenModalDelete,
    titleModal,
    textModal,
    textButtonYes,
    onDelete,
}) => {
    const { t } = useTranslation("main");

    // LOADER BUTTON
    const [loader, setLoader] = useState(false);

    const toastSuccess = () => {
        setLoader(true); // ADD ACTIVE FOR LOADER
        // AFTER 800MS ADD FALSE TO LOADER AND ADD TOAST SUCCESS TO SEND AND HIDDEN MODAL
        setLoader(false);
        toast.success(t("toasts.deleteSuccess"));
        onDelete(); // FUNCTION FOR DELETE ITEMS USE ID
        hiddenModalDelete(); // FUNCTION FOR HIDE MODAL
    };

    return (
        <CustomModal
            newClassModal={"modal-delete small-modal"}
            isOpen={openModalDelete}
            handleOpen={hiddenModalDelete}
            titleModal={iconDelete as string}
            classBodyContent={""}
        >
            <div className="content-delete-modal">
                <h2 className="title text-font-dark text-[15px] sm:text-[17px]">
                    {titleModal}
                </h2>
                <p className="text text-font-gray text-[14px] sm:text-[15px] pt-2">
                    {textModal}
                </p>
                <div className="all-buttons-modal-bottom item-center-flex justify-end w-full  mt-3">
                    <button
                        onClick={toastSuccess}
                        className="btn-main button-danger height--50 w-full sm:w-auto"
                    >
                        {loader ? <SpinnerLoader /> : textButtonYes || t("YesDelete")}
                    </button>
                    <button
                        onClick={hiddenModalDelete}
                        className="button-transparent height--50 w-full sm:w-auto"
                    >
                        {t("NoBack")}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

ModalDelete.propTypes = {
    iconDelete: PropTypes.node,
    openModalDelete: PropTypes.bool.isRequired,
    hiddenModalDelete: PropTypes.func.isRequired,
    titleModal: PropTypes.string.isRequired,
    textModal: PropTypes.string.isRequired,
    textButtonYes: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export default ModalDelete;

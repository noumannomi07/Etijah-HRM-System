import UploadIcon from "@assets/images/salarymarches/modalsicons/uploadicon.svg";

import PropTypes from "prop-types";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UseModal = ({
    isSendTransactionModalOpen,
    isApprovalSalariesModalOpen,
    setSendTransactionModalOpen,
    setApprovalSalariesModalOpen,
    selectedRows,
    setRefetch,
}) => {
    const { t } = useTranslation('salaryMarches');
    // HIDDEN MODAL TRANSACTION
    const handleCloseModal = () => setSendTransactionModalOpen(false);

    const [searchParams] = useSearchParams();
    const start_of_month = searchParams.get("start_of_month");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendTransaction = async () => {
        if (!start_of_month) {
            toast.error(t('modal.sendTransaction.errorSelectMonth'));
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append(
                "year",
                new Date(start_of_month).getFullYear().toString()
            );
            formData.append(
                "month",
                (new Date(start_of_month).getMonth() + 1).toString()
            );

            selectedRows.forEach((row, index) => {
                formData.append(`employees[${index}]`, row.id.toString());
            });

            await axiosInstance.post("/payroll-transaction", formData);
            setRefetch && setRefetch((prev) => !prev);
            toast.success(t('modal.sendTransaction.success'));
            handleCloseModal();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || t('modal.sendTransaction.error')
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* ==================== START SEND TRANSACTION ===================== */}
            <CustomModal
                newClassModal={"modal-delete small-modal"}
                isOpen={isSendTransactionModalOpen}
                handleOpen={handleCloseModal}
                titleModal={
                    <>
                        <img src={UploadIcon} alt="upload" />
                    </>
                }
                classBodyContent={""}
            >
                <div className="content-delete-modal">
                    <h2 className="title text-font-dark text-[17px] sm:text-[20px]">
                        {t('modal.sendTransaction.title')}
                    </h2>
                    <p className="text text-font-gray text-[15px] sm:text-[17px] pt-2">
                        {t('modal.sendTransaction.message')}
                    </p>
                    <div className="all-buttons-modal-bottom item-center-flex justify-end w-full mt-5">
                        <button
                            onClick={handleSendTransaction}
                            className={`btn-main height--50 w-full sm:w-auto `}
                            disabled={isLoading}
                        >
                            {isLoading ? <SpinnerLoader /> : t('modal.sendTransaction.confirm')}
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="button-transparent height--50 w-full sm:w-auto"
                        >
                            {t('modal.sendTransaction.cancel')}
                        </button>
                    </div>
                </div>
            </CustomModal>
            {/* ==================== END SEND TRANSACTION ===================== */}

            {/* ================== END APPROVAL SALARIES =================== */}
        </>
    );
};
UseModal.propTypes = {
    handleOpenModal: PropTypes.func.isRequired,
    handleOpenModalApprovalSalaries: PropTypes.func.isRequired,
    isSendTransactionModalOpen: PropTypes.bool.isRequired,
    isApprovalSalariesModalOpen: PropTypes.bool.isRequired,
    setSendTransactionModalOpen: PropTypes.func.isRequired,
    setApprovalSalariesModalOpen: PropTypes.func.isRequired,
};
export default UseModal;

import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";

interface ModalButtonsProps {
    hiddenModal: () => void;
    handleSubmit: () => void;
    buttonResetText?: string;
    buttonSaveText?: string;
    resetSuccessMessage?: string;
    isLoading?: boolean;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
    hiddenModal,
    handleSubmit,
    buttonResetText = "اعادة تعيين",
    buttonSaveText = "بحث",
    resetSuccessMessage = "تم إستعادة الفلتر بنجاح.",
    isLoading = false,
}) => {
    const successButton = () => {
        // SUCCESS BUTTON
        toast.success(resetSuccessMessage);
        hiddenModal();
    };

    const successButton2 = () => {
        // SUCCESS BUTTON 2
        handleSubmit();
    };

    return (
        <div className="buttons-modal item-center-flex mt-5 w-full justify-end">
            {buttonResetText === "" ? (
                ""
            ) : (
                <button
                    type="button"
                    onClick={successButton}
                    className="button-filter-one button-transparent h-[50px] hover:bg-redColor01 hover:border-redColor01"
                    disabled={isLoading}
                >
                    {buttonResetText}
                </button>
            )}

            <button
                onClick={successButton2}
                type="submit"
                className="button-filter-one btn-main h-[50px]"
                disabled={isLoading}
            >
                {isLoading ? <SpinnerLoader /> : buttonSaveText}
            </button>
        </div>
    );
};

ModalButtons.propTypes = {
    hiddenModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonResetText: PropTypes.string,
    buttonSaveText: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default ModalButtons;

import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

interface ButtonsFormSendCancelProps {
    cancelAdd: () => void;
    submitButton: () => void;
    isSubmittingDisabled?: boolean;
    isSubmitting?: boolean;
}

const ButtonsFormSendCancel = (props: ButtonsFormSendCancelProps) => {
    const { t } = useTranslation("orders");
    const {
        cancelAdd,
        submitButton,
        isSubmittingDisabled = false,
        isSubmitting = false,
    } = props;
    return (
        <div className="buttons-form item-center-flex mt-6 justify-end">
            <button
                type="button"
                className="w-full sm:w-auto button-transparent hover:bg-redColor01 hover:border-redColor01 height--50"
                onClick={cancelAdd}
            >
                {t("buttons.cancel")}
            </button>
            <button
                disabled={isSubmittingDisabled || isSubmitting}
                type="button"
                className="w-full sm:w-auto btn-main height--50 disabled:opacity-75"
                onClick={submitButton}
            >
                {isSubmitting ? <SpinnerLoader /> : t("buttons.submit")}
            </button>
        </div>
    );
};

ButtonsFormSendCancel.propTypes = {
    cancelAdd: PropTypes.func.isRequired,
    submitButton: PropTypes.func.isRequired,
};

export default ButtonsFormSendCancel;

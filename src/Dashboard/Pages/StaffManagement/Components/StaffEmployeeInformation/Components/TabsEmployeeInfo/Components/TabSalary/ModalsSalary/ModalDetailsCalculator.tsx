import React from "react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";

type ModalDetailsCalculatorProps = {
    openModalCalc: boolean;
    hiddenModalModalCalc: () => void;
};

const ModalDetailsCalculator = ({
    openModalCalc,
    hiddenModalModalCalc,
}: ModalDetailsCalculatorProps) => {
    const { t } = useTranslation("staffManagement");

    return (
        <>
            <CustomModal
                newClassModal={"medium-modal"}
                isOpen={openModalCalc}
                handleOpen={hiddenModalModalCalc}
                titleModal={t("salary.endOfServiceCalculator")}
                classBodyContent={""}
            >
                <div className="content-details-calc bg-lightColorWhite border rounded-[12px] p-[25px_15px] text-center item-center-flex flex-col ">
                    <div className="info-top-content">
                        <h2 className="title text-font-gray">
                            {t("salary.endOfServiceAmount")}
                        </h2>
                        <div className="number-money text-font-dark">
                            {openModalCalc} <Saudiriyal/>
                        </div>
                    </div>
                </div>
                <div className="all-buttons-bottom w-full flex-wrap-reverse  sm:flex-nowrap item-center-flex mt-4">
                    <button
                        onClick={hiddenModalModalCalc}
                        className="button-transparent button-transparent-danger w-full height--50"
                    >
                        {t("common.cancel")}
                    </button>
                    <button
                        onClick={hiddenModalModalCalc}
                        className="btn-main w-full  height--50"
                    >
                        {t("salary.approveAmount")}
                    </button>
                </div>
            </CustomModal>
        </>
    );
};

ModalDetailsCalculator.propTypes = {
    openModalCalc: PropTypes.bool.isRequired,
    hiddenModalModalCalc: PropTypes.func.isRequired,
};

export default ModalDetailsCalculator;

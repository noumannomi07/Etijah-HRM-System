import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { ReactNode, useState } from "react";
import "./ModalVacationDetails.css";

import axiosInstance from "@/utils/axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { toast } from "react-toastify";

interface ModalVacationDetailsProps {
    titleHeaderModal: string;
    openModalDetails: boolean;
    hiddenModalDetails: () => void;
    vacation: any;
    children?: ReactNode;
    refetch: () => void;
    isShowProgress: boolean;
}

const ModalVacationDetails: React.FC<ModalVacationDetailsProps> = ({
    titleHeaderModal,
    openModalDetails,
    hiddenModalDetails,
    vacation,
    children,
    refetch,
    isShowProgress,
}) => {
    const { t } = useTranslation("orders");

    const [isUpdating, setIsUpdating] = useState(false);

    // ✅ إرسال الحالة
    const sendVacationStatus = (status: "approved" | "rejected") => {
        if (!vacation?.id) return;

        setIsUpdating(true);
        axiosInstance
            .post("/vacationsstatus", {
                vacation_id: vacation.id,
                status: status,
            })
            .then((res) => {
                refetch();
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
                console.error("Vacation status error:", err);
                toast.error(t("modals.error.requestRejected"));
            })
            .finally(() => {
                setIsUpdating(false);
            });
    };

    const calculatedPercentage =
        ((vacation?.days_calculated?.left_days ?? 0) /
            (vacation?.days_calculated?.real_days ?? 1)) *
        100;

    return (
        <>
            <CustomModal
                newClassModal={"modal-request"}
                isOpen={openModalDetails}
                handleOpen={hiddenModalDetails}
                titleModal={titleHeaderModal}
                classBodyContent={""}
            >
                <div className="card-info-content">
                    {isShowProgress && (
                        <div className="header-top-info">
                            <div className="progress-info w-full mt-2 mb-6">
                                <div className="top-content-pro self-stretch w-full mb-2 justify-between items-center inline-flex">
                                    <h2 className="text-font-gray leading-snug">
                                        الرصيد المتبقي
                                    </h2>
                                    <p className="text-font-dark text-[16px] leading-snug">
                                        {vacation?.days_calculated?.left_days ??
                                            "-"}{" "}
                                        يوم من{" "}
                                        {vacation?.days_calculated?.real_days ??
                                            "-"}{" "}
                                        يوم
                                    </p>
                                </div>
                                <div className="relative w-full h-[16px] bg-lightColorWhite2 rounded-[10px]">
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            width: `${calculatedPercentage}%`,
                                        }}
                                        className="h-[16px] bg-orangeColor rounded-[10px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="content-details border-width-content my-5">
                        <div className="main-content-details-info">
                            {children}

                            {vacation?.status && (
                                <p className="mt-4 text-[15px] font-medium">
                                    {t("tableHeaders.status")}:{" "}
                                    <StatusBadge status={vacation.status} />
                                </p>
                            )}
                        </div>
                    </div>

                    {vacation?.status === "pending" && (
                        <div className="footer-card item-center-flex mt-5 flex justify-end items-end">
                            <button
                                disabled={isUpdating}
                                onClick={() => sendVacationStatus("approved")}
                                className="btn-main w-full sm:w-auto button-green height--50"
                            >
                                {isUpdating ? (
                                    <SpinnerLoader />
                                ) : (
                                    t("buttons.approve")
                                )}
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={() => sendVacationStatus("rejected")}
                                className="btn-main w-full sm:w-auto height--50 bg-redColor01 border-redColor01"
                            >
                                {isUpdating ? (
                                    <SpinnerLoader />
                                ) : (
                                    t("buttons.reject")
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </CustomModal>
        </>
    );
};

export default ModalVacationDetails;

import { useState } from "react";
import HeaderProfileInfo from "@/Dashboard/Shared/HeaderProfileInfo/HeaderProfileInfo";
import ModalSherdDifferentContent from "@/Dashboard/Shared/ModalSherdDifferentContent/ModalSherdDifferentContent";
import imageUser from "@assets/images/homeimages/users/male.png";
import UserBgIcon from "@assets/Icons/UserBgIcon.svg";
import UserBgDangerIcon from "@assets/Icons/UserBgDangerIcon.svg";
import "./HeaderEmploymentInfo.css";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { queryClient } from "@/utils/queryClient";
import { useTranslation } from "react-i18next";

const getStatusActions = (t) => ({
    accepted: {
        title: t('candidateFile.statusActions.accept.title'),
        icon: UserBgIcon,
        successMessage: t('candidateFile.statusActions.accept.successMessage'),
        buttonText: t('candidateFile.statusActions.accept.confirmButton'),
        buttonClass: "",
        nextStatus: "accepted",
    },
    rejected: {
        title: t('candidateFile.statusActions.reject.title'),
        icon: UserBgDangerIcon,
        successMessage: t('candidateFile.statusActions.reject.successMessage'),
        buttonText: t('candidateFile.statusActions.reject.confirmButton'),
        buttonClass: "button-danger",
        nextStatus: "rejected",
    },
    on_hold: {
        title: t('candidateFile.statusActions.onHold.title'),
        icon: UserBgDangerIcon,
        successMessage: t('candidateFile.statusActions.onHold.successMessage'),
        buttonText: t('candidateFile.statusActions.onHold.confirmButton'),
        buttonClass: "",
        nextStatus: "on_hold",
    },
    hire: {
        title: t('candidateFile.statusActions.hire.title'),
        icon: UserBgIcon,
        successMessage: t('candidateFile.statusActions.hire.successMessage'),
        buttonText: t('candidateFile.statusActions.hire.confirmButton'),
        buttonClass: "",
        nextStatus: "hired",
    },
});

const HeaderCandidateInfo = ({ dataApplicants, refetch }) => {
    const { t } = useTranslation('employment');
    const STATUS_ACTIONS = getStatusActions(t);
    const [currentAction, setCurrentAction] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleActionInit = (action) => {
        setCurrentAction(action);
        setShowConfirmationModal(true);
    };

    const handleConfirmAction = async () => {
        try {
            // Call API to update status
            console.log(dataApplicants.id, currentAction.nextStatus);
            await axiosInstance.post(`/job-applicants/status`, {
                request_id: dataApplicants.id,
                status: currentAction.nextStatus,
            });
            refetch();
            queryClient.invalidateQueries({
                queryKey: ["job-applicants"],
            });
            toast.success(
                STATUS_ACTIONS[currentAction.nextStatus].successMessage
            );

            // For accept action, show the hire button
            setShowConfirmationModal(false);
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error(
                error?.response?.data?.message ||
                    t('candidateFile.statusActions.error')
            );
            // Handle error (show error message, etc.)
        }
    };

    const renderActionButtons = () => {
        return (
            <div className="left-buttons-content item-center-flex">
                <button
                    onClick={() => handleActionInit(STATUS_ACTIONS.accepted)}
                    className="btn-main button-green height--50"
                >
                    {t('table.status.accepted')}
                </button>
                <button
                    onClick={() => handleActionInit(STATUS_ACTIONS.rejected)}
                    className="btn-main button-danger height--50"
                >
                    {t('table.status.rejected')}
                </button>
                <button
                    onClick={() => handleActionInit(STATUS_ACTIONS.on_hold)}
                    className="btn-main height--50"
                >
                    {t('table.status.on_hold')}
                </button>
            </div>
        );
    };

    return (
        <>
            {/* Confirmation Modal */}
            {currentAction && (
                <ModalSherdDifferentContent
                    openModalDifferentContent={showConfirmationModal}
                    hiddenModalDifferentContent={() =>
                        setShowConfirmationModal(false)
                    }
                    iconTop={<img src={currentAction.icon} alt="action icon" />}
                    titleModal={currentAction.title}
                    textModal={t('candidateFile.statusActions.confirmationMessage')}
                    newBgButtonColorClass={currentAction.buttonClass}
                    textButtonOne={currentAction.buttonText}
                    functionButtonOne={handleConfirmAction}
                />
            )}

            {/* Header Content */}
            <div className="header-info-candidate-employee flex-between flex-wrap gap-5">
                <HeaderProfileInfo
                    imageUser={imageUser}
                    nameUser={dataApplicants?.name || ""}
                    isShowToggle={false}
                    idToggle={false}
                    textInfoWork={dataApplicants?.job?.title || ""}
                    emailUser={dataApplicants?.email || ""}
                    functionEditInfoUser={false}
                />

                {dataApplicants?.status === "pending" && renderActionButtons()}
            </div>
        </>
    );
};

export default HeaderCandidateInfo;

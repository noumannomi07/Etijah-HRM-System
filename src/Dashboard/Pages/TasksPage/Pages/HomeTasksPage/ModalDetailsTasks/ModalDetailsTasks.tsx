import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import ModalButtonsEditTrash from "@/Dashboard/Shared/ModalButtonsEditTrash/ModalButtonsEditTrash";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { useUpdateTaskStatus } from "@/hooks/Tasks/useUpdateTaskStatus";
import { toast } from "react-toastify";
import { FullRoutes } from "@/Routes/routes";
import SmallImageUser from "@/Dashboard/Shared/SmallImageUser/SmallImageUser";
import { useTask } from "@/hooks/Tasks/useShowTask";
import { Link } from "react-router-dom";
import ModalComments from "@/Dashboard/Pages/TasksPage/Pages/HomeTasksPage/ModalComments";

const ModalDetailsTasks = ({
    openModalDetailsTasks,
    hiddenModalDetailsTasks,
    handleButtonDeleteTasks,
    openModalEditFunction,
    data,
}) => {
    const { t, i18n } = useTranslation("tasks");
    const { data: taskData, isLoading: isLoadingTask } = useTask(data?.id);
    
    // State for comments modal
    const [isOpenModalComments, setIsOpenModalComments] = useState(false);
    
    const openModalComments = () => {
        setIsOpenModalComments(true);
    };

    const closeModalComments = () => {
        setIsOpenModalComments(false);
    };

    // Get comments from either fresh data or props
    const comments = (taskData as any)?.data?.comments || (taskData as any)?.comments || data?.comments || [];

    const detailsArray = [
        { title: t("taskDetails.taskName"), text: data?.title },
        {
            title: t("taskDetails.startDate"),
            text: data?.start_date || t("common.noData"),
        },
        {
            title: t("table.startTime"),
            text: data?.start_time || t("common.noData"),
        },
        {
            title: t("table.endTime"),
            text: data?.end_time || t("common.noData"),
        },
        {
            title: t("taskDetails.description"),
            text: data?.content || t("common.noData"),
            className: "card-details-documents sm:col-span-1 md:col-span-2",
        },
    ];

    const { mutate: updateStatus, isPending: isLoading } = useUpdateTaskStatus({
        onSuccess: () => {
            toast.success(t("messages.statusUpdateSuccess"));
            hiddenModalDetailsTasks();
        },
    });

    // Call the mutation

    const handleStatus = (status: string) => {
        updateStatus({ id: data.id, status });
    };

    const shouldShowStatusButtons =
        data?.status !== "completed" && data?.status !== "cancelled";

    return (
        <>
            <CustomModal
                newClassModal={"modal-delete medium-modal"}
                isOpen={openModalDetailsTasks}
                handleOpen={hiddenModalDetailsTasks}
                titleModal={t("taskDetails.title")}
                classBodyContent={""}
            >
                <div className="all-content-details-documents ">
                    <div className="buttons-actions mb-3  flex-between flex-wrap">
                        <div
                            className="image-user item-center-flex"
                            style={{ gap: 8 }}
                        >
                            {data?.employees?.length > 0 &&
                                data.employees.map((employee) => (
                                    <img
                                        key={employee?.id}
                                        src={employee?.image || male}
                                        className={
                                            "rounded-[50px] !w-[45px] !h-[45px] border border-lightColorWhite2 cursor-pointer hover:scale-105 transition-transform duration-150"
                                        }
                                        alt={t("common.userAvatar", {
                                            username: employee?.name || "",
                                        })}
                                        loading="lazy"
                                        title={employee?.name || ""}
                                        onClick={() =>
                                            employee?.id &&
                                            window.open(
                                                FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                                    { id: String(employee.id) }
                                                ),
                                                "_blank"
                                            )
                                        }
                                    />
                                ))}
                        </div>
                        <ModalButtonsEditTrash
                            showEdit={true}
                            openModalDeleteFunction={handleButtonDeleteTasks}
                            openModalEditFunction={openModalEditFunction}
                            routePageAdd={""}
                        />
                    </div>
                    {/* ====================== START DETAILS CONENT ================= */}
                    <div className="details-doucments-content  border-width-content">
                        <div className="all-cards-documents grid-cards-2 gap-0 gap-x-4">
                            {detailsArray.map((detail, index) => (
                                <DetailsInfoDiv
                                    key={index}
                                    newClassName={
                                        detail.className ||
                                        "card-details-documents"
                                    }
                                    titleDetails={detail.title}
                                    textDetails={detail.text}
                                />
                            ))}
                        </div>
                        
                        {/* ====================== COMMENTS SECTION ================= */}
                        <div 
                            className="comments-section-container mt-4 border-width-content p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border border-[#E0E0E0]" 
                            onClick={openModalComments}
                        >
                            <div className="comments-section scrollbarChange mt-1 max-h-[300px] pr-1 pl-3 overflow-y-auto">
                                <h3 className="text-lg font-semibold mb-3 text-primaryColor">
                                    {t("taskDetails.comments")}
                                </h3>
                                {isLoadingTask ? (
                                    <div className="flex justify-center py-4">
                                        <SpinnerLoader />
                                    </div>
                                ) : comments && comments.length > 0 ? (
                                    <div className="space-y-4">
                                        {comments.map((comment: any) => (
                                            <div
                                                key={comment.id}
                                                className="comment-item block p-4 bg-[#fff] border rounded-lg group transition-colors hover:bg-primaryColor"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Link
                                                    to={`/dashboard/staff-management/staff-employee-information/${comment.id}`}
                                                    className="block"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="image-user flex items-center">
                                                            <SmallImageUser
                                                                newClassImage="w-10 h-10 rounded-full"
                                                                imageUser={comment.employee?.image || male}
                                                                altImage={t("common.userAvatar", {
                                                                    username: `${comment.employee?.first_name || ""} ${comment.employee?.last_name || ""}`
                                                                })}
                                                            />
                                                            <h2 className="name-user group-hover:text-white transition-all duration-300 text-font-dark text-[15px] mr-3 font-medium">
                                                                {comment.employee?.first_name} {comment.employee?.last_name}
                                                            </h2>
                                                        </div>
                                                        <span className="text-sm text-gray-500 group-hover:text-white transition-all duration-300">
                                                            {new Date(comment.created_at).toLocaleDateString(
                                                                i18n.language === "ar" ? "ar-EG" : "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-[15px] leading-relaxed group-hover:text-white transition-all duration-300">
                                                        {comment.comment}
                                                    </p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p className="text-lg mb-2">{t("comments.noComments")}</p>
                                        <p className="text-sm">{t("comments.beFirstToComment")}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ====================== END DETAILS CONENT ================= */}

                    <div className="add-comment-section mt-4">
                        {shouldShowStatusButtons && (
                            <div className="buttons-modal-details flex-items-center gap-3 justify-end mt-3">
                                <div
                                    className="btn-main button-blue height--50"
                                    onClick={() => handleStatus("cancelled")}
                                >
                                    {isLoading ? (
                                        <SpinnerLoader />
                                    ) : (
                                        t("buttons.cancelTask")
                                    )}
                                </div>
                                <div
                                    onClick={() => handleStatus("completed")}
                                    className="btn-main button-green height--50"
                                >
                                    {isLoading ? (
                                        <SpinnerLoader />
                                    ) : (
                                        t("buttons.completeTask")
                                    )}
                                </div>
                                {data?.status !== "in_progress" && (
                                    <div
                                        onClick={() =>
                                            handleStatus("in_progress")
                                        }
                                        className="btn-main button-green height--50"
                                    >
                                        {isLoading ? (
                                            <SpinnerLoader />
                                        ) : (
                                            t("buttons.startTask")
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CustomModal>

            <ModalComments
                openModalComments={isOpenModalComments}
                hiddenModalComments={closeModalComments}
                data={data}
            />
        </>
    );
};

ModalDetailsTasks.propTypes = {
    openModalDetailsTasks: PropTypes.bool.isRequired,
    hiddenModalDetailsTasks: PropTypes.func.isRequired,
    handleButtonDeleteTasks: PropTypes.func.isRequired,
    openModalEditFunction: PropTypes.string.isRequired,
};

export default ModalDetailsTasks;

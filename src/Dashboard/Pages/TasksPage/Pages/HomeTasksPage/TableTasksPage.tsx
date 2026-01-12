import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDetailsTasks from "./ModalDetailsTasks/ModalDetailsTasks";
import ModalComments from "./ModalComments";
import ModalFilterPredecessorRequests from "@/Dashboard/Pages/Orders/Components/PredecessorRequests/ModalFilterPredecessorRequests";
import { TaskType } from "@/Dashboard/Pages/types";
import { useDeleteTask } from "@/hooks/Tasks";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import FormAddNewTask from "../AddNewTask/FormAddNewTask";
import { withPermissions } from "@/hoc";
import { hasAnyPermission } from "@/utils/global";

const TableTasksPage = ({
    data = [],
    refetch,
    permissions,
}: {
    data: TaskType[];
    refetch: () => void;
    permissions: any;
}) => {
    const [openModal, setOpenModal] = useState(false);
    const buttonOpen = () => {
        setOpenModal(!openModal);
    };

    const { t } = useTranslation("tasks");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // ID OF TD TO ROUTE OF TD ID
    const [selectedTasks, setSelectedTasks] = useState<TaskType | null>(null);

    // SHOW MODAL DETAILS COMPANY DOCUMENTS
    const [openComments, setOpenComments] = useState(false);
    const handleOpenComments = (document) => {
        setSelectedTasks(document); // ADD ID OF PAGE SELECTED
        setOpenComments(true); // SHOW MODAL
    };
    const hiddenComments = () => setOpenComments(false);

    const [openDetailsTasks, setOpenDetailsTasks] = useState(false);
    const handleOpenDetailsTasks = (document) => {
        setSelectedTasks(document); // ADD ID OF PAGE SELECTED
        setOpenDetailsTasks(true); // SHOW MODAL
    };
    const hiddenDetailsTasks = () => setOpenDetailsTasks(false);
    const theadTrContent = [
        t("table.taskName"),
        t("table.startTime"),
        t("table.endTime"),
        t("table.status"),
        t("table.priority"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];
    const tbodyContent = data?.map((item) => [
        item.title,
        <div key={`time-${item.id}`} className="flex flex-col gap-2">
            <span>{item.start_date}</span>
            <span>{item.start_time}</span>
        </div>,
        <div key={`end-time-${item.id}`} className="flex flex-col gap-2">
            <span>{item.end_date}</span>
            <span>{item.end_time}</span>
        </div>,
        <div key={`status-${item.id}`} className="status-oranged">
            {item.status.replace("in_progress", t("status.inProgress"))}
        </div>,
        <div
            key={`priority-${item.id}`}
            className={
                item.priority == "high"
                    ? "status-danger"
                    : item.priority == "low"
                    ? "status-success"
                    : "status-oranged"
            }
        >
            {t(`priority.${item.priority}`)}
        </div>,
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={`actions-${item.id}`} className="flex gap-1">
                      {/* <button
                          disabled={!permissions?.update}
                          onClick={() => handleOpenComments(item)}
                          className="btn-main button-blue min-w-[80px]"
                      >
                          {t("buttons.comments")}
                      </button> */}
                      <button
                          onClick={() => handleOpenDetailsTasks(item)}
                          className="btn-main button-green min-w-[80px]"
                      >
                          {t("buttons.view")}
                      </button>
                      {/* <button
                onClick={() => {
                    navigate(
                        FullRoutes.Dashboard.Tasks.AddNewTaskWithId({
                            id: item.id,
                        })
                    );
                }}
                className="btn-main button-danger min-w-[80px]"
            >
                {t("buttons.edit")}
            </button> */}
                  </div>,
              ]
            : []),
    ]);

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<
        TaskType | undefined
    >();
    const { mutate: deleteTask } = useDeleteTask();
    const openDeleteModalTasks = () =>
        setIsModalDeleteOpen(selectedTasks || undefined);
    const closeDeleteModal = () => setIsModalDeleteOpen(undefined);
    const handelDelete = () => {
        if (selectedTasks) {
            deleteTask(selectedTasks.id.toString());
        }
    };
    return (
        <>
            <ModalShared 
                open={openModal} 
                hiddenModal={buttonOpen}
                titleModal={selectedTasks ? t('modal.editTask') : t('modal.addTask')}
            >
                <FormAddNewTask
                    selectedTasks={selectedTasks}
                    buttonOpen={buttonOpen}
                    refetch={refetch}
                />
            </ModalShared>
            <ModalDelete
                openModalDelete={isModalDeleteOpen}
                hiddenModalDelete={closeDeleteModal}
                titleModal={t("deleteModal.confirmDelete")}
                textModal={t("deleteModal.confirmDeleteDetails")}
                onDelete={handelDelete}
            />

            <ModalFilterPredecessorRequests
                open={open}
                hiddenModal={handleOpen}
            />

            {selectedTasks && ( // SHOW MODAL SLECTED ID
                <ModalComments
                    openModalComments={openComments}
                    hiddenModalComments={hiddenComments}
                    data={selectedTasks}
                />
            )}
            {selectedTasks && ( // SHOW MODAL SLECTED ID
                <ModalDetailsTasks
                    openModalDetailsTasks={openDetailsTasks}
                    hiddenModalDetailsTasks={hiddenDetailsTasks}
                    handleButtonDeleteTasks={() => {
                        hiddenDetailsTasks();
                        openDeleteModalTasks();
                    }}
                    openModalEditFunction={() => {
                        hiddenDetailsTasks();
                        buttonOpen();
                        setSelectedTasks(selectedTasks);
                    }}
                    data={selectedTasks}
                />
            )}

            <div className="table-employment-requests border-width-content">
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    // isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={permissions?.create}
                    functionButtonModalOne={() => {
                        // navigate(FullRoutes.Dashboard.Tasks.AddNewTask);
                        setSelectedTasks(null);

                        buttonOpen();
                    }}
                    textContentButtonOne={t("buttons.addNewTask")}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo={false}
                    functionModalButtonTwo={false}
                    textContetButtonTwo={false}
                />
            </div>
        </>
    );
};

export default withPermissions(TableTasksPage, "tasks", {
    isComponent: true,
});

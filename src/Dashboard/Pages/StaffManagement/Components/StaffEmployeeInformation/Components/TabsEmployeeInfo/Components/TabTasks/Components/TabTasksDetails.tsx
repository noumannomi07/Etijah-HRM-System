import { Loading } from "@/components";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import { TaskType } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useShowEmployeeTask } from "@/hooks/Tasks/useShowEmployeeTask";
import { FullRoutes } from "@/Routes/routes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewTask from "@/Dashboard/Pages/TasksPage/Pages/AddNewTask/FormAddNewTask";

const TabTasksDetails = () => {
  const { t } = useTranslation("staffManagement");
  const { employee, isPending } = useEmployeeContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const modalOpen = () => {
    setOpen(true);
  };
  const modalHide = () => {
    setOpen(false);
  };
  const { data: tasks, isLoading } = useShowEmployeeTask(employee?.id || null);

  const theadTrContent = [
    t("tasks.taskName"),
    t("tasks.startTime"),
    t("tasks.endTime"),
    t("tasks.status"),
    t("tasks.priority")
  ];

  if (isLoading || isPending) {
    return <Loading />;
  }
  const tbodyContent = tasks?.data?.map((item: TaskType) => [
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
      {t(`tasks.statuses.${item.status.replace("in_progress", "inProgress")}`)}
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
      {t(`tasks.priorities.${item.priority}`)}
    </div>
  ]);

  return (
    <div className="airine-tickets-details border-width-content">
      <HeaderTableInfo titleHeader={t("employeeTabs.tasks")} />
      <div className="table-employment-requests border-width-content mb-2">
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isTrueButtonsModalContentRight={true}
          textContentButtonOne={t("tasks.addNewTask")}
          functionButtonModalOne={() => {
            // navigate(
            //   `${FullRoutes.Dashboard.Tasks.AddNewTask}?employee_id=${employee?.id}`
            // );
            modalOpen();
            
          }}
          isTrueButtonTwoModalContent={false}
          showDateFilter={false}
          onChangeDateFilter={() => {}}
          isShowModalButtonFilter={false}
          functionButtonFilter={() => {}}
          newClassButtonTwo=""
          functionModalButtonTwo={() => {}}
          textContetButtonTwo=""
        />
      </div>
      <CustomModal
        newClassModal={"w-full xl:!min-w-[42%] xl:!max-w-[42%]"}
        isOpen={open}
        handleOpen={modalHide}
        titleModal={``}
      >
        <FormAddNewTask employee_id={employee?.id} buttonOpen={modalHide} />
      </CustomModal>
    </div>
  );
};

export default TabTasksDetails;

import React from "react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import AllTasks from "./Components/AllTasks";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const MyTasks = ({ openMyTasks, hiddenModalMyTasks }) => {
  const { t } = useTranslation("navbar");

  const tabsData = [
    {
      label: <span>{t("myTasksModal.tabs.all")}</span>,
      content: <AllTasks />
    },
    {
      label: <span>{t("myTasksModal.tabs.current")}</span>,
      content: <AllTasks isCompleted={false} />
    },
    {
      label: <span>{t("myTasksModal.tabs.finished")}</span>,
      content: <AllTasks isCompleted={true} />
    }
  ];

  return (
    <CustomModal
      newClassModal={"w-full xl:!min-w-[60%] xl:!max-w-[60%]"}
      isOpen={openMyTasks}
      handleOpen={hiddenModalMyTasks}
      titleModal={t("myTasksModal.title")}
      classBodyContent={"modal-scroll-auto"}
      extraHeaderContent={(
        <button
          onClick={() => window.location.href = '/dashboard/tasks-page/add-new-task'}
          className="ml-4 btn-main text-base py-2 px-4 flex items-center"
          style={{ height: '40px' }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {t("myTasksModal.addNewTask")}
        </button>
      )}
    >
      <HorizontalTabs
        tabsData={tabsData}
        isBgTabButton={true}
        newClassName={"!bg-main-color"}
      />
    </CustomModal>
  );
};

MyTasks.propTypes = {
  openMyTasks: PropTypes.bool.isRequired,
  hiddenModalMyTasks: PropTypes.func.isRequired,
};

export default MyTasks;

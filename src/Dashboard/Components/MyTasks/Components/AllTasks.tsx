import React, { useEffect, useState } from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import "./AllTasks.css";
import axiosInstance from "@/utils/axios";
import { useTranslation } from "react-i18next";

interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  priority: string;
  employees: any[];
}

const AllTasks = ({  isCompleted }: {  isCompleted?: boolean }    ) => {
  const { t } = useTranslation("navbar");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        if (!isCompleted) {
          setTasks(response.data.my_tasks.filter((task: Task) => task.status === 'upcoming'));
        } else {
          setTasks(response.data.my_tasks.filter((task: Task) => task.status !== 'upcoming'));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const theadTrContent = [
    t("myTasksModal.tableHeaders.date"),
    t("myTasksModal.tableHeaders.task"),
    t("myTasksModal.tableHeaders.priority"),
    t("myTasksModal.tableHeaders.start"),
    t("myTasksModal.tableHeaders.end"),
    t("myTasksModal.tableHeaders.status"),
    
  ];

  const tbodyContent = tasks.map((item) => [
    item.start_date,
    item.title,
    <div key={item.id} className={item.priority === 'low' ? "status-primary" : item.priority === 'high' ? "status-danger" : ""}>
      {item.priority}
    </div>,
    <div className="flex items-center gap-2">
      <span>{item.start_date}
        <br />
        {item.start_time}
      </span>
      
    </div>,

    <div className="flex items-center gap-2">
      <span>{item.end_date}
        <br />
        {item.end_time}
      </span>
      
    </div>,
    <div key={item.id} className={"status-primary"}>
      {item.status}
    </div>,
    
    // <div
    //   key={item.id}
    //   className={"btn-main p-[10px_20px] bg-greenColor01 border-greenColor01"}
    // >
    //   عرض
    // </div>
  ]);

  return (
    <div className="all-tasks">
      <DataTableTwo
        theadContent={theadTrContent}
        tbodyContent={tbodyContent}
        withCheckboxes={false}
        isShowContentFilterInfo={false}
        isShowModalButtonFilter={false}
        functionButtonFilter={() => {}}
        isTrueButtonsModalContentRight={false}
        functionButtonModalOne={() => {}}
        textContentButtonOne=""
        isTrueButtonTwoModalContent={false}
        newClassButtonTwo=""
        functionModalButtonTwo={() => {}}
        textContetButtonTwo=""
      />
    </div>
  );
};

export default AllTasks;

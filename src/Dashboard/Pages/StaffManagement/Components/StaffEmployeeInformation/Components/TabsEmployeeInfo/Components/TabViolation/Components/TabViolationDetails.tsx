import { Loading } from "@/components";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useEmployeeViolations } from "@/hooks/employee/manage/violations/useEmployeeViolations";
import React, { useState } from "react";
import { getViolationText } from "@/utils/financial";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewViolationsManagementPage from "@/Dashboard/Pages/ViolationsManagementPage/Pages/add/form";
const TabViolationDetails = () => {
  const { data: violations, isPending } = useEmployeeViolations();

  const { id } = useParams();

  const { t } = useTranslation("staffManagement");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const modalOpen = () => {
    setOpen(true);
  };
  const modalHide = () => {
    setOpen(false);
  };
  if (isPending) return <Loading />;

  const tableHeaders = [
    t("violations.tableHeaders.violationType"),
    t("violations.tableHeaders.penalty"),
    t("violations.tableHeaders.date")
  ];

  const tableData =
    violations?.map((violation) => [
      violation.violation_rule.title,
      //   violation.employee.name,
      getViolationText(violation),
      //   violation.note || "-",
      new Date(violation.created_at).toLocaleDateString()
      //   new Date(violation.updated_at).toLocaleDateString()
    ]) || [];

  return (
    <div className="airine-tickets-details border-width-content">
      <DataTableTwo
        theadContent={tableHeaders}
        tbodyContent={tableData}
        withCheckboxes={false}
        isShowContentFilterInfo={true}
        isShowModalButtonFilter={false}
        functionButtonFilter={() => {}}
        isTrueButtonsModalContentRight={true}
        functionButtonModalOne={() => {
          // navigate(
          //   FullRoutes.Dashboard.ViolationsManagement
          //     .AddNewViolationsManagementPage + `?employee_id=${id}`
          // );
          modalOpen();
        }}
        textContentButtonOne={t("violations.addNewViolation")}
        isTrueButtonTwoModalContent={false}
        newClassButtonTwo=""
        functionModalButtonTwo={() => {}}
        showDateFilter={false}
        onChangeDateFilter={() => {}}
        textContetButtonTwo=""
      />

      <CustomModal
        newClassModal={"margin-0 w-full xl:!min-w-[42%] xl:!max-w-[42%]"}
        isOpen={open}
        handleOpen={modalHide}
        titleModal={``}
      >
        <FormAddNewViolationsManagementPage />
      </CustomModal>
    </div>
  );
};

export default TabViolationDetails;

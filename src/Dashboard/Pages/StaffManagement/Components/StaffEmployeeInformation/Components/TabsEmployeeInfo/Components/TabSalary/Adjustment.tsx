import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { Loading } from "@/components";
import { SalaryAdjustmentItem } from "@/Dashboard/Pages/SalaryAdjustments/Pages/HomeSalaryAdjustments/Components/TableSalaryAdjustments/TableSalaryAdjustments";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import ModalDetailsSalaryAdjustments from "@/Dashboard/Pages/SalaryAdjustments/Pages/HomeSalaryAdjustments/Components/TableSalaryAdjustments/ModalDetailsSalaryAdjustments/ModalDetailsSalaryAdjustments";
import { useEmployeeSalaryAdjustment } from "@/hooks/employee/manage/salary/useEmployeeSalaryAdjustment";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";

const Adjustment: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { data, isLoading } = useEmployeeSalaryAdjustment();
  const { t } = useTranslation("staffManagement");

  const renderAdjustmentType = (item: SalaryAdjustmentItem) => {
    const getStatusColor = (type: string) => {
      if (type === "cut") return "status-danger";
      if (type === "bonus") return "status-success";
      return "text-gray-500";
    };

    const reasons = {
      cut: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.cut"),
        description: item.cut_title || "—",
      },
      bonus: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.bonus"),
        description: item.bonus_title || "—",
      },
      expenses: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.expenses"),
        description: item?.expense?.expense_mangment_id.title || "—",
      },
      ticket_refund: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.ticket_refund"),
        description: t("salary.adjustment.descriptions.ticketRefundRequest", {
          id: item?.flight_request?.id || "—"
        }),
      },
      violation: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.violation"),
        description: item?.violation?.violation_rule.title || "—",
      },
      overtime: {
        color: getStatusColor(item.type),
        title: t("salary.adjustment.types.overtime"),
        description: t("salary.adjustment.descriptions.overtimeWork", {
          hours: item?.attendance?.overtime || "—"
        }),
      },
    };

    const reason = reasons[item.reason as keyof typeof reasons] || {
      color: "text-gray-500",
      title: "—",
      description: "—",
    };

    return (
      <div className="flex items-center justify-center w-full">
        <div className="relative group text-center">
          <Tooltip
            title={reason.description}
            arrow
            placement="bottom"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "rgba(0, 0, 0, 0.85)",
                  "& .MuiTooltip-arrow": {
                    color: "rgba(0, 0, 0, 0.85)",
                  },
                  maxWidth: "300px",
                  fontSize: "16px",
                },
              },
            }}
          >
            <span
              className={`font-medium cursor-help ${reason.color}`}
            >
              {" "}
              {reason.title || "—"}
            </span>
          </Tooltip>
        </div>
      </div>
    );
  };

  const tableHead = [
    t("salary.adjustment.adjustmentNumber"),
    t("salary.adjustment.employeeName"),
    t("salary.adjustment.adjustmentType"),
    t("salary.adjustment.amount"),
    t("salary.adjustment.actions"),
  ];

  const navigate = useNavigate();

  // ID OF TD TO ROUTE OF TD ID
  const [selectedDocument, setSelectedDocument] = useState(null);

  // SHOW MODAL DETAILS
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const handleOpenModalDetails = (document) => {
    setSelectedDocument(document);
    setOpenModalDetails(true);
  };
  const hiddenOpenModalDetails = () => setOpenModalDetails(false);

  if (isLoading) return <Loading />;

  const renderTableRow = (item: SalaryAdjustmentItem) => [
    <div key={`id-${item.id}`}># {item.id}</div>,
    <div
      key={`employee-${item.id}`}
      className="flex justify-center flex-col"
    >
      <span>{item?.employee_name || "—"}</span>
    </div>,
    <div
      key={`reason-${item.id}`}
      className="flex justify-center flex-col text-center"
    >
      {renderAdjustmentType(item)}
    </div>,
    <div
      key={`amount-${item.id}`}
      className="flex justify-center flex-col text-center"
    >
      <span
        className={
          item.reason === "cut" ? "text-red-500 flex items-center gap-2" : "text-green-500 flex items-center gap-2"
        }
      >
        {item.reason === "cut" ? "-" : "+"}{" "}
        {Number(item?.amount || 0).toLocaleString()} <Saudiriyal />
      </span>
    </div>,
    <div key={`actions-${item.id}`}>
      <button
        onClick={() => handleOpenModalDetails(item)}
        className="btn-main button-green"
      >
        {t("common.view")}
      </button>
    </div>,
  ];

  return (
    <div className="border-width-content">
      <h2 className="text-xl font-semibold mb-4">
        {t("salary.adjustmentsTitle") || "Salary Adjustments"}
      </h2>
      <ModalDetailsSalaryAdjustments
        hiddenOpenModalDetails={hiddenOpenModalDetails}
        openModalDetails={openModalDetails}
        selectedDocument={selectedDocument}
        routePageAdd={
          selectedDocument?.id
            ? FullRoutes.Dashboard.SalaryAdjustments.AddNewSalaryAdjustmentsWithId(
              {
                id: selectedDocument.id,
              }
            )
            : ""
        }
      />
      <DataTableTwo
        theadContent={tableHead}
        tbodyContent={data?.map(renderTableRow) ?? []}
        withCheckboxes={false}
        isShowContentFilterInfo={false}
        isShowModalButtonFilter={false}
        functionButtonFilter={handleOpen}
        isTrueButtonsModalContentRight={false}
        functionButtonModalOne={() => {
          navigate(
            FullRoutes.Dashboard.SalaryAdjustments
              .AddNewSalaryAdjustments
          );
        }}
        textContentButtonOne={"إضافة جديدة"}
        isTrueButtonTwoModalContent={false}
      />
    </div>
  );
};

export default Adjustment;

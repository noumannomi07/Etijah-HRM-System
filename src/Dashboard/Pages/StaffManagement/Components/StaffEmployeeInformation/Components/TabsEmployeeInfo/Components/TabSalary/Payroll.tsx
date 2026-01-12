import React from "react";
import { useTranslation } from "react-i18next";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useEmployeePayroll } from "@/hooks/employee/manage/salary/useEmployeePayroll";
import { Loading } from "@/components";
import { useNavigate, useParams } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Payroll: React.FC = () => {
  const { t, i18n } = useTranslation("staffManagement");

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: payroll, isPending } = useEmployeePayroll();

  if (isPending) return <Loading />;

  const theadContent = [
    t("salary.name"),
    t("salary.type"),
    t("salary.date"),
    t("salary.amount")
  ];

  const paymentItems = [
    // Salary Extras (Allowances)
    ...((payroll?.salary?.salaryextra ?? []).map((extra) => ({
      notes: t("salary.allowances"),
      label:
        i18n.language === "ar"
          ? extra.allowance?.ar_title
          : extra.allowance?.title,
      amount: extra.amount,
      created_at: extra.created_at
    })) || []),
    // Bonuses
    ...((payroll?.bonuses ?? []).map((bonus) => ({
      label: i18n.language === "ar" ? bonus.bonus_ar_title : bonus.bonus_title,
      amount: Number(bonus.amount),
      notes: t("salary.bonus"),
      created_at: bonus.created_at
    })) || []),
    // Cuts
    ...((payroll?.cuts ?? []).map((cut) => ({
      label: i18n.language === "ar" ? cut.cut_ar_title : cut.cut_title,
      amount: -Math.abs(Number(cut.amount)),
      notes: t("salary.cut"),
      created_at: cut.created_at
    })) || [])
  ];

  const total = paymentItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  const tbodyContent = paymentItems.map((item) => [
    item.notes,
    item.label,
    new Date(item.created_at).toLocaleDateString(),
    item.amount?.toLocaleString() || "0.00"
  ]);

  // Add summary row for totals (footer row)
  tbodyContent.push([
    t("salary.netPayTotal") || "إجمالي صافي الدفع",
    "",
    "",
    total.toLocaleString()
  ]);

  const totalAllowances = paymentItems
    .filter((item) => item.notes === t("salary.allowances"))
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="border-width-content">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">{t("salary.payroll.title")}</div>

        <div className="all-buttons-header all-buttons-employee item-center-flex">
          <button
            type="button"
            onClick={() => {
              navigate(
                FullRoutes.Dashboard.StaffManagement.AddSalaryConfigurationWithId(
                  { id: id! }
                )
              );
            }}
            className="btn-main  h-[46px] text-[13px]"
          >
            {t("salary.addSalaryConfiguration")}{" "}
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {payroll?.salary?.salary || "0.00"}
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.transaction.basicSalary") || "مكافآت"}
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {totalAllowances.toLocaleString() || "0.00"}
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.allowances") || "مكافآت"}
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {payroll?.total_bonus?.toLocaleString() || "0.00"}
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.bonus") || "مكافآت"}
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {payroll?.total_cut?.toLocaleString() || "0.00"}
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.cut") || "خصومات"}
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {payroll?.gosi_employee_percent?.toLocaleString() || "0"} %
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.transaction.gosipercent") ||
              "التأمينات الاجتماعية للموظف"}
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: 16,
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            {payroll?.month_salary?.toLocaleString() || "0"}
          </div>
          <div style={{ color: "#888", marginTop: 4 }}>
            {t("salary.totalWage") || "الأجر الإجمالي"}
          </div>
        </div>
      </div>

      {/* DataTableTwo Table */}
      <DataTableTwo
        theadContent={theadContent}
        tbodyContent={tbodyContent}
        withCheckboxes={false}
        isShowContentFilterInfo={false}
        isShowModalButtonFilter={false}
        functionButtonFilter={() => {}}
        isTrueButtonsModalContentRight={false}
        functionButtonModalOne={() => {}}
        textContentButtonOne={""}
        isTrueButtonTwoModalContent={false}
        newClassButtonTwo={""}
        functionModalButtonTwo={() => {}}
        textContetButtonTwo={""}
        showDateFilter={false}
      />
    </div>
  );
};

export default Payroll;

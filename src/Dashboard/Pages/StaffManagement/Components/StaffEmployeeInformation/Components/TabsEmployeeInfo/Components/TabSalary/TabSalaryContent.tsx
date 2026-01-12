import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useEmployeeSalary } from "@/hooks/employee/manage/salary/useEmployeeSalary";
import DownloadIconColor from "@assets/Icons/DownloadIconColor.svg";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "./TabSalary.css";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { FullRoutes } from "@/Routes/routes";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";

const TabSalaryContent = () => {
  const { t } = useTranslation("staffManagement");
  const employee = useEmployeeSalary();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const theadTrContent = [
    t("salary.month"),
    t("salary.currency") === "ريال" ? <Saudiriyal /> : t("salary.currency"),
    t("salary.basicSalary"),
    t("salary.allowances"),
    t("salary.netAdditions"),
    t("salary.netDeductions"),
    t("salary.netWage"),
    ""
  ]; 

  const data = [
    {
      id: 1,
      month: t("salary.months.january"),
      moneyType: t("salary.currencies.riyal"),
      moneyNum: "50,000",
      moneyBasic: t("salary.transportAllowance", { amount: "5,000" }),
      moneyAdd: "4,000",
      moneyMinus: "2,000",
      allMoney: "57,000"
    }
  ];

  // CONTENT OF ARRAY
  const tbodyContent = data.map((item) => [
    item.month,
    <div className="flex items-center gap-2">
      {item.moneyType === t("salary.currencies.riyal") ? (
        <Saudiriyal />
      ) : (
        item.moneyType
      )}
    </div>,
    item.moneyNum,
    item.moneyBasic,
    <div className="text-greenColor01" key={`add-${item.id}`}>
      {item.moneyAdd}
    </div>,
    <div className="text-redColor01" key={`minus-${item.id}`}>
      {item.moneyMinus}
    </div>,
    item.allMoney,
    <div
      className="download-table item-center-flex cursor-pointer text-primaryColor"
      key={`download-${item.id}`}
    >
      {t("salary.downloadPaymentSlip")}{" "}
      <img src={DownloadIconColor} alt="download" />
    </div>
  ]);

  return (
    <div className="border-width-content">
      <h2 className="text-xl font-semibold mb-4">{t("employeeTabs.salary")}</h2>
      <HeaderTableInfo
        titleHeader={t("employeeTabs.salary")}
        isButtonAll={false}
        routePageInfo=""
        textLink=""
        buttonAddNewOrder={false}
        functionButtonAddNewOrder={() => {}}
        newButtonWithoutText={false}
        functionButtonNewButton={() => {}}
        textButton=""
        newComponentsHere={
          <div className="all-buttons-header item-center-flex">
            <button
              type="button"
              onClick={handleOpen}
              className="btn-main button-green height--50"
            >
              {t("salary.endOfServiceCalculator")}
              <img src={CalculatorIcon} />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(
                  FullRoutes.Dashboard.StaffManagement.AddSalaryConfigurationWithId(
                    { id: id! }
                  )
                );
              }}
              className="btn-main height--50"
            >
              {t("salary.addSalaryConfiguration")}{" "}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        }
      />
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
        showDateFilter={false}
      />
    </div>
  );
};

export default TabSalaryContent;

import React from "react";
import { ExpensesForm } from "./ExpensesForm";
import { useTranslation } from "react-i18next";

const FormAddNewBusinessExpenseRequests: React.FC = () => {
  const { t } = useTranslation("orders");

  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3 mb-3">{t("businessExpenses.tabs.expense")}</h2>
      <ExpensesForm />
    </div>
  );
};

export default FormAddNewBusinessExpenseRequests;

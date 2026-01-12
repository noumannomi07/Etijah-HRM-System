import React from "react";
import ReusablePageAddNewContent from "../../../ReusablePageAddNewContent/ReusablePageAddNewContent";
import FormAddNewBusinessExpenseRequests from "./FormAddNewBusinessExpenseRequests";
import { useTranslation } from "react-i18next";

const AddNewBusinessExpenseRequests: React.FC = () => {
  const { t } = useTranslation("orders");

  return (
    <ReusablePageAddNewContent
      helmetPageTitle={t("businessExpenses.title")}
      titlePage={t("businessExpenses.title")}
    >
      <FormAddNewBusinessExpenseRequests />{" "}
    </ReusablePageAddNewContent>
  );
};

export default AddNewBusinessExpenseRequests;

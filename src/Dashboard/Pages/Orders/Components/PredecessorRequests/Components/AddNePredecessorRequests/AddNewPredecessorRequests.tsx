import React from "react";
import ReusablePageAddNewContent from "../../../ReusablePageAddNewContent/ReusablePageAddNewContent";
import FormAddNewPredecessorRequests from "./FormAddNewPredecessorRequests";
import { useTranslation } from "react-i18next";

const AddNewPredecessorRequests: React.FC = () => {
  const { t } = useTranslation("orders");

  return (
    <ReusablePageAddNewContent
      helmetPageTitle={t("advanceRequests.title")}
      titlePage={t("advanceRequests.title")}
    >
      <FormAddNewPredecessorRequests />
    </ReusablePageAddNewContent>
  );
};

export default AddNewPredecessorRequests;

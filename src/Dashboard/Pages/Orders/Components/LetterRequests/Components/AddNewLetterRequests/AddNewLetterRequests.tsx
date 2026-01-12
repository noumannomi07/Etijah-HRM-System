import React from "react";
import ReusablePageAddNewContent from "../../../ReusablePageAddNewContent/ReusablePageAddNewContent";
import FormAddNewLetter from "./FormAddNewLetter";
import { useTranslation } from "react-i18next";

const AddNewLetterRequests: React.FC = () => {
  const { t } = useTranslation("orders");

  return (
    <ReusablePageAddNewContent
      helmetPageTitle={t("letterRequests.title")}
      titlePage={t("letterRequests.title")}
    >
      <FormAddNewLetter />
    </ReusablePageAddNewContent>
  );
};

export default AddNewLetterRequests;

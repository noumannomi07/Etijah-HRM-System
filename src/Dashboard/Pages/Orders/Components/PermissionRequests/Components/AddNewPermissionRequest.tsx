import React from "react";
import ReusablePageAddNewContent from "../../ReusablePageAddNewContent/ReusablePageAddNewContent";
import FormComponent from "./FormComponent";
import { useTranslation } from "react-i18next";

const AddNewPermissionRequest: React.FC = () => {
  const { t } = useTranslation("orders");

  return (
    <>
      <ReusablePageAddNewContent
        helmetPageTitle={t("permissionRequests.title")}
        titlePage={t("permissionRequests.title")}
      >
        <FormComponent />
        
      </ReusablePageAddNewContent>
    </>
  );
};

export default AddNewPermissionRequest;

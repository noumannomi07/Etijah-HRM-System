
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import FormAddNewProjectManagementSettings from "./FormAddNewProjectManagementSettings";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewProjectManagementSettings = () => {
  const { t } = useTranslation("systemSettings");

  return (
    <>
      <HelmetInfo titlePage={t("tabs.projectManagement")} />
      <BreadCrumbShared textPage={t("tabs.projectManagement")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewProjectManagementSettings />
      </main>
    </>
  );
};

export default AddNewProjectManagementSettings;

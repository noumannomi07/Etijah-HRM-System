import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewManageAdditions from "./FormAddNewManageAdditions";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewManageAdditions = () => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <>
      <HelmetInfo titlePage={t("manageAdditions.title")} />
      <BreadCrumbShared textPage={t("manageAdditions.title")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewManageAdditions />
      </main>
    </>
  );
};

export default AddNewManageAdditions;

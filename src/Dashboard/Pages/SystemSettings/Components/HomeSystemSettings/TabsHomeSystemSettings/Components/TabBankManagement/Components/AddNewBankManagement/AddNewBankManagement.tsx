import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewBankManagement from "./FormAddNewBankManagement";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewBankManagement = () => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <>
      <HelmetInfo titlePage={t("bankManagement.title")} />
      <BreadCrumbShared textPage={t("bankManagement.title")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewBankManagement />
      </main>
    </>
  );
};

export default AddNewBankManagement;

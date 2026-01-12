import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewManageDiscounts from "./FormAddNewManageDiscounts";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewManageDiscounts = () => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <>
      <HelmetInfo titlePage={t("manageDiscounts.title")} />
      <BreadCrumbShared textPage={t("manageDiscounts.title")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewManageDiscounts />
      </main>
    </>
  );
};

export default AddNewManageDiscounts;

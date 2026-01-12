import React from "react";
import { useTranslation } from "react-i18next";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewManagingReasonsLeaving from "./FormAddNewManagingReasonsLeaving";

const AddNewManagingReasonsLeaving = () => {
  const { t } = useTranslation("systemSettings");

  return (
    <>
      <HelmetInfo titlePage={t("managingReasonsLeaving.addNew.pageTitle")} />
      <BreadCrumbShared textPage={t("managingReasonsLeaving.addNew.breadcrumb")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewManagingReasonsLeaving />
      </main>
    </>
  );
};

export default AddNewManagingReasonsLeaving;

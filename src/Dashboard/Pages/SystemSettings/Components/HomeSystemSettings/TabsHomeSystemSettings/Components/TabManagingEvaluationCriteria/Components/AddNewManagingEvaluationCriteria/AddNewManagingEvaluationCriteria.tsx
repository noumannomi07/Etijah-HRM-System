import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import AddEditManagingEvaluation from "../TableManagingEvaluationCriteria/AddEditManagingEvaluation";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewManagingEvaluationCriteria = () => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <>
      <HelmetInfo titlePage={t("performanceEvaluationManagement.title")} />
      <BreadCrumbShared textPage={t("performanceEvaluationManagement.title")} />
      <HeaderButtonBack />
      <main>
        <AddEditManagingEvaluation />
      </main>
    </>
  );
};

export default AddNewManagingEvaluationCriteria;

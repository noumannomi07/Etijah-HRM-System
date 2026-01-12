import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewManageChainApprovals from "./FormAddNewManageChainApprovals";
import React from "react";
import { useTranslation } from "react-i18next";

const AddNewManageChainApprovals = () => {
        const { t } = useTranslation("systemSettings");
  return (
    <>
      <HelmetInfo titlePage={t("approvalChainsManagement.title")} />
      <BreadCrumbShared textPage={t("approvalChainsManagement.title")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewManageChainApprovals />
      </main>
    </>
  );
};

export default AddNewManageChainApprovals;

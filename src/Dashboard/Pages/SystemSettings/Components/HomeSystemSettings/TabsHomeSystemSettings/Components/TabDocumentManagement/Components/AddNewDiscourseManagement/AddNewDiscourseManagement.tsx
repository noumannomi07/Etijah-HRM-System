import HelmetInfo from "@/components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewDocumentManagement from "./FormAddNewDiscourseManagement";
import { useTranslation } from "react-i18next";

const AddNewDocumentManagement = () => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <>
      <HelmetInfo titlePage={t("documentManagement.title")} />
      <BreadCrumbShared textPage={t("documentManagement.title")} />
      <HeaderButtonBack />
      <main>
        <FormAddNewDocumentManagement />
      </main>
    </>
  );
};

export default AddNewDocumentManagement;

import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewCurrencyManagement from "./FormAddNewCurrencyManagement";

const AddNewCurrencyManagement = () => {
  return (
    <>
      <HelmetInfo titlePage={"إدارة العملات"} />
      <BreadCrumbShared textPage="إدارة العملات" />
      <HeaderButtonBack />
      <main>
        <FormAddNewCurrencyManagement />
      </main>
    </>
  );
};

export default AddNewCurrencyManagement;

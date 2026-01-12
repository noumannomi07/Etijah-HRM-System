import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import FormAddNewViolationsManagement from "./FormAddNewViolationsManagement";

const AddNewViolationsManagement = () => {
  return (
    <>
      <HelmetInfo titlePage={"إدارة المخالفات"} />
      <BreadCrumbShared textPage="إدارة المخالفات" />
      <HeaderButtonBack />
      <main>
        <FormAddNewViolationsManagement />
      </main>
    </>
  );
};

export default AddNewViolationsManagement;

import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import ContentInfoNewPermisssion from "./ContentInfoNewPermisssion";
import BreadCrumbShared from "../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../Shared/HeaderButtonBack/HeaderButtonBack";

const TabAddNewPermissionPage = () => {
  return (
    <>
      <HelmetInfo titlePage={"إضافة صلاحية جديدة"} />

      <BreadCrumbShared textPage="إضافة صلاحية جديدة" />
      {/* ==================== START HEADER PAGE REQUEST =================== */}
      <HeaderButtonBack />
      {/* ==================== END HEADER PAGE REQUEST =================== */}
      <main>
        <ContentInfoNewPermisssion />
      </main>
    </>
  );
};

export default TabAddNewPermissionPage;

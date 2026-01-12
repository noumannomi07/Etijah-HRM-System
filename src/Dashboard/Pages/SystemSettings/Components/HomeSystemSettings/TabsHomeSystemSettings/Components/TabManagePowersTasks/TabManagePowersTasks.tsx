import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import ModalTabManage from "./ModalTabManage";
import { FullRoutes } from "@/Routes/routes";

const TabManagePowersTasks = () => {
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const theadTrContent = [
    "الرقم",
    "إسم الصلاحية",
    "عدد المستخدمين",
    "عدد الصلاحيات",
    "الحالة",
    "",
  ];

  const data = [
    {
      id: 1,
      name: "مدير مباشر",
      number1: "2",
      number2: "3",
    },
    {
      id: 2,
      name: "مدير مباشر",
      number1: "2",
      number2: "3",
    },
    {
      id: 3,
      name: "مدير مباشر",
      number1: "2",
      number2: "3",
    },
    {
      id: 4,
      name: "مدير مباشر",
      number1: "2",
      number2: "3",
    },
    {
      id: 5,
      name: "مدير مباشر",
      number1: "2",
      number2: "3",
    },
  ];

  // CONTENT OF ARRAY
  const tbodyContent = data.map((item) => [
    <div key={item.id}># {item.id}</div>,
    item.name,
    item.number1,
    item.number2,
    <div key={item.id}>
      <ToggleSwitchCheck id={item.id} />
    </div>,
    <div key={item.id}>
      <ButtonsActionShowEditDelete
        functionShow={() => {}}
        functionEdit={() => {}}
        functionDelete={() => {
          buttonOpenModalDelete();
        }}
      />
    </div>,
  ]);

  //   OPEN MODAL DELETE
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const navigate = useNavigate();
  return (
    <>
      <ModalDelete
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        titleModal="حذف من النظام نهائيا ؟"
        textModal={
          "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
        }
      />

      <ModalTabManage modalOpen={open} hideModal={handleOpen} />
      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={"إدارة الصلاحيات والمهام"}
          isButtonAll={false}
          routePageInfo={false}
          textLink={false}
          buttonAddNewOrder={false}
          isButtonSystemSettings={true}
          functionButtonAddNewOrder={() => {
            navigate(FullRoutes.Dashboard.SystemSettings.AddNewPermissionPage);
          }}
          newButtonWithoutText={false}
          functionButtonNewButton={false}
          textButton={false}
          newComponentsHere={false}
        />
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={true}
          functionButtonFilter={() => {
            handleOpen();
          }}
          isTrueButtonsModalContentRight={false}
          functionButtonModalOne={false}
          textContentButtonOne={false}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo={false}
          functionModalButtonTwo={false}
          textContetButtonTwo={false}
        />
      </div>
    </>
  );
};

export default TabManagePowersTasks;

import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalViolationsManagement from "../ModalViolationsManagement/ModalViolationsManagement";
import { FullRoutes } from "@/Routes/routes";
import React from "react";

const TableViolationsManagement = () => {
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // SHOW MODAL DETAILS WORK
  const [openDetails, setOpenDetails] = useState(false);
  const handleDetailsOpen = () => setOpenDetails(!openDetails);

  const theadTrContent = ["الرقم", "إسم المخالفة", "الجزاء", "تاريخ الإنشاء", "الحالة", ""];

  // CONTENT OF ARRAY
  const tbodyContent = [].map((item) => [
    <div key={item.id}># {item.id}</div>,
    item.name,
    item.type,
    item.date,
    <ToggleSwitchCheck key={item.id} id={item.id} />,
    <div key={item.id}>
      <ButtonsActionShowEditDelete
        functionShow={() => {
          handleDetailsOpen();
        }}
        functionEdit={() => {
          navigate(`addNewViolationsManagement/${item.id}`)
        }}
        functionDelete={() => {
          buttonOpenModalDelete();
        }}
      />
    </div>
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
          " في حال حذف المخالفة سيتم حذفها من النظام نهائيا ولا يمكن الرجوع لها مرة أخرى"
        }
      />

      <ModalViolationsManagement modalOpen={open} hideModal={handleOpen} />

      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={"إدارة المخالفات"}
          isButtonAll={false}
          routePageInfo={false}
          textLink={false}
          buttonAddNewOrder={false}
          isButtonSystemSettings={true}
          functionButtonAddNewOrder={() => {
            navigate(
              FullRoutes.Dashboard.SystemSettings.AddNewViolationsManagement
            );
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

export default TableViolationsManagement;

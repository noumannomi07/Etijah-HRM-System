import React, { useCallback, useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { Link } from "react-router-dom";

import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import { Advance } from "@/Dashboard/Pages/types";
import { FullRoutes } from "@/Routes/routes";
import DateIcon from "@assets/images/sidebaricons/dateicon.svg";
import UserDetails from "../ModalsOrder/ModalVacationDetails/UserDetails";
import ModalFilterPredecessorRequests from "./ModalFilterPredecessorRequests";
import DetailsInfoDiv from "./Components/AdvanceRequestDetailsModal/DetailsInfoDiv";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import ModalDetails from "../components/ModalDetails";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useAdvances } from "@/hooks/api";
import { toast } from "react-toastify";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewPredecessorRequests from "./Components/AddNePredecessorRequests/FormAddNewPredecessorRequests";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { withPermissions } from "@/hoc";

interface PredecessorRequestsProps {
  filter?: "mine" | "all";
}

const PredecessorRequests: React.FC<PredecessorRequestsProps> = ({
  filter = "all"
}) => {
  const { t } = useTranslation("orders");
  const [openAddNewRequest, setOpenAddNewRequest] = useState(false);
  const toggleOpenAddNewRequest = () => {
    setOpenAddNewRequest(!openAddNewRequest);
  };
  const [selectedRow, setSelectedRow] = useState<Advance>();

  const [modalState, setModalState] = useState({
    delete: false,
    edit: false,
    show: false,
    filter: false
  });

  const toggleModal = useCallback((modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
    useAdvances();
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteItem(id);
        toast.success("تم الحذف بنجاح");
        toggleModal("delete");
      } catch (error) {
        toast.error(error?.response?.data?.message || "حدث خطأ أثناء الحذف");
      }
    },
    [deleteItem, toggleModal]
  );

  const theadTrContent = [
    // "#",
    t("tableHeaders.employee"),
    t("tableHeaders.requestedAmount"),
    t("tableHeaders.repaymentPeriod"),
    t("tableHeaders.repaymentStartDate"),
    t("tableHeaders.status"),
    t("tableHeaders.actions")
  ];
  if (queryAll.isLoading) {
    return <Loading />;
  }

  const tbodyContent = queryAll.data?.[filter]?.map((item) => [
    // item.employee?.code?.toString(),
    <div key={item.id} className="flex items-center gap-3 h-16">
      <Link
        to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
          { id: item.id }
        )}
        className="flex items-center gap-3"
      >
        <img
          src={item.employee?.image}
          alt="img user"
          loading="lazy"
          className="h-12 w-12 object-cover rounded-md"
        />
        <div className="flex flex-col justify-center gap-1">
          <div className="text-overflow-ellipsis max-w-32 font-medium">
            {item.employee?.name}
          </div>
          <div className="text-sm text-gray-600">
            {item.employee?.jobtitle?.title}
          </div>
          <div className="text-sm text-gray-500">#{item.employee?.code}</div>
        </div>
      </Link>
    </div>,
    <div key={item.id} className={"status-primary flex items-center gap-2"}>
      {item.amount} <Saudiriyal />
    </div>,
    item.months + " " + t("advanceRequests.details.months"),
    <div key={item.id} className="item-center-flex">
      <img src={DateIcon} alt="date" /> {item.start_date}
    </div>,
    <StatusBadge key={item.id} status={item.status} />,
    <button
      onClick={() => {
        toggleModal("show");
        setSelectedRow(item);
      }}
      key={item.id}
      className="btn-main button-green"
    >
      {t("buttons.view")}
    </button>
    // <div key={item.id}>
    //   <ButtonsActionShowEditDelete
    //     hideShowFunction={true}
    //     functionEdit={() => {
    //       setSelectedRow(item);
    //       toggleModal("edit");
    //     }}
    //     hideDelete
    //   />
    // </div>
  ]);

  // GET DATA
  const theadSchedules = ["موعد السداد", "المبلغ", "الحالة"];

  const allSchedules = selectedRow?.schedules || [];

  const tbodySchedules =
    allSchedules.length > 0
      ? allSchedules.map((schedule, index) => [
          <div className="text-font-dark">{schedule.month} / {schedule.year}</div>,
         
          <div
            key={index}
            className="flex items-center gap-2 text-font-dark text-[15px] justify-center"
          >
            {schedule.amount} <Saudiriyal />
          </div>,
          <StatusBadge key={index} status={schedule.status} />,
     
        ])
      : [[{}]];

  return (
    <>
      <DeleteModal
        isOpen={modalState.delete}
        toggleModalDelete={() => toggleModal("delete")}
        titleModal="حذف من النظام نهائيا ؟"
        textModal="هل أنت متأكد من رغبتك في حذف وقت العمل هذا؟ لن تتمكن من استرجاعه لاحقاً."
        onDelete={() => handleDelete(selectedRow?.id)}
        isDeleting={isDeleting}
      />

      <ModalDetails
        titleHeaderModal={t("modals.details.title")}
        onClikEdit={() => {
          toggleModal("edit");
          toggleModal("show");
        }}
        openModalDetails={modalState.show}
        hiddenModalDetails={() => toggleModal("show")}
        selectedRow={selectedRow}
        refetch={queryAll.refetch}
        isShowProgress={false}
        route="advancestatus"
        newClassModalAdd="modal-predecessor-requests"
        childenContent2={
          <>
            <div className="table-predecessor border-t pt-3 md:border-none">
              <HeaderTableInfo titleHeader="جدول السداد" isButtonAll={false} />
              <DataTableTwo
                theadContent={theadSchedules}
                tbodyContent={tbodySchedules}
                withCheckboxes={false}
                isShowContentFilterInfo={false}
                isShowModalButtonFilter={false}
                showDateFilter={false}
              />
            </div>
          </>
        }
      >
        <div className="main-modal-permission width-full">
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={
              <UserDetails
                image={selectedRow?.employee?.image ?? ""}
                nameUser={`${selectedRow?.employee.first_name} ${selectedRow?.employee.last_name}`}
              />
            }
          />
          <div className="grid-cards-2 gap-x-4 gap-y-1">
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("advanceRequests.details.advancePurpose")}
              textDetails={t("advanceRequests.details.personal")}
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("advanceRequests.details.amount")}
              textDetails={
                <>
                  <div className="flex items-center gap-2">
                    {selectedRow?.amount}{" "}
                    {t("common.currency") === "ريال" ? (
                      <Saudiriyal />
                    ) : (
                      t("common.currency")
                    )}
                  </div>
                </>
              }
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("advanceRequests.details.repaymentPeriod")}
              textDetails={
                selectedRow?.months + " " + t("advanceRequests.details.months")
              }
            />

            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("advanceRequests.details.repaymentStartDate")}
              textDetails={selectedRow?.start_date}
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("vacationRequests.details.file")}
              textDetails={
                selectedRow?.file ? (
                  <img width={100} src={selectedRow?.file} alt="letter" />
                ) : (
                  <p>-</p>
                )
              }
            />
          </div>
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={t("advanceRequests.details.notes")}
            textDetails={
              selectedRow?.note ?? t("advanceRequests.details.noNotes")
            }
          />
        </div>
      </ModalDetails>
      <ModalFilterPredecessorRequests
        open={modalState.filter}
        hiddenModal={() => toggleModal("filter")}
      />
      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={t("advanceRequests.title")}
          isButtonAll={false}
          textLink={false}
          buttonAddNewOrder={true}
          functionButtonAddNewOrder={() => {
            // navigate(FullRoutes.Dashboard.Orders.AddNewPredecessorRequests);
            toggleOpenAddNewRequest();
          }}
          newButtonWithoutText={false}
          newComponentsHere={false}
        />
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={false}
          functionButtonFilter={() => {
            toggleModal("filter");
          }}
          isTrueButtonsModalContentRight={false}
          isTrueButtonTwoModalContent={false}
          functionButtonModalOne={() => {}}
          textContentButtonOne=""
          newClassButtonTwo=""
          functionModalButtonTwo={() => {}}
          showDateFilter={false}
          onChangeDateFilter={() => {}}
          textContetButtonTwo=""
        />
      </div>
      <CustomModal
        isOpen={modalState.edit}
        titleModal={`التعديل علي سلفة ${selectedRow?.employee?.name}`}
        handleOpen={() => toggleModal("edit")}
      >
        <FormAddNewPredecessorRequests
          id={selectedRow?.id}
          cancel={() => toggleModal("edit")}
          isDisabledEmployee={true}
        />
      </CustomModal>

      <CustomModal
        isOpen={openAddNewRequest}
        titleModal={``}
        newClassModal={"modal-shared-style"}
        handleOpen={() => {
          toggleOpenAddNewRequest();
        }}
      >
        <FormAddNewPredecessorRequests />
      </CustomModal>
    </>
  );
};

export default withPermissions(PredecessorRequests, "advances_requests");

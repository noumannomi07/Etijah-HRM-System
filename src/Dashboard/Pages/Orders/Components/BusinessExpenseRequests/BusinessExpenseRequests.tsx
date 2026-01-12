import React, { useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import { ExpenseRequest } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useExpenses } from "@/hooks/orders/expenses";
import { FullRoutes } from "@/Routes/routes";
import male from "@assets/images/homeimages/users/male.png";
import { Link } from "react-router-dom";
import ModalFilterPredecessorRequests from "../PredecessorRequests/ModalFilterPredecessorRequests";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import ModalDetails from "../components/ModalDetails";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { ExpensesForm } from "./Components/AddNewBusinessExpenseRequests/ExpensesForm";
import i18next from "i18next";
import { withPermissions } from "@/hoc";

interface BusinessExpenseRequestsProps {
  filter?: "mine" | "all";
}

const BusinessExpenseRequests: React.FC<BusinessExpenseRequestsProps> = ({
  filter = "all"
}) => {
  const { t } = useTranslation("orders");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [selectedRow, setSelectedRow] = useState<ExpenseRequest>();

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const handleOpenModalDetails = () => {
    setOpenModalDetails(true);
  };

  const hidenOpenModalDetails = () => {
    setOpenModalDetails(false);
  };
     const [openAddNewRequest,setOpenAddNewRequest]=useState(false)
    const toggleOpenAddNewRequest=() => {
      setOpenAddNewRequest(!openAddNewRequest)
    }
  const { data: expenses, isLoading, refetch } = useExpenses(filter);
  const theadTrContent = [
    // "#",
    t("tableHeaders.employee"),
    t("tableHeaders.expenseCategory"),
    t("tableHeaders.value"),
    t("tableHeaders.date"),
    t("tableHeaders.status"),
    t("tableHeaders.actions")
  ];

  if (isLoading) {
    return <Loading />;
  }
  const tbodyContent = (expenses ?? []).map((item) => [
    // item.employee?.code?.toString(),
    <div key={item.id} className="flex items-center gap-3 h-16">
    <Link to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId({ id: item.id })} className="flex items-center gap-3">
      <img 
        src={item.employee?.image} 
        alt="img user" 
        loading="lazy" 
        className="h-12 w-12 object-cover rounded-md"
      />
      <div className="flex flex-col justify-center gap-1">
        <div className="text-overflow-ellipsis max-w-32 font-medium">{item.employee?.name}</div>
        <div className="text-sm text-gray-600">{item.employee?.jobtitle?.title}</div>
        <div className="text-sm text-gray-500">#{item.employee?.code}</div>
      </div>
    </Link>
  </div>
    
    ,
    ,
    <div key={item.id}>{i18next.language === 'ar'? item.expense_mangment_id?.ar_title : item.expense_mangment_id?.en_title}</div>,
    <div key={item.id} className={"status-primary"}>
      {item.amount.toString()}
    </div>,
    <div key={item.id}>{item.date}</div>,
    <StatusBadge type="vacation" status={item.status} />,
    <button
      onClick={() => {
        handleOpenModalDetails();
        setSelectedRow(item);
      }}
      key={item.id}
      className="btn-main button-green"
    >
      {t("buttons.view")}
    </button>
  ]);

  return (
    <>
      <ModalDetails
        titleHeaderModal={t("modals.details.title")}
        openModalDetails={openModalDetails}
        hiddenModalDetails={hidenOpenModalDetails}
        selectedRow={selectedRow}
        refetch={refetch}
        isShowProgress={false}
        route="expensestatus"
        newClassModalAdd="modal-remove-edit"
      >
        <div className="main-modal-permission width-full">
          <div className="grid-cards-2">
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("businessExpenses.details.expenseCategory")}
              textDetails={selectedRow?.expense_mangment_id?.ar_title}
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("businessExpenses.details.requestedAmount")}
              textDetails={
                <>
                  <div className="flex items-center gap-2">
                    {selectedRow?.amount ?? 0} <Saudiriyal />
                  </div>
                </>
              }
            />
          </div>
          <div className="grid-cards-2">
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("businessExpenses.details.expenseDate")}
              textDetails={selectedRow?.date}
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("businessExpenses.details.notes")}
              textDetails={selectedRow?.content}
            />
          </div>
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={t("businessExpenses.details.employee")}
            textDetails={
              <div
                className="flex items-center gap-3 py-1"
                key={selectedRow?.employee?.id}
              >
                <img
                  src={male}
                  className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
                  alt="img user"
                  loading="lazy"
                />
                {`${selectedRow?.employee?.first_name}  ${selectedRow?.employee?.last_name}`}
              </div>
            }
          />
        </div>
      </ModalDetails>
      <ModalFilterPredecessorRequests open={open} hiddenModal={handleOpen} />
      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={t("businessExpenses.title")}
          isButtonAll={false}
          textLink={false}
          buttonAddNewOrder={true}
          functionButtonAddNewOrder={() => {
            // navigate(FullRoutes.Dashboard.Orders.AddNewBusinessExpenseRequests);
toggleOpenAddNewRequest()
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
          functionButtonFilter={handleOpen}
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
             <CustomModal
                isOpen={openAddNewRequest}
                titleModal={`طلب نفقة جديد`}
                newClassModal={"modal-shared-style"}
                handleOpen={() => {toggleOpenAddNewRequest()}}
            >
           <ExpensesForm />
            </CustomModal>
      </div>
    </>
  );
};

export default withPermissions(BusinessExpenseRequests, "expenses_requests");

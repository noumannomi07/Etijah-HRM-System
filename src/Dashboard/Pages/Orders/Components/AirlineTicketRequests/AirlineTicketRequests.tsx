import React, { useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { AirlineTicket } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useAirlineTickets } from "@/hooks/orders/airlinetickets/useAirlineTickets";
import ModalSelectEmployee from "./ModalSelectEmployee";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import i18next from "i18next";
import theDateObj from "@/Dashboard/DateMonthDays";
import ModalDetails from "../components/ModalDetails";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { FullRoutes } from "@/Routes/routes";
import { Link } from "react-router-dom";
import { withPermissions } from "@/hoc";

const AirlineTicketRequests = () => {
  const { t } = useTranslation("orders");
  const { data: airlineTickets, isPending, refetch } = useAirlineTickets();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const langgg = i18next.language;

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const handleOpenModalDetails = () => {
    setOpenModalDetails(true);
  };
  const hidenOpenModalDetails = () => {
    setOpenModalDetails(false);
  };
  const theadTrContent = [
    // "#",
    t("tableHeaders.employee"),
    t("tableHeaders.requestType"),
    t("tableHeaders.date"),
    t("tableHeaders.totalAmount"),
    t("tableHeaders.status"),
    t("tableHeaders.actions")
  ];
  const [selectedRow, setSelectedRow] = useState<AirlineTicket>();
  if (isPending) {
    return <Loading />;
  }
  const tbodyContent = airlineTickets.map((ticket) => [
    // ticket.employee?.code?.toString(),
    <div key={ticket.id} className="flex items-center gap-3 h-16">
      <Link
        to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
          { id: ticket.id }
        )}
        className="flex items-center gap-3"
      >
        <img
          src={ticket.employee?.image}
          alt="img user"
          loading="lazy"
          className="h-12 w-12 object-cover rounded-md"
        />
        <div className="flex flex-col justify-center gap-1">
          <div className="text-overflow-ellipsis max-w-32 font-medium">
            {ticket.employee?.name}
          </div>
          <div className="text-sm text-gray-600">
            {ticket.employee?.jobtitle?.title}
          </div>
          <div className="text-sm text-gray-500">#{ticket.employee?.code}</div>
        </div>
      </Link>
    </div>,
    <div key={ticket.id} className={"status-primary"}>
      {ticket.request_type === "ticket"
        ? t("airlineTickets.ticketTypes.reserveTicket")
        : ticket.request_type === "ticket_refund"
        ? t("airlineTickets.ticketTypes.ticketCompensation")
        : t("airlineTickets.ticketTypes.ticketPayment")}
    </div>,
    <div key={ticket.id}>
      {langgg == "ar"
        ? theDateObj.formatDataFunctionAR(ticket.date)
        : theDateObj.formatDataFunctionEN(ticket.date)}
    </div>,
    <div key={ticket.id} className={"status-primary"}>
      <div className="flex items-center gap-2">
        {ticket?.price} <Saudiriyal />
      </div>
    </div>,
    <div key={ticket.id}>
      <StatusBadge status={ticket?.status} />
    </div>,
    <button
      onClick={() => {
        handleOpenModalDetails();
        setSelectedRow(ticket);
      }}
      key={ticket.id}
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
        route="ticketstatus"
        newClassModalAdd="modal-remove-edit"
      >
        <div className="main-modal-permission width-full">
          <div className="grid-cards-2">
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.tripReason")}
              textDetails={t("airlineTickets.details.businessMeeting")}
            />

            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.requestType")}
              textDetails={
                selectedRow?.request_type === "ticket"
                  ? t("airlineTickets.ticketTypes.reserveTicket")
                  : selectedRow?.request_type === "ticket_refund"
                  ? t("airlineTickets.ticketTypes.ticketCompensation")
                  : t("airlineTickets.ticketTypes.ticketPayment")
              }
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.expenseDate")}
              textDetails={selectedRow?.date}
            />

            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.destination")}
              textDetails={
                selectedRow?.to === null
                  ? t("airlineTickets.details.notSpecified")
                  : selectedRow?.to
              }
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.ticketPrice")}
              textDetails={
                <>
                  <div className="flex items-center gap-2">
                    {selectedRow?.price} <Saudiriyal />
                  </div>
                </>
              }
            />
            <DetailsInfoDiv
              newClassName={"flex-between"}
              titleDetails={t("airlineTickets.details.vatAmount")}
              textDetails={
                <>
                  <div className="flex items-center gap-2">
                    {selectedRow?.tax} <Saudiriyal />
                  </div>
                </>
              }
            />
          </div>
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={t("airlineTickets.details.totalAmount")}
            textDetails={
              <>
                <div className="flex items-center gap-2">
                  {Number(selectedRow?.price || 0) +
                    Number(selectedRow?.tax || 0)}{" "}
                  <Saudiriyal />
                </div>
              </>
            }
          />
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={t("airlineTickets.details.notes")}
            textDetails={selectedRow?.content}
          />
        </div>
      </ModalDetails>

      <ModalSelectEmployee open={open} hiddenModal={handleOpen} />

      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={t("airlineTickets.title")}
          isButtonAll={false}
          textLink={false}
          buttonAddNewOrder={true}
          functionButtonAddNewOrder={() => {
            handleOpen();
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
            handleOpen();
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
    </>
  );
};

export default withPermissions(AirlineTicketRequests, "flight_requests");

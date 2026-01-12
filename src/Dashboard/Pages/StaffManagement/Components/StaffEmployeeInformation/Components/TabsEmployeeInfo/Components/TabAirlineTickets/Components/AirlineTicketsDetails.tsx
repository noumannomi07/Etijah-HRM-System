import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import MedicalInsuranceIcon from "@/assets/images/staffmanagementpage/iconssteps/medicalinsuranceicon";
import { Loading } from "@/components";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { useEmployeeTicket } from "@/hooks/employee/manage/tickets/useEmployeeTicket";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditAirlineTickets from "./EditAirlineTickets/EditAirlineTickets";
import FormEditAirlineTickets from "./EditAirlineTickets/FormEditAirlineTickets";
import EmployeeTicketRequest from "./EmployeeTicketRequest/EmployeeTicketRequest";
import AirplaneIcon from "@/assets/images/staffmanagementpage/iconssteps/airplaneicon";

const AirlineTicketsDetails = () => {

  const { t } = useTranslation("staffManagement");
  
  const { data: ticket, isPending } = useEmployeeTicket();

  console.log(ticket);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  if (isPending) return <Loading />;

  if (!ticket)
    return (
      <div className="airine-tickets-details border-width-content">
        <HeaderTableInfo titleHeader={t("airlineTickets.title")} />

        <div className="w-full flex justify-end mb-8">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-main button-green height--50 flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-md"
          >
            <MedicalInsuranceIcon />
            {t("airlineTickets.addAirlineTicket")}
          </button>
        </div>

        <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-xl py-4 px-6 shadow-sm">
          <div className="flex items-center gap-3 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <span className="text-red-600 text-lg font-bold text-center">
                {t("airlineTickets.noAirlineTicketData")}
              </span>
            </div>
          </div>
        </div>

        <CustomModal
          newClassModal={""}
          isOpen={isOpen}
          handleOpen={handleOpen}
          titleModal={t("airlineTickets.addAirlineTicket")}
          classBodyContent={""}
        >
          <FormEditAirlineTickets onClose={handleOpen} />
        </CustomModal>
      </div>
    );

  const personsCount = `${ticket.country_ticket.adult} ${t("airlineTickets.adults")}  -  ${
    ticket.country_ticket.child
  } ${t("airlineTickets.children")}  -  ${ticket.country_ticket.infant} ${t(
    "airlineTickets.infants"
  )}`;
  const amount = (
   
      <div className="flex items-center gap-2"> 
        {ticket.country_ticket.amount} <Saudiriyal />
      </div>

  );

  const entitlement = ticket.used_this_year
    ? t("airlineTickets.usedThisYear")
    : t("airlineTickets.notUsedThisYear");
  const entitlementDate = new Date(ticket.created_at).toLocaleDateString();

  const cardData = [
    { titleDetails: t("airlineTickets.category"), textDetails: ticket.country_ticket.title },
    {
      titleDetails: t("airlineTickets.personsCount"),
      textDetails: personsCount
    },
    { 
      titleDetails: t("airlineTickets.amount"), 
      textDetails: (
        <div className="flex items-center gap-2">
          {ticket.country_ticket.amount} <Saudiriyal />
        </div>
      )
    },
    { titleDetails: t("airlineTickets.entitlement"), textDetails: entitlement },
    {
      titleDetails: t("airlineTickets.entitlementDate"),
      textDetails: entitlementDate
    }
  ];

  return (
    <>
    <div className="airine-tickets-details border-width-content">
      <HeaderTableInfo titleHeader={t("airlineTickets.title")} />

      <div className="w-full flex justify-end mb-8">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-main button-green height--50 flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-md"
          >
            <AirplaneIcon />
            {t("airlineTickets.updateAirlineTicket")}
          </button>
        </div>


      <div className="all-card-tickets-airline grid-cards-2 gap-0 gap-x-4">
        {cardData.map((card, index) => (
          <DetailsInfoDiv
            key={index}
            newClassName={""}
            titleDetails={card.titleDetails}
            textDetails={card.textDetails}
          />
        ))}
      </div>
    </div>

    {ticket.used_this_year && ticket.approved_requests && (
      <>
        <div className="airine-tickets-details border-width-content">
          <HeaderTableInfo titleHeader={t("airlineTickets.requests title")} />
          <EmployeeTicketRequest employeeRequests={ticket.approved_requests} />
        </div>
      </>
    )}





    <CustomModal
        newClassModal={""}
        isOpen={isOpen}
        handleOpen={handleOpen}
        titleModal={t("airlineTickets.addAirlineTicket")}
        classBodyContent={""}
      >
        <FormEditAirlineTickets onClose={handleOpen} />
      </CustomModal>
    </>
  );
};

export default AirlineTicketsDetails;

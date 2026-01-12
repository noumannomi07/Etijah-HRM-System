import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalVacationsTypes from "./ModalVacationsTypes";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import ModalVacationDetails from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/ModalVacationDetails";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { DateDisplay } from "./components/DateDisplay";
import { StatusBadge } from "./components/StatusBadge";
import { getDaysBetweenDates } from "@/Dashboard/utils/date";
import { VacationEntry, VacationType } from "@/Dashboard/Pages/types";
import { useTranslation } from "react-i18next";
import ModalDetails from "@/Dashboard/Pages/Orders/Components/components/ModalDetails";
import FormAddNewRequest from "@/Dashboard/Pages/Orders/Components/AddNewRequest/FormAddNewRequest";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";

const TableVacationsInfo = ({
  vacations,
  vacationsTypes,
  employeeId
}: {
  vacations: VacationEntry[];
  vacationsTypes: VacationType[];
  employeeId: string;
}) => {
  const { t } = useTranslation("staffManagement");
  const { t: trans } = useTranslation("orders");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [selectedVacation, setSelectedVacation] =
    useState<VacationEntry | null>(null);

  const handleOpenModalDetails = (item: VacationEntry) => {
    setSelectedVacation(item);
    setOpenModalDetails(true);
  };

  const hidenOpenModalDetails = () => {
    setOpenModalDetails(false);
  };

  const [openModalForm, setOpenModalForm] = useState(false);
  const toggleOpenModalForm = () => {
    setOpenModalForm(!openModalForm);
  };

  const theadTrContent = [
    // t("vacations.requestNumber"),
    t("vacations.duration"),
    t("vacations.vacationDate"),
    t("vacations.type"),
    t("vacations.status"),
    ""
  ];

  const tbodyContent = (vacations ?? []).map((item) => {
    const days = getDaysBetweenDates(item?.start_date, item?.end_date);

    return [
      // item?.id,
      <DateDisplay date={`${days} ${t("vacations.days")}`} />,
      <div className="flex gap-2 justify-center items-center">
        <span>{item.start_date}</span>
        <span> - </span>
        <span>{item.end_date}</span>
      </div>,
      item?.vacation_type?.title,
      <StatusBadge status={item?.status} />,
      <button
        onClick={() => handleOpenModalDetails(item)}
        key={item?.id}
        className="btn-main button-green"
      >
        {t("common.view")}
      </button>
    ];
  });

  const navigate = useNavigate();
  return (
    <>
      <ModalDetails
        titleHeaderModal={trans("modals.details.title")}
        openModalDetails={openModalDetails}
        hiddenModalDetails={hidenOpenModalDetails}
        selectedRow={selectedVacation}
        isShowProgress={true}
        route="vacationsstatus"
      >
        <div className="grid-cards-2 gap-x-4 gap-y-1">
          <DetailsInfoDiv
            newClassName={""}
            titleDetails={trans("vacationRequests.details.vacationType")}
            textDetails={selectedVacation?.vacation_type?.ar_title}
          />
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={trans("vacationRequests.details.vacationPeriod")}
            textDetails={`${selectedVacation?.start_date} - ${selectedVacation?.end_date}`}
          />
        </div>
        <div className="grid-cards-2 gap-x-4 gap-y-1">
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={trans("vacationRequests.details.startDate")}
            textDetails={selectedVacation?.start_date}
          />
          <DetailsInfoDiv
            newClassName={"flex-between"}
            titleDetails={trans("vacationRequests.details.endDate")}
            textDetails={selectedVacation?.end_date}
          />
        </div>
        <DetailsInfoDiv
          newClassName={""}
          titleDetails={trans("vacationRequests.details.notes")}
          textDetails={selectedVacation?.note}
        />
        <DetailsInfoDiv
          newClassName={"flex-between"}
          titleDetails={trans("vacationRequests.details.file")}
          textDetails={
            selectedVacation?.file ? (
              <img width={100} src={selectedVacation?.file} alt="letter" />
            ) : (
              <p>-</p>
            )
          }
        />
      </ModalDetails>

      <ModalVacationsTypes
        open={open}
        hiddenModal={handleOpen}
        defaultValues={vacationsTypes || []}
      />

      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={t("vacations.vacationRecord")}
          isButtonAll={false}
          textLink={false}
          buttonAddNewOrder={false}
          newButtonWithoutText={true}
          functionButtonNewButton={() => {
            // navigate(`${FullRoutes.Dashboard.Orders.AddNewRequest}?employee_id=${employeeId}`);
            toggleOpenModalForm();
          }}
          textButton={
            <span>
              <FontAwesomeIcon icon={faPlus} />{" "}
              {t("vacations.requestNewVacation")}
            </span>
          }
          newComponentsHere={
            <button
              className="btn-main p-[11px_22px]"
              onClick={() => handleOpen()}
            >
              {t("vacations.vacationTypes")}
            </button>
          }
        />
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isTrueButtonsModalContentRight={false}
          isTrueButtonTwoModalContent={false}
          showDateFilter={false}
          onChangeDateFilter={() => {}}
          isShowModalButtonFilter={false}
          functionButtonFilter={() => {}}
          functionButtonModalOne={() => {}}
          textContentButtonOne=""
          newClassButtonTwo=""
          functionModalButtonTwo={() => {}}
          textContetButtonTwo=""
        />
      </div>

      <ModalShared open={openModalForm} hiddenModal={toggleOpenModalForm}>
        <FormAddNewRequest
          cancel={toggleOpenModalForm}
          employeeId={employeeId}
          isDisabledEmployee={true}
        />
      </ModalShared>
    </>
  );
};

export default TableVacationsInfo;

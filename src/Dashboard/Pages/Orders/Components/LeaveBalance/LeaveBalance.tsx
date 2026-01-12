import React, { useCallback, useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { VacationEntry } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useVacations } from "@/hooks/orders/vacations/useVacations";
import { Loading } from "@/components";
import ModalDetails from "../components/ModalDetails";
import { useTranslation } from "react-i18next";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewRequest from "../AddNewRequest/FormAddNewRequest";
import { withPermissions } from "@/hoc";
import { useVacationBalance } from "@/hooks/Tasks";
import { useUser } from "@/contexts";

interface VacationsRequestsProps {
    filter?: "mine" | "all";
}

const LeaveBalance: React.FC<VacationsRequestsProps> = ({
    filter = "all",
}) => {
    const { t } = useTranslation("orders");
    const [openAddNewRequest, setOpenAddNewRequest] = useState(false);
    
    const toggleOpenAddNewRequest = () => {
        setOpenAddNewRequest(!openAddNewRequest);
    };

    const [selectedRow, setSelectedRow] = useState<VacationEntry>();

    // Get logged-in user's employee ID
    const { userProfile, loading: userLoading } = useUser();
    const employeeId = userProfile?.id;

    const { isLoading, refetch } = useVacations(filter);
    
    const { data: vacationBalanceData, isLoading: isLoadingBalance } = useVacationBalance(employeeId);
    
 const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        show: false,
    });

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

   

    const theadTrContent = [
        t("tableHeaders.leaveType"),
        t("tableHeaders.totalDays"),
        t("tableHeaders.paidLeaves"),
        t("tableHeaders.daysTaken"),
        t("tableHeaders.remainingDays"),
    ];

    // Map vacation balance data to table rows
    const tbodyContent = (vacationBalanceData?.types ?? []).map((item: any) => {
        return [
            // Leave Type - plain string for searchability
           
 <span className="inline-block px-3 py-1 text-blue-600 bg-blue-100 rounded-full">
{ item.title}
 </span>,
            // Total Days
            `${item.days_calculated?.real_days || item.days}`,

            // Paid Leaves
            item.paid === 1 
                ? <span className="text-green-600 font-medium">Yes</span>
                : <span className="text-red-600 font-medium">No</span>,

            // Days Taken
            `${item.days_calculated?.taken_days || 0}`,

            // Remaining Days
            `${item.days_calculated?.left_days || 0}`,
        ];
    });

    if (isLoading || isLoadingBalance || userLoading) {
        return <Loading />;
    }

    return (
        <>
        

            <ModalDetails
                titleHeaderModal={t("modals.details.title")}
                onClikEdit={() => {
                    toggleModal("edit");
                    toggleModal("show");
                }}
                openModalDetails={modalState.show}
                hiddenModalDetails={() => toggleModal("show")}
                selectedRow={selectedRow}
                refetch={refetch}
                isShowProgress={true}
                route="vacationsstatus"
            >
                <div className="grid-cards-2 gap-x-4 gap-y-1">
                    <DetailsInfoDiv
                        newClassName={""}
                        titleDetails={t(
                            "vacationRequests.details.vacationType"
                        )}
                        textDetails={selectedRow?.vacation_type?.ar_title}
                    />
                    <DetailsInfoDiv
                        newClassName={"flex-between"}
                        titleDetails={t(
                            "vacationRequests.details.vacationPeriod"
                        )}
                        textDetails={`${selectedRow?.days} ${t(
                            "vacationRequests.details.days"
                        )}`}
                    />
                </div>
                <div className="grid-cards-2 gap-x-4 gap-y-1">
                    <DetailsInfoDiv
                        newClassName={"flex-between"}
                        titleDetails={t("vacationRequests.details.startDate")}
                        textDetails={selectedRow?.start_date}
                    />
                    <DetailsInfoDiv
                        newClassName={"flex-between"}
                        titleDetails={t("vacationRequests.details.endDate")}
                        textDetails={selectedRow?.end_date}
                    />
                </div>
                <div className="grid-cards-2 gap-x-4 gap-y-1">
                    <DetailsInfoDiv
                        newClassName={""}
                        titleDetails={t("vacationRequests.details.notes")}
                        textDetails={selectedRow?.note}
                    />
                    <DetailsInfoDiv
                        newClassName={"flex-between"}
                        titleDetails={t("vacationRequests.details.file")}
                        textDetails={
                            selectedRow?.file ? (
                                <img
                                    width={100}
                                    src={selectedRow?.file}
                                    alt="letter"
                                />
                            ) : (
                                <p>-</p>
                            )
                        }
                    />
                </div>
            </ModalDetails>

        

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("requestTypes.leaveBalance")}
                    isButtonAll={false}
                    textLink={true}
                    buttonAddNewOrder={false}
                    newButtonWithoutText={false}
                    newComponentsHere={false}
                />
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={() => toggleModal("filter")}
                    isTrueButtonsModalContentRight={false}
                    isTrueButtonTwoModalContent={false}
                    functionButtonModalOne={() => {}}
                    textContentButtonOne=""
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                    showDateFilter={false}
                    onChangeDateFilter={() => {}}
                    showButtonImportExcel={false}
                />
            </div>

          

            <CustomModal
                isOpen={openAddNewRequest}
                titleModal={``}
                newClassModal={"modal-shared-style"}
                handleOpen={() => {
                    toggleOpenAddNewRequest();
                }}
            >
                <FormAddNewRequest />
            </CustomModal>
        </>
    );
};

export default withPermissions(LeaveBalance, "vacations_requests");

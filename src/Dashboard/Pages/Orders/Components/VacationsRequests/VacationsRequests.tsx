import React, { useCallback, useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import { VacationEntry } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { FullRoutes } from "@/Routes/routes";
import { useVacations } from "@/hooks/orders/vacations/useVacations";
import { Link } from "react-router-dom";
import ModalFilterData from "./ModalFilterData/ModalFilterData";
import { Loading } from "@/components";
import ModalDetails from "../components/ModalDetails";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import { useDeleteVacation } from "@/hooks/orders/vacations";
import { toast } from "react-toastify";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewRequest from "../AddNewRequest/FormAddNewRequest";
import i18next from "i18next";
import { withPermissions } from "@/hoc";
import { FileMosaic, ExtFile } from "@files-ui/react";

interface VacationsRequestsProps {
    filter?: "mine" | "all";
}

// Helper function to convert file URL to ExtFile format for FileMosaic
const createExtFileFromUrl = (url: string): ExtFile => {
    const fileName = url.split('/').pop() || 'file';
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    // Determine MIME type based on extension
    let type = 'application/octet-stream';
    if (['jpg', 'jpeg'].includes(extension)) {
        type = 'image/jpeg';
    } else if (extension === 'png') {
        type = 'image/png';
    } else if (['gif', 'webp', 'svg'].includes(extension)) {
        type = `image/${extension}`;
    } else if (extension === 'pdf') {
        type = 'application/pdf';
    } else if (extension === 'doc') {
        type = 'application/msword';
    } else if (extension === 'docx') {
        type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (extension === 'xls') {
        type = 'application/vnd.ms-excel';
    } else if (extension === 'xlsx') {
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return {
        id: url,
        name: fileName,
        size: 0,
        type: type,
        downloadUrl: url,
        imageUrl: url,
    } as ExtFile;
};

const VacationsRequests: React.FC<VacationsRequestsProps> = ({
    filter = "all",
}) => {
    const { t } = useTranslation("orders");
    const [openAddNewRequest, setOpenAddNewRequest] = useState(false);
    const toggleOpenAddNewRequest = () => {
        setOpenAddNewRequest(!openAddNewRequest);
    };

    const [selectedRow, setSelectedRow] = useState<VacationEntry>();

    const { data: vacations, isLoading, refetch } = useVacations(filter);
    const { mutate: deleteItem, isPending: isDeleting } = useDeleteVacation();

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        show: false,
    });
    console.log({ isDeleting });

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(
        async (id: string) => {
            try {
                await deleteItem(id);
                toast.success("تم الحذف بنجاح");
                toggleModal("delete");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "حدث خطأ أثناء الحذف"
                );
            }
        },
        [deleteItem, toggleModal]
    );

    const theadTrContent = [
        // "#",
        t("tableHeaders.employee"),
        t("tableHeaders.vacationType"),
        t("tableHeaders.date"),
        t("tableHeaders.duration"),
        t("tableHeaders.status"),
        t("tableHeaders.actions"),
    ];

    const tbodyContent = (vacations ?? []).map((item) => {
        return [
            // item.employee?.code?.toString(),
            <div key={item.id} className="flex items-center gap-3 h-16">
                <Link
                    to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                        { id: item.employee_id }
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
                        <div className="text-sm text-gray-500">
                            #{item.employee?.code}
                        </div>
                    </div>
                </Link>
            </div>,

            <span className="inline-block px-3 py-1 text-blue-600 bg-blue-100 rounded-full">
                {i18next.language === "en"
                    ? item.vacation_type?.en_title
                    : item.vacation_type?.ar_title}
            </span>,
            <div className="flex flex-col items-start gap-2">
                <div>
                    {format(new Date(item.start_date), "d MMMM", {
                        locale: i18next.language === "ar" ? ar : undefined,
                    })}{" "}
                    -{" "}
                    {format(new Date(item.end_date), "d MMMM", { 
                        locale: i18next.language === "ar" ? ar : undefined 
                    })}
                </div>
            </div>,
            `${item.days} ${t("vacationRequests.details.days")}`,
            <StatusBadge status={item.status} />,
            <button
                key={item.id}
                onClick={() => {
                    setSelectedRow(item);
                    toggleModal("show");
                }}
                className="px-6 py-2 text-white bg-[#32A840] rounded-md hover:bg-[#2c9639] transition-colors"
            >
                {t("buttons.view")}
            </button>,
            <div key={item.id}>
                {/* <ButtonsActionShowEditDelete
          hideShowFunction={true}
          functionEdit={() => {
            setSelectedRow(item);
            toggleModal("edit");
          }}
          hideDelete
          // functionDelete={() => {
          //     setSelectedRow(item);
          //     toggleModal("delete");
          // }}
        /> */}
            </div>,
        ];
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                titleModal={t("modals.delete.vacationTitle")}
                textModal={t("modals.delete.vacationMessage")}
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
                                <FileMosaic
                                    key={selectedRow.file}
                                    {...createExtFileFromUrl(selectedRow.file)}
                                    info
                                    preview
                                />
                            ) : (
                                <p>-</p>
                            )
                        }
                    />
                </div>
            </ModalDetails>

            <ModalFilterData
                open={modalState.filter}
                hiddenModal={() => toggleModal("filter")}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("vacationRequests.title")}
                    isButtonAll={false}
                    textLink={true}
                    buttonAddNewOrder={true}
                    functionButtonAddNewOrder={() => {
                        // navigate(FullRoutes.Dashboard.Orders.AddNewRequest);
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
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                newClassModal={"modal-shared-style"}
                titleModal={`${t("modals.edit.title")} ${selectedRow?.employee?.name}`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormAddNewRequest
                    id={selectedRow?.id?.toString()}
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
                <FormAddNewRequest />
            </CustomModal>
        </>
    );
};

export default withPermissions(VacationsRequests, "vacations_requests");

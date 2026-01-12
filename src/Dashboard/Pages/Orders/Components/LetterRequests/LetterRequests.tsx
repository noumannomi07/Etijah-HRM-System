import React, { useCallback, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import { LetterRequest } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { FullRoutes } from "@/Routes/routes";
import ModalFilterLetterRequests from "./ModalFilterLetterRequests";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import ModalDetails from "../components/ModalDetails";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { toast } from "react-toastify";
import { useLetters } from "@/hooks/api";
import FormAddNewLetter from "./Components/AddNewLetterRequests/FormAddNewLetter";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { withPermissions } from "@/hoc";

interface LetterRequestsProps {
    filter?: "mine" | "all";
}

const LetterRequests: React.FC<LetterRequestsProps> = ({ filter = "all" }) => {
    const { t } = useTranslation("orders");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [selectedRow, setSelectedRow] = useState<LetterRequest>();
    const [openModalDetails, setOpenModalDetails] = useState(false);
    const [openAddNewRequest, setOpenAddNewRequest] = useState(false);
    const toggleOpenAddNewRequest = () => {
        setOpenAddNewRequest(!openAddNewRequest);
    };
    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        show: false,
    });

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleOpenModalDetails = () => {
        setOpenModalDetails(true);
    };
    const hidenOpenModalDetails = () => {
        setOpenModalDetails(false);
    };

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useLetters();
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

    const navigate = useNavigate();

    const theadTrContent = [
        // "#",
        t("tableHeaders.employee"),
        t("tableHeaders.letterTemplate"),
        t("tableHeaders.directedTo"),
        t("tableHeaders.status"),
        t("tableHeaders.actions"),
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
                    <div className="text-sm text-gray-500">
                        #{item.employee?.code}
                    </div>
                </div>
            </Link>
        </div>,
        <div key={item.id} className={"status-primary"}>
            {item.letter_mangment.title}
        </div>,

        <div className="flex items-center gap-3 justify-center" key={item.id}>
            {item.directed_to}
        </div>,
        <StatusBadge status={item.status} type="letter" />,
        <button
            onClick={() => {
                handleOpenModalDetails();
                setSelectedRow(item);
            }}
            key={item.id}
            className="btn-main button-green"
        >
            {t("buttons.view")}
        </button>,
        // <div key={item.id}>
        //   <ButtonsActionShowEditDelete
        //     hideShowFunction={true}
        //     functionEdit={() => {
        //       toggleModal("edit");
        //       setSelectedRow(item);
        //     }}
        //     hideDelete={true}
        //   />
        // </div>
    ]);

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
                    hidenOpenModalDetails();
                }}
                openModalDetails={openModalDetails}
                hiddenModalDetails={hidenOpenModalDetails}
                selectedRow={selectedRow}
                refetch={queryAll.refetch}
                isShowProgress={false}
                route="letterstatus"
                isShowButtons={true}
                vacation={selectedRow}
            >
                <div className="main-modal-permission width-full">
                    <div className="grid-cards-2">
                        <DetailsInfoDiv
                            newClassName={"flex-between"}
                            titleDetails={t(
                                "letterRequests.details.letterTemplate"
                            )}
                            textDetails={selectedRow?.letter_mangment.title}
                        />

                        <DetailsInfoDiv
                            newClassName={"flex-between"}
                            titleDetails={t(
                                "letterRequests.details.directedTo"
                            )}
                            textDetails={selectedRow?.directed_to}
                        />
                    </div>
                    <div className="grid-cards-2">
                        <DetailsInfoDiv
                            newClassName={"flex-between"}
                            titleDetails={t("letterRequests.details.reason")}
                            textDetails={selectedRow?.letter_mangment.title}
                        />
                        <DetailsInfoDiv
                            newClassName={"flex-between"}
                            titleDetails={t("letterRequests.details.notes")}
                            textDetails={selectedRow?.note}
                        />
                        <DetailsInfoDiv
                            newClassName={"flex-between"}
                            titleDetails={t(
                                "letterRequests.details.roomOfCommerce"
                            )}
                            textDetails={
                                selectedRow?.room_of_commerce ? "نعم" : "لا"
                            }
                        />
                    </div>
                    <DetailsInfoDiv
                        newClassName={"flex-between"}
                        titleDetails={t("letterRequests.details.letterImage")}
                        textDetails={
                            selectedRow?.letter_mangment.image ? (
                                <img
                                    width={100}
                                    src={selectedRow?.letter_mangment.image}
                                    alt="letter"
                                />
                            ) : (
                                <p>-</p>
                            )
                        }
                    />
                </div>
            </ModalDetails>

            <ModalFilterLetterRequests open={open} hiddenModal={handleOpen} />
            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("letterRequests.title")}
                    isButtonAll={false}
                    textLink={false}
                    buttonAddNewOrder={true}
                    functionButtonAddNewOrder={() => {
                        // navigate(
                        //     FullRoutes.Dashboard.Orders.AddNewLetterRequests
                        // );

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

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`التعديل علي خطاب ${selectedRow?.employee?.name}`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormAddNewLetter
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
                <FormAddNewLetter />
            </CustomModal>
        </>
    );
};

export default withPermissions(LetterRequests, "letters_requests");

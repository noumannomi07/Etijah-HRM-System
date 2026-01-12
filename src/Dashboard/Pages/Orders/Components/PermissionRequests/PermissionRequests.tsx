import React, { useCallback, useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";

import { Link, useNavigate } from "react-router-dom";
import ModalFilterPerisssionRequest from "./ModalFilterPerisssionRequest";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import { useLeaveRequests } from "@/hooks/api";
import { Loading } from "@/components";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";

import ModalDetails from "../components/ModalDetails";
import UserDetails from "../components/UserDetails";
import DetailsInfoDiv from "../components/DetailsInfoDiv";
import { StatusBadge } from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabVacations/components/StatusBadge";
import { toast } from "react-toastify";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormComponent from "./Components/FormComponent";
import { withPermissions } from "@/hoc";

interface PermissionRequestsProps {
    filter?: "mine" | "all";
}

const PermissionRequests: React.FC<PermissionRequestsProps> = ({
    filter = "all",
}) => {
    const { t } = useTranslation("orders");
    const [openAddNewRequest, setOpenAddNewRequest] = useState(false);
    const toggleOpenAddNewRequest = () => {
        setOpenAddNewRequest(!openAddNewRequest);
    };

    const { queryAll, deleteItem, isDeleting } = useLeaveRequests();
    const langgg = i18next.language;

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        show: false,
    });

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
        t("tableHeaders.permissionType"),
        t("tableHeaders.permissionDate"),
        t("tableHeaders.leaveTime"),
        t("tableHeaders.status"),
        t("tableHeaders.actions"),
    ];
    const [selectedRow, setSelectedRow] = useState();

    // CONTENT OF ARRAY
    const tbodyContent = queryAll?.data?.[filter || "all"]?.map((item: any) => [
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
            {item?.leavemange?.title}
        </div>,

        langgg == "ar"
            ? theDateObj.formatDataFunctionAR(item.date)
            : theDateObj.formatDataFunctionEN(item.date),

        item.time,
        <StatusBadge status={item.status} />,
        <button
            onClick={() => {
                setSelectedRow(item);
                toggleModal("show");
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
        //       setSelectedRow(item);
        //       toggleModal("edit");
        //     }}
        //     hideDelete
        //   />
        // </div>
    ]);

    const navigate = useNavigate();

    if (queryAll.isLoading) {
        return <Loading />;
    }
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
                route="leaverequeststatus"
            >
                <div>
                    <div className="flex  w-full items-center">
                        <div className="w-full flex-between ">
                            <UserDetails
                                image={selectedRow?.employee.image}
                                nameUser={selectedRow?.employee.name}
                            />
                        </div>
                        <DetailsInfoDiv
                            newClassName={"w-full flex-between"}
                            titleDetails={"نوع الإذن"}
                            textDetails={selectedRow?.leavemange.title}
                        />
                    </div>
                    <div className="flex  w-full items-center">
                        <DetailsInfoDiv
                            newClassName={"w-full flex-between"}
                            titleDetails={"التاريخ"}
                            textDetails={selectedRow?.date}
                        />
                        <DetailsInfoDiv
                            newClassName={"w-full flex-between"}
                            titleDetails={"الوقت"}
                            textDetails={selectedRow?.time}
                        />
                    </div>
                </div>
            </ModalDetails>

            <ModalFilterPerisssionRequest
                open={modalState.filter}
                hiddenModal={() => toggleModal("filter")}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("permissionRequests.title")}
                    isButtonAll={false}
                    routePageInfo={false}
                    textLink={false}
                    buttonAddNewOrder={true}
                    functionButtonAddNewOrder={() => {
                        // navigate(
                        //     FullRoutes.Dashboard.Orders.AddNewPermissionRequest
                        // );

                        toggleOpenAddNewRequest();
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
                    // isShowModalButtonFilter={true}
                    functionButtonFilter={() => {
                        toggleModal("filter");
                    }}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`التعديل علي إذن الـ ${selectedRow?.employee?.name}`}
                handleOpen={() => toggleModal("edit")}
            >
                {modalState.edit && (
                    <FormComponent
                        id={selectedRow?.id}
                        cancel={() => toggleModal("edit")}
                        isDisabledEmployee={true}
                    />
                )}
            </CustomModal>
            <CustomModal
                isOpen={openAddNewRequest}
                titleModal={``}
                newClassModal={"modal-shared-style"}
                handleOpen={() => {
                    toggleOpenAddNewRequest();
                }}
            >
                {openAddNewRequest && <FormComponent />}
            </CustomModal>
        </>
    );
};

export default withPermissions(PermissionRequests, "leave_requests");

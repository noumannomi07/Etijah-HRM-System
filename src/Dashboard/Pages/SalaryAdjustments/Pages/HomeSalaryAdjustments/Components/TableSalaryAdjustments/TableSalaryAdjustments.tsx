import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDetailsSalaryAdjustments from "./ModalDetailsSalaryAdjustments/ModalDetailsSalaryAdjustments";
import ModalFilterSalaryAdjustments from "./ModalFilterSalaryAdjustments/ModalFilterSalaryAdjustments";
import { FullRoutes } from "@/Routes/routes";
import { useSalaryadjustment } from "@/hooks/api";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import ModalEndServiceCalculator from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabSalary/ModalsSalary/ModalEndServiceCalculator";
import DateHeaderSalaryMarches from "@/Dashboard/Pages/SalaryMarches/Pages/HomeSalaryMarches/AllHomeSalaryMarches/HeaderCardsSalaryMarches/DateHeaderSalaryMarches";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { toast } from "react-toastify";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import Form from "../../../AddNewSalaryAdjustments/TabsAddSalaryAdjustments/Form";
import { withPermissions } from "@/hoc";

export interface SalaryAdjustmentItem {
    id: number;
    type: string;
    reason:
        | "cut"
        | "bonus"
        | "expenses"
        | "deduction"
        | "allowance"
        | "violation"
        | "overtime"
        | "ticket_refund"
        | "gosi"
        | "end_of_service"
        | "early"
        | "late"
        | "absent"
        | "advance"
        | string;
    employee_name?: string;
    employee_image?: string;
    employee_code?: string;
    amount?: number;
    cut_ar_title?: string;
    cut_en_title?: string;
    bonus_ar_title?: string;
    bonus_en_title?: string;
    deduction_ar_title?: string;
    deduction_en_title?: string;
    allowance_ar_title?: string;
    allowance_en_title?: string;
    flight_request?: {
        id: number;
    };
    expense?: {
        expense_mangment_id: {
            title: string;
        };
    };
}

const TableSalaryAdjustments = ({ permissions }: { permissions: any }) => {
    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [searchParams] = useSearchParams();
    const start_of_month = searchParams.get("start_of_month");
    const { queryAll, deleteItem, isDeleting } = useSalaryadjustment({
        month: new Date(start_of_month || new Date()).getMonth() + 1,
        year: new Date(start_of_month || new Date()).getFullYear(),
    });

    const handleDelete = useCallback(
        async (id: string) => {
            try {
                await deleteItem(id);
                toast.success(t('modal.delete.success', { ns: 'salaryAdjustments' }));
                setModalState({ ...modalState, delete: false });
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || t('modal.delete.error', { ns: 'salaryAdjustments' })
                );
            }
        },
        [deleteItem, setModalState, modalState]
    );

    const { t } = useTranslation("staffManagement");
    const { t: tAdjustment } = useTranslation('salaryAdjustments');

    const renderAdjustmentType = (item: SalaryAdjustmentItem) => {
        const getStatusColor = (type: string) => {
            if (type === "cut") return "status-danger";
            if (type === "bonus") return "status-success";
            return "text-gray-500";
        };

        const reasons = {
            cut: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.cut'),
                description: item.cut_title || "—",
            },
            bonus: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.bonus'),
                description: item.bonus_title || "—",
            },
            expenses: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.expenses'),
                description: item?.expense?.expense_mangment_id.title || "—",
            },
            ticket_refund: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.ticketRefund'),
                description:
                    tAdjustment('adjustmentDescriptions.ticketRefund') + " " +
                    (item?.flight_request?.id || "—"),
            },
            violation: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.violation'),
                description: item?.violation?.violation_rule.title || "—",
            },
            overtime: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.overtime'),
                description: `${tAdjustment('adjustmentDescriptions.overtime')} ${item?.attendance?.date || "—"}`,
            },
            gosi: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.gosi'),
                description: tAdjustment('adjustmentDescriptions.gosiDeduction'),
            },
            absent: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.absent'),
                description: `${tAdjustment('adjustmentDescriptions.absent')} ${item?.attendance?.date || "—"}`,
            },
            end_of_service: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.endOfService'),
                description: tAdjustment('adjustmentDescriptions.endOfService'),
            },
            advance: {
                color: getStatusColor(item.type),
                title: tAdjustment('adjustmentTypes.advance'),
                description: tAdjustment('adjustmentDescriptions.advancePayment'),
            },
        };

        const reason = reasons[item.reason as keyof typeof reasons] || {
            color: "text-gray-500",
            title: "—",
            description: "—",
        };

        return (
            <div className="flex items-center justify-center w-full">
                <div className="relative group text-center">
                    <Tooltip
                        title={reason.description}
                        arrow
                        placement="bottom"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "rgba(0, 0, 0, 0.85)",
                                    "& .MuiTooltip-arrow": {
                                        color: "rgba(0, 0, 0, 0.85)",
                                    },
                                    maxWidth: "300px",
                                    fontSize: "16px",
                                },
                            },
                        }}
                    >
                        <span
                            className={`font-medium cursor-help ${reason.color}`}
                        >
                            {" "}
                            {reason.title || "—"}
                        </span>
                    </Tooltip>
                </div>
            </div>
        );
    };

    const tableHead = [
        // tAdjustment('table.headers.adjustmentNumber'),
        tAdjustment('table.headers.employeeName'),
        tAdjustment('table.headers.adjustmentType'),
        tAdjustment('table.headers.amount'),
        tAdjustment('table.headers.actions'),
    ];

    const navigate = useNavigate();

    // ID OF TD TO ROUTE OF TD ID
    const [selectedDocument, setSelectedDocument] = useState(null);

    // SHOW MODAL DETAILS
    const [openModalDetails, setOpenModalDetails] = useState(false);
    const handleOpenModalDetails = (document) => {
        setSelectedDocument(document);
        setOpenModalDetails(true);
    };
    const hiddenOpenModalDetails = () => setOpenModalDetails(false);

    // calculate end of service
    const [openModalCalculateEndOfService, setOpenModalCalculateEndOfService] =
        useState(false);
    const hiddenOpenModalCalculateEndOfService = () =>
        setOpenModalCalculateEndOfService(false);

    useEffect(() => {
        queryAll.refetch();
    }, [start_of_month]);

    if (queryAll.isLoading) return <Loading />;
    // CONTENT OF ARRAY
    const renderTableRow = (item: SalaryAdjustmentItem) => [
        // <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={item.id} className="flex items-center gap-3 h-16">
            <Link
                to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                    { id: item.employee_id }
                )}
                className="flex items-center gap-3"
            >
                <img
                    src={item.employee_image}
                    alt="img user"
                    loading="lazy"
                    className="h-12 w-12 object-cover rounded-md"
                />
                <div className="flex flex-col justify-center gap-1">
                    <div className="text-overflow-ellipsis max-w-32 font-medium">
                        {item.employee_name}
                    </div>

                    <div className="text-sm text-gray-500">
                        #{item.employee_code}
                    </div>
                </div>
            </Link>
        </div>,
        <div
            key={`reason-${item.id}`}
            className="flex justify-center flex-col text-center"
        >
            {renderAdjustmentType(item)}
        </div>,
        <div
            key={`amount-${item.id}`}
            className="flex justify-center flex-col text-center"
        >
            <span
                className={
                    item.type === "cut"
                        ? "text-red-500 flex items-center gap-2 justify-center"
                        : "text-green-500 flex items-center gap-2 justify-center"
                }
            >
                {item.reason === "cut" ? "-" : "+"}{" "}
                {Number(item?.amount || 0).toLocaleString()} <Saudiriyal />
            </span>
        </div>,
        <div key={`actions-${item.id}`}>
            <button
                onClick={() => handleOpenModalDetails(item)}
                className="btn-main button-green"
            >
                {tAdjustment('table.viewButton')}
            </button>
        </div>,
    ];

    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() =>
                    setModalState({ ...modalState, delete: !modalState.delete })
                }
                titleModal={tAdjustment('modal.delete.title')}
                textModal={tAdjustment('modal.delete.message')}
                onDelete={() => handleDelete(selectedDocument?.id)}
                isDeleting={isDeleting}
            />

            <ModalFilterSalaryAdjustments
                open={open}
                hiddenModal={handleOpen}
            />

            <ModalEndServiceCalculator
                open={openModalCalculateEndOfService}
                hiddenModal={hiddenOpenModalCalculateEndOfService}
                fromEmployee={undefined}
            />

            <ModalDetailsSalaryAdjustments
                hiddenOpenModalDetails={hiddenOpenModalDetails}
                openModalDetails={openModalDetails}
                handleButtonDelete={() =>
                    setModalState({ ...modalState, delete: true })
                }
                handleEdit={() => {
                    setModalState({ ...modalState, edit: true });
                }}
                selectedDocument={selectedDocument}
                routePageAdd={
                    selectedDocument?.id
                        ? FullRoutes.Dashboard.SalaryAdjustments.AddNewSalaryAdjustmentsWithId(
                              {
                                  id: selectedDocument.id,
                              }
                          )
                        : ""
                }
            />

            <div className="table-employment-requests border-width-content">
                <DateHeaderSalaryMarches />
                {/* <HeaderTableInfo
                    newButtonWithoutText
                    textButton={t("salary.endOfServiceCalculator")}
                    functionButtonNewButton={() => {
                        handleOpenModalCalculateEndOfService();
                    }}
                    titleHeader={""}
                /> */}
                <DataTableTwo
                    theadContent={tableHead}
                    tbodyContent={queryAll.data?.map(renderTableRow) ?? []}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={permissions?.create}
                    functionButtonModalOne={() => {
                        navigate(
                            FullRoutes.Dashboard.SalaryAdjustments
                                .AddNewSalaryAdjustments
                        );
                    }}
                    textContentButtonOne={tAdjustment('table.addNewButton')}
                    isTrueButtonTwoModalContent={false}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`${tAdjustment('modal.edit.title')} ${selectedDocument?.employee_name}`}
                handleOpen={() => setModalState({ ...modalState, edit: false })}
                newClassModal={"modal-shared-style"}
            >
                <Form
                    selectedDocument={selectedDocument}
                    cancel={() => setModalState({ ...modalState, edit: false })}
                    refetch={queryAll.refetch}
                />
            </CustomModal>
        </>
    );
};

export default withPermissions(TableSalaryAdjustments, "salary_adjustments", {
    isComponent: true,
});

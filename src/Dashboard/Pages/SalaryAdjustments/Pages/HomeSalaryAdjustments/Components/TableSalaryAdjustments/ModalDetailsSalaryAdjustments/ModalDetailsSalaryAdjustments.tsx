import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import ModalVacationDetails from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/ModalVacationDetails";
import ModalButtonsEditTrash from "@/Dashboard/Shared/ModalButtonsEditTrash/ModalButtonsEditTrash";
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

interface SalaryAdjustmentDocument {
    id: number;
    employee_id: number;
    employee_name: string;
    type: string;
    amount: string;
    cut_ar_title?: string;
    cut_en_title?: string;
    bonus_ar_title?: string;
    bonus_en_title?: string;
    expense?: {
        expense_mangment_id: {
            title: string;
        };
    };
    flight_request?: {
        id: number;
    };
    violation?: {
        violation_rule: {
            title: string;
        };
    };
    attendance?: {
        overtime: string;
    };
    file?: string;
    created_at: string;
    updated_at: string;
}

const ModalDetailsSalaryAdjustments = ({
    openModalDetails,
    hiddenOpenModalDetails,
    selectedDocument,
    handleButtonDelete,
    handleEdit,
    routePageAdd,
}) => {
    const { i18n, t } = useTranslation('salaryAdjustments');
    const lang = i18n.language;

    const getAdjustmentDetails = (document: SalaryAdjustmentDocument) => {
        const reasons = {
            cut: {
                title:
                    lang === "ar"
                        ? document.cut_ar_title
                        : document.cut_en_title,
                color: "text-red-500",
            },
            bonus: {
                title:
                    lang === "ar"
                        ? document.bonus_ar_title
                        : document.bonus_en_title,
                color: "text-green-500",
            },
            expenses: {
                title: document?.expense?.expense_mangment_id.title || "—",
                color: "text-gray-500",
            },
            ticket_refund: {
                title:
                    t('adjustmentDescriptions.ticketRefund') + " " +
                    (document?.flight_request?.id || "—"),
                color: "text-gray-500",
            },
            violation: {
                title: document?.violation?.violation_rule.title || "—",
                color: "text-gray-500",
            },
            overtime: {
                title: `${t('adjustmentDescriptions.overtime')} ${
                    document?.attendance?.overtime || "—"
                } ساعة`,
                color: "text-gray-500",
            },
        };

        return (
            reasons[document.reason as keyof typeof reasons] || {
                title: "—",
                color: "text-gray-500",
            }
        );
    };

    return (
        <ModalVacationDetails
            openModalDetails={openModalDetails}
            hiddenModalDetails={hiddenOpenModalDetails}
            routePageAdd={routePageAdd}
            isShowProgress={false}
            isShowButtons={false}
            titleHeaderModal={t('modal.details.title')}
        >
            <div className="flex justify-end">
                <ModalButtonsEditTrash
                    showEdit={true}
                    openModalDeleteFunction={() => {
                        hiddenOpenModalDetails();
                        handleButtonDelete();
                    }}
                    openModalEditFunction={() => {
                        hiddenOpenModalDetails();
                        handleEdit();
                    }}
                />
            </div>
            <div className="main-modal-permission width-full">
                {selectedDocument ? (
                    <>
                        <div className="grid-cards-2 gap-0 gap-x-4">
                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.adjustmentNumber')}
                                textDetails={`#${selectedDocument.id}`}
                            />

                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.employeeName')}
                                textDetails={
                                    selectedDocument.employee_name || "—"
                                }
                            />

                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.adjustmentType')}
                                textDetails={
                                    <span
                                        className={
                                            getAdjustmentDetails(
                                                selectedDocument
                                            ).color
                                        }
                                    >
                                        {
                                            getAdjustmentDetails(
                                                selectedDocument
                                            ).title
                                        }
                                    </span>
                                }
                            />

                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.amount')}
                                textDetails={
                                    <span
                                        className={
                                            selectedDocument.type === "cut"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }
                                    >
                                        {selectedDocument.type === "cut"
                                            ? "-"
                                            : "+"}{" "}
                                        {Number(
                                            selectedDocument.amount || 0
                                        ).toLocaleString()}{" "}
                                        <Saudiriyal />
                                    </span>
                                }
                            />

                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.createdAt')}
                                textDetails={new Date(
                                    selectedDocument.created_at
                                ).toLocaleDateString(lang === "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            />

                            <DetailsInfoDiv
                                newClassName=""
                                titleDetails={t('modal.details.updatedAt')}
                                textDetails={new Date(
                                    selectedDocument.updated_at
                                ).toLocaleDateString(lang === "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            />

                            {selectedDocument.file && (
                                <div className="sm:col-span-1 md:col-span-2">
                                    <DetailsInfoDiv
                                        newClassName=""
                                        titleDetails={t('modal.details.attachments')}
                                        textDetails={
                                            <a
                                                href={selectedDocument.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t('modal.details.viewAttachment')}
                                            </a>
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <NotDataFound />
                )}
            </div>
        </ModalVacationDetails>
    );
};

ModalDetailsSalaryAdjustments.propTypes = {
    openModalDetails: PropTypes.bool.isRequired,
    hiddenOpenModalDetails: PropTypes.func.isRequired,
    selectedDocument: PropTypes.shape({
        id: PropTypes.number,
        employee_id: PropTypes.number,
        employee_name: PropTypes.string,
        type: PropTypes.string,
        amount: PropTypes.string,
        cut_ar_title: PropTypes.string,
        cut_en_title: PropTypes.string,
        bonus_ar_title: PropTypes.string,
        bonus_en_title: PropTypes.string,
        expense: PropTypes.shape({
            expense_mangment_id: PropTypes.shape({
                title: PropTypes.string,
            }),
        }),
        flight_request: PropTypes.shape({
            id: PropTypes.number,
        }),
        violation: PropTypes.shape({
            violation_rule: PropTypes.shape({
                title: PropTypes.string,
            }),
        }),
        attendance: PropTypes.shape({
            overtime: PropTypes.string,
        }),
        file: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
    }),
    routePageAdd: PropTypes.string.isRequired,
};

export default ModalDetailsSalaryAdjustments;

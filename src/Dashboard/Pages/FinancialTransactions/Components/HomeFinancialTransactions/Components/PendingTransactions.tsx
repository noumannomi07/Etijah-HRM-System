import { PayrollTransaction } from "@/Dashboard/Pages/types";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useUpdatePayrollTransactionStatus } from "@/hooks/payroll/useUpdatePayrollTransactionStatus";
import { formatDateToYmd } from "@/utils/date";
import {
    faCheck,
    faComment,
    faEye,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentsModal from "./CommentsModal";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";

interface PendingTransactionsProps {
    data: PayrollTransaction[];
    isPending: boolean;
}

const PendingTransactions = ({
    data,
    isPending,
    setRefetch,
}: PendingTransactionsProps) => {
    const { t } = useTranslation('financialTransactions');
    const [, setSearchParams] = useSearchParams();
    const { mutate: updateStatus } = useUpdatePayrollTransactionStatus();
    const [selectedComments, setSelectedComments] = useState<any[] | null>(
        null
    );
    const [selectedTransactionId, setSelectedTransactionId] = useState<
        number | null
    >(null);
    const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedDetailsTransactionId, setSelectedDetailsTransactionId] =
        useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionToApprove, setTransactionToApprove] = useState<
        number | null
    >(null);

    // Update selectedComments when data changes and modal is open
    useEffect(() => {
        if (selectedTransactionId && openCommentsModal) {
            const transaction = data.find(
                (item) => item.id === selectedTransactionId
            );
            if (transaction) {
                setSelectedComments(transaction.comments);
            }
        }
    }, [data, selectedTransactionId, openCommentsModal]);

    const handleReject = (id: number) => {
        updateStatus(
            { transaction_id: id, status: "rejected" },
            {
                onSuccess: () => {
                    toast.success(t('modal.reject.success'));
                    setRefetch && setRefetch((prev: boolean) => !prev);
                },
                onError: () => {
                    toast.error(t('modal.reject.error'));
                },
            }
        );
    };

    const handleViewDetails = (id: number) => {
        setSelectedDetailsTransactionId(id);
        setOpenDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setSelectedDetailsTransactionId(null);
    };

    const handleOpenComments = (comments: any[], transactionId: number) => {
        setSelectedComments(comments);
        setSelectedTransactionId(transactionId);
        setOpenCommentsModal(true);
    };

    const handleCloseModal = () => {
        setOpenCommentsModal(false);
        setSelectedComments(null);
        setSelectedTransactionId(null);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            prev.set("search", e.target.value);
            return prev;
        });
    };

    const [openApproveModal, setOpenApproveModal] = useState(false);

    const showApproveModal = (id: number) => {
        setTransactionToApprove(id);
        setOpenApproveModal(true);
    };

    const handleCloseApproveModal = () => {
        setOpenApproveModal(false);
        setTransactionToApprove(null);
    };

    const handleSendTransaction = async () => {
        if (!transactionToApprove) return;

        setIsLoading(true);
        updateStatus(
            { transaction_id: transactionToApprove, status: "approved" },
            {
                onSuccess: () => {
                    toast.success(t('modal.approve.success'));
                    handleCloseApproveModal();
                    setIsLoading(false);
                    setRefetch && setRefetch((prev: boolean) => !prev);

                    // remove the query from the url
                },
                onError: () => {
                    toast.error(t('modal.approve.error'));
                    setIsLoading(false);
                },
            }
        );
    };

    const theadTrContent = [
        t('table.headers.createdAt'),
        t('table.headers.employeesCount'),
        t('table.headers.total'),
        t('table.headers.comments'),
        t('table.headers.actions'),
    ];

    const filteredData = data;

    const tbodyContent = filteredData.map((item) => [
        <div key={`created-${item.id}`} className="flex flex-col items-start">
            <div className="text-sm font-medium text-black">
                {formatDateToYmd(new Date(item.created_at))}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex gap-1">
                <span>{t('table.byUser')}</span>
                <span>{item.admin.name}</span>
            </div>
        </div>,
        <div key={`employees-${item.id}`}>
            {`${item.employees_count ?? 0} ${t('table.employeesText')}`}
        </div>,
        <div key={`total-${item.id}`} className="">
            <Tooltip
                title={
                    <div className="p-3 text-base">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">{t('tooltip.salary')}</span>
                            <span>{item.salary}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-red-300">
                            <span className="font-medium">{t('tooltip.deductions')}</span>
                            <span>- {item.cut}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-green-300">
                            <span className="font-medium">{t('tooltip.bonuses')}</span>
                            <span>{item.bonus}</span>
                        </div>
                        <div className="flex justify-between text-green-300">
                            <span className="font-medium">{t('tooltip.additions')}</span>
                            <span>{item.extra}</span>
                        </div>
                    </div>
                }
                arrow
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
                <span className="cursor-pointer hover:underline">
                    {item.total}
                </span>
            </Tooltip>
        </div>,
        <button
            onClick={() => handleOpenComments(item.comments, item.id)}
            className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 transition-colors w-full cursor-pointer"
        >
            <FontAwesomeIcon icon={faComment} />
            <span>{item.comments.length} {t('table.commentsText')}</span>
        </button>,
        <div
            key={`actions-${item.id}`}
            className="flex items-center gap-2 justify-center"
        >
            <button
                onClick={() => handleViewDetails(item.id)}
                className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEye} />
                    {t('table.viewDetails')}
                </div>
            </button>
            <button
                onClick={() => showApproveModal(item.id)}
                className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    {t('table.approve')}
                </div>
            </button>
            <button
                onClick={() => handleReject(item.id)}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faXmark} />
                    {t('table.reject')}
                </div>
            </button>
        </div>,
    ]);

    return (
        <>
            <CustomModal
                newClassModal={"modal-delete small-modal"}
                isOpen={openApproveModal}
                handleOpen={handleCloseApproveModal}
                titleModal={t('modal.approve.title')}
                classBodyContent={""}
            >
                <div className="content-delete-modal">
                    <h2 className="title text-font-dark text-[17px] sm:text-[20px]">
                        {t('modal.approve.title')}
                    </h2>
                    <p className="text text-font-gray text-[15px] sm:text-[17px] pt-2">
                        {t('modal.approve.message')}
                    </p>
                    <div className="all-buttons-modal-bottom item-center-flex justify-end w-full mt-5">
                        <button
                            onClick={handleSendTransaction}
                            className={`btn-main height--50 w-full sm:w-auto`}
                            disabled={isLoading}
                        >
                            {isLoading ? <SpinnerLoader /> : t('modal.approve.confirm')}
                        </button>
                        <button
                            onClick={handleCloseApproveModal}
                            className="button-transparent height--50 w-full sm:w-auto"
                        >
                            {t('modal.approve.cancel')}
                        </button>
                    </div>
                </div>
            </CustomModal>

            <h2 className="text-xl font-semibold mb-4">{t('tabs.pending')}</h2>

            <DataTableTwo
                isLoading={isPending}
                theadContent={theadTrContent}
                tbodyContent={tbodyContent}
                withCheckboxes={false}
                isShowContentFilterInfo={true}
                isShowModalButtonFilter={false}
                functionButtonFilter={() => {}}
                isTrueButtonsModalContentRight={false}
                functionButtonModalOne={() => {}}
                textContentButtonOne=""
                isTrueButtonTwoModalContent={false}
                functionModalButtonTwo={() => {}}
                textContetButtonTwo=""
                newClassButtonTwo=""
                onSearchChange={onSearchChange}
                showDateFilter={false}
                onChangeDateFilter={() => {}}
            />

            {/* Using the extracted CommentsModal component */}
            <CommentsModal
                open={openCommentsModal}
                onClose={handleCloseModal}
                comments={selectedComments}
                transactionId={selectedTransactionId}
            />

            {/* Employee Details Modal */}
            <EmployeeDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                transactionId={selectedDetailsTransactionId}
            />
        </>
    );
};

export default PendingTransactions;

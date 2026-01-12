import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import React from "react";
import { Loading } from "@/components";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { useEmployeePayroll } from "@/hooks/employee/manage/salary/useEmployeePayroll";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const ModalDetailsSalaryMarches = ({
    openModalDetailsSalaryMarches,
    hiddenModalDetailsSalaryMarches,
}: {
    openModalDetailsSalaryMarches: boolean;
    hiddenModalDetailsSalaryMarches: () => void;
}) => {
    const { t } = useTranslation('salaryMarches');
    const { data, isLoading } = useEmployeePayroll({ id: openModalDetailsSalaryMarches });
    const transaction = data;

    const paymentMethodMap: Record<string, string> = {
        bank: t('paymentMethods.bank'),
        cash: t('paymentMethods.cash'),
        check: t('paymentMethods.check'),
    };

    if (isLoading || !transaction)
        return (
            <CustomModal
                size="xl"
                isOpen={!!openModalDetailsSalaryMarches}
                handleOpen={hiddenModalDetailsSalaryMarches}
                titleModal={t('modal.details.title')}
                classBodyContent={""}
            >
                <Loading />
            </CustomModal>
        );

    // Employee info
    const image = transaction.image || male;
    const name = transaction.name || "";
    const jobTitle = transaction.jobtitle?.title || "";
    const joinDate = transaction.created_at
        ? new Date(transaction.created_at).toLocaleDateString()
        : "";

    // Salary info
    const baseSalary = Number(transaction.salary?.salary || 0);
    const salaryExtras = Array.isArray(transaction.salary?.salaryextra)
        ? transaction.salary.salaryextra
        : [];
    const totalExtras = salaryExtras.reduce((sum, e) => sum + Number(e.amount), 0);

    // Table rows
    const rows = [
        {
            label: t('modal.details.basicSalaryAndAllowances'),
            amount: baseSalary + totalExtras,
        },
        {
            label: t('modal.details.basicSalary'),
            amount: baseSalary,
        },
        ...salaryExtras.map((e) => ({
            label: e.allowance?.title || t('modal.details.allowance'),
            amount: Number(e.amount),
        })),
    ];

    // Total row
    const totalRow = {
        label: t('modal.details.totalSalary'),
        amount: Number(transaction.month_salary || baseSalary + totalExtras),
    };

    // Payment method
    const paymentMethod =
        paymentMethodMap[transaction.salary?.payment_method] || t('paymentMethods.notSpecified');

    // Summary bar values (dummy, all processed)
    const summary = {
        unpaid: 0,
        pending: 0,
        processed: totalRow.amount,
        net: totalRow.amount,
    };

    return (
        <CustomModal
            size="xl"
            isOpen={!!openModalDetailsSalaryMarches}
            handleOpen={hiddenModalDetailsSalaryMarches}
            titleModal={t('modal.details.title')}
            classBodyContent={""}
        >
            <div className="all-content-details-documents">
                {/* Employee Info */}
                <div className="buttons-actions mb-3 flex-between flex-wrap">
                    <Link to={`/dashboard/staff-management/staff-employee-information/${transaction?.id}`} className="image-user item-center-flex">
                        <img
                            src={image}
                            alt="image"
                            className="w-[45px] h-[45px] rounded-full"
                            loading="lazy"
                        />
                        <div>
                            <h2 className="name-user text-font-dark text-[15px]">
                                {name}
                            </h2>
                            <div className="text-xs text-gray-500">
                                {jobTitle}
                            </div>
                            <div className="text-xs text-gray-400">
                                {t('modal.details.joinDate')}: {joinDate}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Period */}
                <div className="text-center mb-4 font-bold">
                    {/* You can adjust the date range as needed */}
                    {`(مارس 01 - مارس 31 ${new Date().getFullYear()})`}
                </div>

                {/* Table */}
                <table className="w-full text-center border mb-4">
                    <thead>
                        <tr>
                            <th>{t('modal.details.paymentElements')}</th>
                            <th>{t('modal.details.amount')}</th>
                            <th>{t('modal.details.processed')}</th>
                            <th>{t('modal.details.pendingApproval')}</th>
                            <th>{t('modal.details.unpaid')}</th>
                            <th>{t('modal.details.notes')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.label}</td>
                                <td>{row.amount.toFixed(2)} <Saudiriyal /></td>
                                <td>{row.amount.toFixed(2)} <Saudiriyal /></td>
                                <td>0.00 <Saudiriyal /></td>
                                <td>0.00 <Saudiriyal /></td>
                                <td></td>
                            </tr>
                        ))}
                        <tr className="font-bold">
                            <td className="text-right pr-4" colSpan={1}>
                                {totalRow.label}
                            </td>
                            <td>{totalRow.amount.toFixed(2)} <Saudiriyal /></td>
                            <td>{totalRow.amount.toFixed(2)} <Saudiriyal /></td>
                            <td>0.00 <Saudiriyal /></td>
                            <td>0.00 <Saudiriyal /></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                {/* Summary bar */}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2 font-bold">
                    <div>{t('modal.details.unpaid')}: 0.00</div>
                    <div>{t('modal.details.pendingApproval')}: 0.00</div>
                    <div>{t('modal.details.processed')}: {summary.processed.toFixed(2)}</div>
                    <div>{t('modal.details.totalNetPay')}: {summary.net.toFixed(2)}</div>
                </div>

                {/* Payment Method */}
                <div className="mb-2 text-left">
                    <span className="font-bold">{t('modal.details.paymentMethod')}:</span> {paymentMethod}
                </div>
            </div>
        </CustomModal>
    );
};

ModalDetailsSalaryMarches.propTypes = {
    openModalDetailsSalaryMarches: PropTypes.bool.isRequired,
    hiddenModalDetailsSalaryMarches: PropTypes.func.isRequired,
};

export default ModalDetailsSalaryMarches;

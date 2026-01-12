import React, { useState } from "react";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import { usePayrollTransactions } from "@/hooks/payroll/usePayrollTransactions";
import {
    PendingTransactions,
    ApprovedTransactions,
    RejectedTransactions,
} from "./Components";
import "./PayrollTransactions.css";
import { Loading } from "@/components";
import DateHeaderSalaryMarches from "@/Dashboard/Pages/SalaryMarches/Pages/HomeSalaryMarches/AllHomeSalaryMarches/HeaderCardsSalaryMarches/DateHeaderSalaryMarches";
import { useTranslation } from "react-i18next";

const PayrollTransactions = () => {
    const { t } = useTranslation('financialTransactions');
    const { data, isPending } = usePayrollTransactions();
    const [refetch, setRefetch] = useState(false);
    const tabsData = [
        {
            label: (
                <span className="relative px-2 py-1">{t('tabs.pending')}</span>
            ),
            content: (
                <PendingTransactions
                    data={data?.pending || []}
                    isPending={isPending}
                    setRefetch={setRefetch}
                />
            ),
        },
        {
            label: (
                <span className="relative px-2 py-1">
                    {t('tabs.approved')}
                </span>
            ),
            content: (
                <ApprovedTransactions
                    data={data?.approved || []}
                    isPending={isPending}
                />
            ),
        },
        {
            label: (
                <span className="relative px-2 py-1">{t('tabs.rejected')}</span>
            ),
            content: (
                <RejectedTransactions
                    data={data?.rejected || []}
                    isPending={isPending}
                />
            ),
        },
    ];
    return (
        <div className="payroll-transactions">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{t('pageTitle')}</h1>
                <p className="text-gray-500">
                    {t('subtitle')}
                </p>
            </div>

            <div className="w-40 mb-2">
                <DateHeaderSalaryMarches refetch={refetch} />
            </div>
            {isPending ? (
                <Loading />
            ) : (
                <>
                    <HorizontalTabs
                        tabsData={tabsData}
                        isBgTabButton={true}
                        newClassName="mt-6"
                    />
                </>
            )}
        </div>
    );
};

export default PayrollTransactions;

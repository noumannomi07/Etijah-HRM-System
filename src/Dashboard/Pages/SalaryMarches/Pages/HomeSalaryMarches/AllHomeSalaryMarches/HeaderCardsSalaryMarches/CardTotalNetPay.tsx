import React, { useState } from "react";
import MoneySalaryIcon from "@assets/images/salarymarches/moneysalaryicon.svg";
import CardEmploymentOne from "@/Dashboard/Pages/Employment/Components/HomeEmployment/HeaderCardEmployment/CardEmploymentOne";
import UseModal from "./UseModal";
import { useTranslation } from "react-i18next";

const CardTotalNetPay = ({ selectedRows, total_salary, setRefetch }) => {
    const { t } = useTranslation('salaryMarches');
    const [isSendTransactionModalOpen, setSendTransactionModalOpen] =
        useState(false);
    const [isApprovalSalariesModalOpen, setApprovalSalariesModalOpen] =
        useState(false);

    const totalSalary = selectedRows.reduce((acc, curr) => acc + curr.month_salary, 0);

    return (
        <>
            <UseModal
                isSendTransactionModalOpen={isSendTransactionModalOpen}
                isApprovalSalariesModalOpen={isApprovalSalariesModalOpen}
                setSendTransactionModalOpen={setSendTransactionModalOpen}
                setApprovalSalariesModalOpen={setApprovalSalariesModalOpen}
                selectedRows={selectedRows}
                setRefetch={setRefetch}
            />
            <div className="card-total-net">
                <CardEmploymentOne
                    iconCard={<img src={MoneySalaryIcon} alt="money" />}
                    title={t('cards.totalNetPay')}
                    numberCounter={totalSalary}
                    typeCurrency={`SAR`}
                />

                <div className="buttons-card-total flex-wrap item-center-flex px-3">
                    <button
                        disabled={selectedRows.length === 0}
                        onClick={() => setSendTransactionModalOpen(true)}
                        className="btn-main height--50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('cards.sendTransaction')}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CardTotalNetPay;

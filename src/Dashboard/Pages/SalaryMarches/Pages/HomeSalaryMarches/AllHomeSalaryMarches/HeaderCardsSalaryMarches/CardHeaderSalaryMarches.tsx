import React from "react";
import MoneyAddSalaryIcon from "@assets/images/salarymarches/moneyaddsalaryicon.svg";
import MoneyDiscountSalaryIcon from "@assets/images/salarymarches/moneydiscountsalaryicon.svg";
import MoneySalaryIcon from "@assets/images/salarymarches/moneysalaryicon.svg";
import UserSalaryIcon from "@assets/images/salarymarches/usersalaryicon.svg";
import CardEmploymentOne from "@/Dashboard/Pages/Employment/Components/HomeEmployment/HeaderCardEmployment/CardEmploymentOne";
import { useTranslation } from "react-i18next";

const CardHeaderSalaryMarches = ({
    employees_count,
    net_salary,
    total_bonus,
    total_cut,
}) => {
    const { t } = useTranslation('salaryMarches');
    
    const cardItems = [
        {
            id: 1,
            title: t('cards.employeesCount'),
            icon: <img src={UserSalaryIcon} alt="users" />,
            numberCounter: employees_count,
        },
        {
            id: 2,
            title: t('cards.totalBasicSalary'),
            icon: <img src={MoneySalaryIcon} alt="money" />,
            numberCounter: net_salary,
        },
        {
            id: 3,
            title: t('cards.totalBonuses'),
            icon: <img src={MoneyAddSalaryIcon} alt="money add" />,
            numberCounter: total_bonus,
        },
        {
            id: 4,
            title: t('cards.totalDeductions'),
            icon: <img src={MoneyDiscountSalaryIcon} alt="money discount" />,
            numberCounter: total_cut,
        },
    ];

    return (
        <div className="all-card-salary-marches h-full grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {cardItems.map((item) => (
                <CardEmploymentOne
                    key={item.id}
                    iconCard={item.icon}
                    title={item.title}
                    numberCounter={item.numberCounter}
                    typeCurrency={item.title !== t('cards.employeesCount') ? `SAR` : ""}
                />
            ))}
        </div>
    );
};

export default CardHeaderSalaryMarches;

import React from "react";

// import CurrencyManagementIcon from "@assets/images/systemsettings/currencymanagementicon.svg";

// import ViolationsManagementIcon from "@assets/images/systemsettings/violationsmanagementicon.svg";
import { VerticalTabs } from "@/Dashboard/Shared/VerticalTabs/VerticalTabs";
import TabGeneralSettings from "./Components/TabGeneralSettings/TabGeneralSettings";
import TabManageChainApprovals from "./Components/TabManageChainApprovals/TabManageChainApprovals";
import TabManageDiscounts from "./Components/TabManageDiscounts/TabManageDiscounts";
// import TabViolationsManagement from "./Components/TabViolationsManagement/TabViolationsManagement";
import TabManagingReasonsLeaving from "./Components/TabManagingReasonsLeaving/TabManagingReasonsLeaving";
import TabManagingEvaluationCriteria from "./Components/TabManagingEvaluationCriteria/TabManagingEvaluationCriteria";
// import TabCurrencyManagement from "./Components/TabCurrencyManagement/TabCurrencyManagement";
import TabBankManagement from "./Components/TabBankManagement/TabBankManagement";
import TabProjectManagementSettings from "./Components/TabProjectManagementSettings/TabProjectManagementSettings";

import TabDocumentManagement from "./Components/TabDocumentManagement/TabDiscourseManagement";
import { useTranslation } from "react-i18next";

// new way
import TabWorkplaceManagement from "./Components/TabWorkplaceManagement/WorkplaceManagement";
import TabAdvanceManagement from "./Components/TabAdvanceManagement/AdvanceManagement";
import TabAllowancesManagement from "./Components/TabAllowancesManagement/AllowancesManagement";
import TabLettersManagement from "./Components/TabLettersManagement/LettersManagement";
import TabExpenseManagement from "./Components/TabExpenseManagement/ExpenseManagement";
import TabLeaveManagement from "./Components/TabLeaveManagement/LeaveManagement";
import TabCountryTicketManagement from "./Components/TabCountryTicketManagement/CountryTicketManagement";
import ContractType from "./Components/TabContractType/ContractType";
import JobType from "./Components/TabJobType/JobType";
import JobRate from "./Components/TabJobRateManagement/JobRateManagement";
import TabOvertimeManagment from "./Components/TabOvertimeManagment/TabOvertimeManagment";
import TabRolesManagement from "./Components/TabRolesManagement/RolesManagement";
import SettingHomeIcon from "@/assets/images/systemsettingsIcons/settinghomeicon";
import OrderIconText from "@/assets/images/sidebaricons/ordericontext";
import MoneyIcon3 from "@/assets/images/systemsettingsIcons/moneyicon3";
import AllowancesManagementIcon from "@/assets/images/systemsettingsIcons/allowancesmanagementicon";
import ChainApprovalsIcon from "@/assets/images/systemsettingsIcons/chainapprovalsicon";
import DateIcon from "@/assets/images/sidebaricons/dateicon";
import DiscountsIcon from "@/assets/images/systemsettingsIcons/discountsicon";
import SettingsIcon from "@/assets/images/systemsettingsIcons/settingsicon";
import LoginIcon from "@/assets/images/sidebaricons/loginIcon";
import StarIcon from "@/assets/images/sidebaricons/staricon";
import BankManagementIcon from "@/assets/images/systemsettingsIcons/bankmanagementicon";
import ManageIcon from "@/assets/images/systemsettingsIcons/manageicon";
import { withPermissions } from "@/hoc";

type TabData = {
    label: React.JSX.Element;
    value: string;
    desc: React.JSX.Element;
};

const TabsHomeSystemSettings = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");

    const tabsData: TabData[] = [
        {
            label: (
                <>
                    <SettingHomeIcon /> {t("tabs.generalSettings")}
                </>
            ),
            value: "1",
            desc: <TabGeneralSettings permissions={permissions} />,
        },
        // {
        //     label: (
        //         <>
        //             <img src={ManageIcon} alt="manage" /> {t("tabs.permissionsAndTasks")}
        //         </>
        //     ),
        //     value: "2",
        //     desc: <TabManagePowersTasks />,
        // },
        {
            label: (
                <>
                    <OrderIconText /> {t("tabs.workplaceManagement")}
                </>
            ),
            value: "3",
            desc: <TabWorkplaceManagement permissions={permissions} />,
        },
        // {
        //     label: (
        //         <>
        //             <img src={DateIconCheck} alt="worktime" /> {t("tabs.workTimeManagement")}
        //         </>
        //     ),
        //     value: "4",
        //     desc: <TabWorkingTimeManagement />,
        // },
        {
            label: (
                <>
                    <MoneyIcon3 /> {t("tabs.advanceManagement")}
                </>
            ),
            value: "5",
            desc: <TabAdvanceManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <AllowancesManagementIcon />{" "}
                    {t("tabs.allowancesManagement")}
                </>
            ),
            value: "6",
            desc: <TabAllowancesManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <OrderIconText /> {t("tabs.lettersManagement")}
                </>
            ),
            value: "7",
            desc: <TabLettersManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <MoneyIcon3 /> {t("tabs.expenseManagement")}
                </>
            ),
            value: "8",
            desc: <TabExpenseManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ChainApprovalsIcon /> {t("tabs.approvalChainsManagement")}
                </>
            ),
            value: "9",
            desc: <TabManageChainApprovals permissions={permissions} />,
        },
        {
            label: (
                <>
                    <DateIcon /> {t("tabs.leaveManagement")}
                </>
            ),
            value: "10",
            desc: <TabLeaveManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <DiscountsIcon /> {t("tabs.discountsManagement")}
                </>
            ),
            value: "11",
            desc: <TabManageDiscounts permissions={permissions} />,
        },
        // {
        //     label: (
        //         <>
        //             <img src={ViolationsManagementIcon} alt="violations" />{" "}
        //             إدارة المخالفات
        //         </>
        //     ),
        //     value: "12",
        //     desc: <TabViolationsManagement />,
        // },
        {
            label: (
                <>
                    <SettingsIcon /> {t("tabs.projectManagement")}
                </>
            ),
            value: "13",
            desc: <TabProjectManagementSettings permissions={permissions} />,
        },
        {
            label: (
                <>
                    <LoginIcon /> {t("tabs.leavingReasonsManagement")}
                </>
            ),
            value: "14",
            desc: <TabManagingReasonsLeaving permissions={permissions} />,
        },
        {
            label: (
                <>
                    <StarIcon /> {t("tabs.performanceEvaluationManagement")}
                </>
            ),
            value: "15",
            desc: <TabManagingEvaluationCriteria permissions={permissions} />,
        },
        // {
        //     label: (
        //         <>
        //             <img src={CurrencyManagementIcon} alt="currency" /> إدارة
        //             العملات
        //         </>
        //     ),
        //     value: "16",
        //     desc: <TabCurrencyManagement />,
        // },
        {
            label: (
                <>
                    <BankManagementIcon /> {t("tabs.bankManagement")}
                </>
            ),
            value: "17",
            desc: <TabBankManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.documentManagement")}
                </>
            ),
            value: "18",
            desc: <TabDocumentManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.countryTicket")}
                </>
            ),
            value: "19",
            desc: <TabCountryTicketManagement permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.contractType")}
                </>
            ),
            value: "20",
            desc: <ContractType permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.jobType")}
                </>
            ),
            value: "21",
            desc: <JobType permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.jobRate")}
                </>
            ),
            value: "22",
            desc: <JobRate permissions={permissions} />,
        },

        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.overtimeManagement")}
                </>
            ),
            value: "23",
            desc: <TabOvertimeManagment permissions={permissions} />,
        },
        {
            label: (
                <>
                    <ManageIcon /> {t("tabs.rolesManagement")}
                </>
            ),
            value: "24",
            desc: <TabRolesManagement permissions={permissions} />,
        },
    ];

    return (
        <>
            <VerticalTabs tabsData={tabsData} />
        </>
    );
};

export default withPermissions(TabsHomeSystemSettings, "settings", {
    isComponent: true,
});

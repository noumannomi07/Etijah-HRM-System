import React from "react";
import { CommonRouteKeys, RelativeRoutes } from "@/Routes/routes";
import ArchiveIcon from "@assets/images/sidebaricons/archiveicon.svg";
import ChartBarIcon from "@assets/images/sidebaricons/chartbaricon.svg";
import ChartIcon from "@assets/images/sidebaricons/charticon.svg";
import DateIcon from "@assets/images/sidebaricons/dateicon.svg";
import DonateIcon from "@assets/images/sidebaricons/donateicon.svg";
import FileSharing from "@assets/images/sidebaricons/filesharing.svg";
import GridIcon from "@assets/images/sidebaricons/gridicon.svg";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import ListViewRectangle from "@assets/images/sidebaricons/listviewrectangle.svg";
import LoginIcon from "@assets/images/sidebaricons/loginicon.svg";
import MoneyArrowRight from "@assets/images/sidebaricons/moneyarrowright.svg";
import MoneyIcon from "@assets/images/sidebaricons/moneyicon.svg";
import OrderIconText from "@assets/images/sidebaricons/ordericontext.svg";
import PinAdsIcon from "@assets/images/sidebaricons/pinadsicon.svg";
import SettingsIcon from "@assets/images/sidebaricons/settingsicon.svg";
import StarIcon from "@assets/images/sidebaricons/staricon.svg";
import TaskDeleteIcon from "@assets/images/sidebaricons/taskdeleteicon.svg";
import TimeIcon from "@assets/images/sidebaricons/timeicon.svg";
import UserAdd from "@assets/images/sidebaricons/useradd.svg";
import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import ManageIcon from "@assets/images/systemsettings/manageicon.svg";
import "./SidebarMenu.css";
import NewsIcon from "@assets/images/sidebaricons/newsicon.svg";
import NotificationIcon from "@assets/images/sidebaricons/notificationicon.svg";
import AttendanceEditIcon from "@assets/images/sidebaricons/attendanceediticon.svg";
import SupportIcon from "@assets/icons/supportIcon.svg";

export const LinksMenu = [
  {
    text: "menu.home",
    icon: <img src={GridIcon} />,
    path: RelativeRoutes.Dashboard.Home,
    translationKey: "menu.home",
    permission: "homepage_statistics"
  },
  {
    text: "menu.requests",
    icon: <img src={OrderIconText} />,
    path: RelativeRoutes.Dashboard.Orders[CommonRouteKeys.Base],
    translationKey: "menu.requests",
    permission: "request"
  },
  {
    text: "menu.staffManagement",
    icon: <img src={UsersIcon} />,
    path: RelativeRoutes.Dashboard.StaffManagement[CommonRouteKeys.Base],
    translationKey: "menu.staffManagement",
    permission: "employees"
  },
  {
    text: "menu.attendance.main",
    icon: <img src={LoginIcon} />,
    path: RelativeRoutes.Dashboard.AttendanceDeparture,
    translationKey: "menu.attendance.main",
    children: [
      {
        text: "menu.attendance.main",
        icon: <img src={LoginIcon} />,
        path: RelativeRoutes.Dashboard.AttendanceDeparture,
        translationKey: "menu.attendance.main",
        permission: "attendance"
      },
      {
        text: "menu.attendance.edits",
        icon: <img src={AttendanceEditIcon} />,
        path: RelativeRoutes.Dashboard.AttendanceDepartureEdits,
        translationKey: "menu.attendance.edits",
        permission: "attendance"
      },
      {
        text: "menu.calendar",
        icon: <img src={DateIcon} />,
        path: RelativeRoutes.Dashboard.CalendarPage,
        translationKey: "menu.calendar",
        permission: "employees_setting"
      },
      {
        text: "menu.shiftSchedule",
        icon: <img src={TimeIcon} />,
        path: RelativeRoutes.Dashboard.ShiftSchedule[CommonRouteKeys.Base],
        translationKey: "menu.shiftSchedule",
        permission: "employees_setting"
      }
    ]
  },

  {
    text: "menu.employeeSettings.main",
    icon: <img src={GridIcon2} />,
    path: RelativeRoutes.Dashboard.Departments[CommonRouteKeys.Base],
    translationKey: "menu.employeeSettings.main",
    children: [
      {
        text: "menu.employeeSettings.departments",
        icon: <img src={FileSharing} />,
        path: RelativeRoutes.Dashboard.Departments[CommonRouteKeys.Base],
        translationKey: "menu.employeeSettings.departments",
        permission: "employees_setting"
      },
      {
        text: "menu.employeeSettings.jobTitles",
        icon: <img src={UsersIcon} />,
        path: RelativeRoutes.Dashboard.JobTitle[CommonRouteKeys.Base],
        translationKey: "menu.employeeSettings.jobTitles",
        permission: "employees_setting"
      },
      {
        text: "menu.employeeSettings.nationalitiesManagement",
        icon: <img src={ManageIcon} />,
        path: RelativeRoutes.Dashboard.NationalitiesManagement[
          CommonRouteKeys.Base
        ],
        translationKey: "menu.employeeSettings.nationalitiesManagement",
        permission: "employees_setting"
      },
      {
        text: "menu.fileCategory",
        icon: <img src={ManageIcon} />,
        path: RelativeRoutes.Dashboard.FileCategory[CommonRouteKeys.Base],
        translationKey: "menu.fileCategory",
        permission: "employees_setting"
      }
    ]
  },
  {
    text: "menu.salaryMarches",
    icon: <img src={DonateIcon} />,
    path: RelativeRoutes.Dashboard.SalaryMarches[CommonRouteKeys.Base],
    translationKey: "menu.salaryMarches",
    permission: "payroll"
  },
  {
    text: "menu.salaryAdjustments",
    icon: <img src={MoneyIcon} />,
    path: RelativeRoutes.Dashboard.SalaryAdjustments[CommonRouteKeys.Base],
    translationKey: "menu.salaryAdjustments",
    permission: "salary_adjustments"
  },
  {
    text: "menu.financialTransactions",
    icon: <img src={MoneyArrowRight} />,
    path: RelativeRoutes.Dashboard.FinancialTransactions[CommonRouteKeys.Base],
    translationKey: "menu.financialTransactions",
    permission: "financial_transactions"
  },
  {
    text: "menu.violationsManagement",
    icon: <img src={TaskDeleteIcon} />,
    path: RelativeRoutes.Dashboard.ViolationsManagement[CommonRouteKeys.Base],
    translationKey: "menu.violationsManagement",
    permission: "violations"
  },
  {
    text: "menu.employment",
    icon: <img src={UserAdd} />,
    path: RelativeRoutes.Dashboard.Employment[CommonRouteKeys.Base],
    translationKey: "menu.employment",
    permission: "applicants"
  },
  {
    text: "menu.recruitmentAds",
    icon: <img src={PinAdsIcon} />,
    path: RelativeRoutes.Dashboard.RecruitmentAds[CommonRouteKeys.Base],
    translationKey: "menu.recruitmentAds",
    permission: "jobs"
  },

  {
    text: "menu.tasks",
    icon: <img src={ListViewRectangle} />,
    path: RelativeRoutes.Dashboard.Tasks[CommonRouteKeys.Base],
    translationKey: "menu.tasks",
    permission: "tasks"
  },
  {
    text: "menu.bonus",
    icon: <img src={StarIcon} />,
    path: RelativeRoutes.Dashboard.Bonus[CommonRouteKeys.Base],
    translationKey: "menu.bonus",
    permission: "rewards"
  },
  {
    text: "menu.reports",
    icon: <img src={ChartBarIcon} />,
    path: RelativeRoutes.Dashboard.Reports,
    translationKey: "menu.reports",
    permission: "reports"
  },
  {
    text: "menu.performanceIndicator",
    icon: <img src={ChartIcon} />,
    path: RelativeRoutes.Dashboard.PerformanceIndicator[CommonRouteKeys.Base],
    translationKey: "menu.performanceIndicator",
    permission: "performance"
  },
  {
    text: "menu.organizationalStructure",
    icon: <img src={FileSharing} />,
    path: RelativeRoutes.Dashboard.OrganizationalStructure,
    translationKey: "menu.organizationalStructure",
    permission: "organizational_structure"
  },
  {
    text: "menu.companyNews",
    icon: <img src={NewsIcon} />,
    path: RelativeRoutes.Dashboard.CompanyNews[CommonRouteKeys.Base],
    translationKey: "menu.companyNews",
    permission: "company_news"
  },
  // {
  //   text: "menu.rangesCalculator",
  //   icon: <img src={ZoomIcon} />,
  //   path: RelativeRoutes.Dashboard.RangesCalculator,
  //   translationKey: "menu.rangesCalculator"
  // },
  {
    text: "menu.companyDocuments",
    icon: <img src={ArchiveIcon} />,
    path: RelativeRoutes.Dashboard.CompanyDocuments[CommonRouteKeys.Base],
    translationKey: "menu.companyDocuments",
    permission: "files"
  },
  {
    text: "menu.notifications",
    icon: <img src={NotificationIcon} />,
    path: RelativeRoutes.Dashboard.Notifications,
    translationKey: "menu.notifications",
    permission: "notifications"
  },
  {
    text: "menu.systemSettings",
    icon: <img src={SettingsIcon} />,
    path: RelativeRoutes.Dashboard.SystemSettings[CommonRouteKeys.Base],
    translationKey: "menu.systemSettings",
    permission: "settings"
  },
    {
    text: "menu.supportCenter",
    icon: <img src={SupportIcon} />,
    path: RelativeRoutes.Dashboard.supportCenter,
    translationKey: "menu.supportCenter",
    permission: "settings"
  }
];

export const groupedLinks = [
  {
    title: "groups.general",
    links: LinksMenu.slice(0, 2),
    translationKey: "groups.general"
  },
  {
    title: "groups.employees",
    links: LinksMenu.slice(2, 5),
    translationKey: "groups.employees"
  },
  {
    title: "groups.financial",
    links: LinksMenu.slice(5, 9),
    translationKey: "groups.financial"
  },
  {
    title: "groups.management",
    links: LinksMenu.slice(9, 12),
    translationKey: "groups.management"
  },
  {
    title: "groups.performance",
    links: LinksMenu.slice(12, 16),
    translationKey: "groups.performance"
  },
  {
    title: "groups.other",
    links: LinksMenu.slice(16),
    translationKey: "groups.other"
  }
];

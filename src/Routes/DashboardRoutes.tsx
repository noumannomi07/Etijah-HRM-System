import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutDashboard from "@/Dashboard/Layout/LayoutDasboard";
import { RelativeRoutes } from "./routes";
import { Navigate } from "react-router-dom";
import Loading from "@/components/loading";
import { RolesProvider } from "@/contexts";

// Lazy load all components
const HomeDashboard = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.HomeDashboard }))
);
const Orders = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.Orders }))
);
const AllTabsOrders = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AllTabsOrders }))
);
const AddNewRequest = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewRequest }))
);
const AddNewPermissionRequest = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewPermissionRequest,
    }))
);
const AddNewPredecessorRequests = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewPredecessorRequests,
    }))
);
const AddNewLetterRequests = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewLetterRequests,
    }))
);
const AddNewBusinessExpenseRequests = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewBusinessExpenseRequests,
    }))
);
const AddNewAirlineTicketRequests = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewAirlineTicketRequests,
    }))
);
const StaffManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.StaffManagement,
    }))
);
const HomeStaffManagment = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeStaffManagment,
    }))
);
const StepsAddNewEmployee = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.StepsAddNewEmployee,
    }))
);
const StepsAddNewDataEmployee = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.StepsAddNewDataEmployee,
    }))
);
const StaffEmployeeInformation = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.StaffEmployeeInformation,
    }))
);
const AddSalaryConfiguration = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddSalaryConfiguration,
    }))
);
const AddSalaryConfigurationWithId = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddSalaryConfiguration,
    }))
);
const EditAirlineTickets = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.EditAirlineTickets,
    }))
);
const AddMedicalInsurance = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddMedicalInsurance,
    }))
);
const AttendanceDeparture = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AttendanceDeparture,
    }))
);
const AttendanceDepartureEdits = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AttendanceDepartureEdits,
    }))
);
const ShiftSchedule = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.ShiftSchedule }))
);
const HomeShiftSchedule = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeShiftSchedule,
    }))
);
const AddShiftSchedule = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddShiftSchedule,
    }))
);
const SystemSettings = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.SystemSettings }))
);
const HomeSystemSettings = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeSystemSettings,
    }))
);
const AddNewPermissionPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.TabAddNewPermissionPage,
    }))
);
const Employment = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.Employment }))
);
const HomeEmployment = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.HomeEmployment }))
);
const AddNewEmployee = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewEmployee }))
);
const DepartmentsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.DepartmentsPage,
    }))
);
const HomeDepartments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeDepartments,
    }))
);
const AddNewDepartments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewDepartments,
    }))
);
const JobTitlesPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.JobTitlesPage }))
);
const HomeJobTitles = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.HomeJobTitles }))
);
const AddNewJobTitle = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewJobTitle }))
);
const NationalitiesManagementPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.NationalitiesManagementPage,
    }))
);
const HomeNationalitiesManagements = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeNationalitiesManagements,
    }))
);
const AddNewNationalitiesManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewNationalitiesManagement,
    }))
);
const FileCategoryPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.FileCategoryPage,
    }))
);
const HomeFileCategory = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeFileCategory,
    }))
);
const AddNewFileCategory = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewFileCategory,
    }))
);
const CompanyDocuments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.CompanyDocuments,
    }))
);
const HomeCompanyDocuments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeCompanyDocuments,
    }))
);
const AddNewCompanyDocuments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewCompanyDocuments,
    }))
);
const ViolationsManagementPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.ViolationsManagementPage,
    }))
);
const HomeViolationsManagementPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeViolationsManagementPage,
    }))
);
const AddNewViolationsManagementPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewViolationsManagementPage,
    }))
);
const SalaryMarches = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.SalaryMarches }))
);
const HomeSalaryMarches = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeSalaryMarches,
    }))
);
const AddNewSalaryMarches = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewSalaryMarches,
    }))
);
const SalaryAdjustments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.SalaryAdjustments,
    }))
);
const HomeSalaryAdjustments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeSalaryAdjustments,
    }))
);
const AddNewSalaryAdjustments = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewSalaryAdjustments,
    }))
);
const FinancialTransactions = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.FinancialTransactions,
    }))
);
const HomeFinancialTransactions = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeFinancialTransactions,
    }))
);
const ApplicantsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.ApplicantsPage }))
);
const HomeApplicantsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeApplicantsPage,
    }))
);
const AddANewApplicantPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddANewApplicantPage,
    }))
);
const RecruitmentAdsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.RecruitmentAdsPage,
    }))
);
const HomeRecruitmentAdsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeRecruitmentAdsPage,
    }))
);
const AddANewAdPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddANewAdPage }))
);
const PerformanceIndicator = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.PerformanceIndicator,
    }))
);
const HomePerformanceIndicator = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomePerformanceIndicator,
    }))
);
const EvaluativeStandardPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.EvaluativeStandardPage,
    }))
);
const TasksPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.TasksPage }))
);
const HomeTasksPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.HomeTasksPage }))
);
const AddNewTask = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewTask }))
);
const BonusPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.BonusPage }))
);
const HomeBonusPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.HomeBonusPage }))
);
const AddNewBonus = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewBonus }))
);
const ReportsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.ReportsPage }))
);
const NotificationsPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.NotificationsPage,
    }))
);
const SupportCenterPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.SupportCenterPage,
    }))
);
const ProfileUser = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.ProfileUser }))
);
const PackagesProfileUser = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.PackagesProfileUser,
    }))
);
const CalendarPage = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.CalendarPage }))
);
const CompanyNews = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.CompanyNews }))
);
const HomeCompanyNews = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.HomeCompanyNews,
    }))
);
const AddNewNewsCompany = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewNewsCompany,
    }))
);
const InviteEmployees = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.InviteEmployees,
    }))
);
const CandidateFile = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.CandidateFile }))
);
const OrganizationalStructure = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.OrganizationalStructure,
    }))
);
const RangesCalculator = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.RangesCalculator,
    }))
);
const AddNewWorkingTime = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewWorkingTime,
    }))
);
const AddNewManagingReasonsLeaving = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewManagingReasonsLeaving,
    }))
);
const AddNewDocumentManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewDocumentManagement,
    }))
);
const AddNewAllowancesManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewAllowancesManagement,
    }))
);

const AddNewLetterManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewLetterManagement,
    }))
);
const AddNewJobRateManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewJobRateManagement,
    }))
);
const AddNewExpenseManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewExpenseManagement,
    }))
);
const AddNewManageChainApprovals = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewManageChainApprovals,
    }))
);
const AddNewManageAdditions = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewManageAdditions,
    }))
);
const AddNewManageDiscounts = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewManageDiscounts,
    }))
);
const AddNewProjectManagementSettings = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewProjectManagementSettings,
    }))
);
const AddNewViolationsManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewViolationsManagement,
    }))
);
const AddNewManagingEvaluationCriteria = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewManagingEvaluationCriteria,
    }))
);
const AddNewCurrencyManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewCurrencyManagement,
    }))
);
const AddNewBankManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewBankManagement,
    }))
);
const AddNewLeaveManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewLeaveManagement,
    }))
);
const AddNewCountryTicketManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewCountryTicketManagement,
    }))
);
const AddNewWorkplaceManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewWorkplaceManagement,
    }))
);
const AddNewAdvanceManagment = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewAdvanceManagment,
    }))
);
const AddNewContractType = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewContractType,
    }))
);
const AddNewJobType = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.AddNewJobType }))
);
const PasswordForm = React.lazy(() =>
    import("@/Dashboard").then((module) => ({ default: module.PasswordForm }))
);

const AddNewRolesManagement = React.lazy(() =>
    import("@/Dashboard").then((module) => ({
        default: module.AddNewRolesManagement,
    }))
);

const DashboardRoutes = () => {
    return (
        <RolesProvider>
            <Routes>
                <Route path="/" element={<LayoutDashboard />}>
                    <Route
                        index
                        element={
                            <Navigate to={RelativeRoutes.Dashboard.Home} />
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.Home}
                        element={
                            <Suspense fallback={<Loading />}>
                                <HomeDashboard />
                            </Suspense>
                        }
                    />

                    {/* Orders */}
                    <Route
                        path={RelativeRoutes.Dashboard.Orders.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Orders />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Orders.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AllTabsOrders />
                                </Suspense>
                            }
                        />
                        <Route
                            path={RelativeRoutes.Dashboard.Orders.AddNewRequest}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewRequest />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Orders
                                    .AddNewPermissionRequest
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewPermissionRequest />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Orders
                                    .AddNewPredecessorRequests
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewPredecessorRequests />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Orders
                                    .AddNewLetterRequests
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewLetterRequests />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Orders
                                    .AddNewBusinessExpenseRequests
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewBusinessExpenseRequests />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Orders
                                    .AddNewAirlineTicketRequests
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewAirlineTicketRequests />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Staff Management */}
                    <Route
                        path={RelativeRoutes.Dashboard.StaffManagement.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <StaffManagement />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.StaffManagement.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeStaffManagment />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .StepsAddNewEmployee
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <StepsAddNewEmployee />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .StepsAddEmployeeDataWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <StepsAddNewDataEmployee />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .StaffEmployeeInformationWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <StaffEmployeeInformation />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .AddSalaryConfiguration
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddSalaryConfiguration />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .AddSalaryConfigurationWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddSalaryConfiguration />
                                </Suspense>
                            }
                        />

                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .EditAirlineTickets
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <EditAirlineTickets />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.StaffManagement
                                    .AddMedicalInsurance
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddMedicalInsurance />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Attendance */}
                    <Route
                        path={RelativeRoutes.Dashboard.AttendanceDeparture}
                        element={
                            <Suspense fallback={<Loading />}>
                                <AttendanceDeparture />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.AttendanceDepartureEdits}
                        element={
                            <Suspense fallback={<Loading />}>
                                <AttendanceDepartureEdits />
                            </Suspense>
                        }
                    />

                    {/* Shift Schedule */}
                    <Route
                        path={RelativeRoutes.Dashboard.ShiftSchedule.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <ShiftSchedule />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.ShiftSchedule.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeShiftSchedule />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.ShiftSchedule
                                    .AddShiftSchedule
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddShiftSchedule />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.ShiftSchedule
                                    .AddShiftScheduleWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddShiftSchedule />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* System Settings */}
                   
                    <Route
                        path={RelativeRoutes.Dashboard.SystemSettings.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <SystemSettings />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.SystemSettings.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeSystemSettings />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewPermissionPage
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewPermissionPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewWorkingTime
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewWorkingTime />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewManagingReasonsLeaving
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewManagingReasonsLeaving />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewDocumentManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewDocumentManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewAllowancesManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewAllowancesManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewLetterManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewLetterManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewJobRateManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewJobRateManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewExpenseManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewExpenseManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewManageChainApprovals
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewManageChainApprovals />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewProjectManagementSettings
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewProjectManagementSettings />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewViolationsManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewViolationsManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewManagingEvaluationCriteria
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewManagingEvaluationCriteria />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewCurrencyManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewCurrencyManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewBankManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewBankManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewLeaveManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewLeaveManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewCountryTicketManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewCountryTicketManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewWorkplaceManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewWorkplaceManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewAdvanceManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewAdvanceManagment />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewContractType
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewContractType />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewJobType
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewJobType />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewRolesManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewRolesManagement />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewManageAdditions
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewManageAdditions />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SystemSettings
                                    .AddNewManageDiscounts
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewManageDiscounts />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Employment */}
                    <Route
                        path={RelativeRoutes.Dashboard.Employment.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Employment />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Employment.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeEmployment />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Employment
                                    .AddNewEmployee
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewEmployee />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Departments */}
                    <Route
                        path={RelativeRoutes.Dashboard.Departments.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <DepartmentsPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Departments.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeDepartments />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Departments
                                    .AddNewDepartments
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewDepartments />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Job Titles */}
                    <Route
                        path={RelativeRoutes.Dashboard.JobTitle.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <JobTitlesPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.JobTitle.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeJobTitles />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.JobTitle.AddNewJobTitle
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewJobTitle />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Nationalities */}
                    <Route
                        path={
                            RelativeRoutes.Dashboard.NationalitiesManagement
                                .Base
                        }
                        element={
                            <Suspense fallback={<Loading />}>
                                <NationalitiesManagementPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={
                                RelativeRoutes.Dashboard.NationalitiesManagement
                                    .All
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeNationalitiesManagements />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.NationalitiesManagement
                                    .AddNewNationalitiesManagement
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewNationalitiesManagement />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* File Category */}
                    <Route
                        path={RelativeRoutes.Dashboard.FileCategory.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <FileCategoryPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.FileCategory.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeFileCategory />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.FileCategory
                                    .AddNewFileCategory
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewFileCategory />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Company Documents */}
                    <Route
                        path={RelativeRoutes.Dashboard.CompanyDocuments.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <CompanyDocuments />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.CompanyDocuments.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeCompanyDocuments />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.CompanyDocuments
                                    .AddNewCompanyDocuments
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewCompanyDocuments />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Violations Management */}
                    <Route
                        path={
                            RelativeRoutes.Dashboard.ViolationsManagement.Base
                        }
                        element={
                            <Suspense fallback={<Loading />}>
                                <ViolationsManagementPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={
                                RelativeRoutes.Dashboard.ViolationsManagement
                                    .All
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeViolationsManagementPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.ViolationsManagement
                                    .AddNewViolationsManagementPage
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewViolationsManagementPage />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Salary Marches */}
                    <Route
                        path={RelativeRoutes.Dashboard.SalaryMarches.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <SalaryMarches />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.SalaryMarches.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeSalaryMarches />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SalaryMarches
                                    .AddNewSalaryMarches
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewSalaryMarches />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SalaryMarches
                                    .AddNewSalaryMarchesWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewSalaryMarches />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Salary Adjustments */}
                    <Route
                        path={RelativeRoutes.Dashboard.SalaryAdjustments.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <SalaryAdjustments />
                            </Suspense>
                        }
                    >
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SalaryAdjustments.All
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeSalaryAdjustments />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.SalaryAdjustments
                                    .AddNewSalaryAdjustments
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewSalaryAdjustments />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Financial Transactions */}
                    <Route
                        path={
                            RelativeRoutes.Dashboard.FinancialTransactions.Base
                        }
                        element={
                            <Suspense fallback={<Loading />}>
                                <FinancialTransactions />
                            </Suspense>
                        }
                    >
                        <Route
                            path={
                                RelativeRoutes.Dashboard.FinancialTransactions
                                    .All
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeFinancialTransactions />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Applicants */}
                    <Route
                        path={RelativeRoutes.Dashboard.Applicants.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <ApplicantsPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Applicants.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeApplicantsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.Applicants
                                    .AddNewApplicant
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddANewApplicantPage />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Recruitment Ads */}
                    <Route
                        path={RelativeRoutes.Dashboard.RecruitmentAds.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <RecruitmentAdsPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.RecruitmentAds.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeRecruitmentAdsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.RecruitmentAds
                                    .AddNewAdPage
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddANewAdPage />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Performance */}
                    <Route
                        path={
                            RelativeRoutes.Dashboard.PerformanceIndicator.Base
                        }
                        element={
                            <Suspense fallback={<Loading />}>
                                <PerformanceIndicator />
                            </Suspense>
                        }
                    >
                        <Route
                            path={
                                RelativeRoutes.Dashboard.PerformanceIndicator
                                    .All
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomePerformanceIndicator />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.PerformanceIndicator
                                    .EvaluativeStandardPageWithId
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <EvaluativeStandardPage />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Tasks */}
                    <Route
                        path={RelativeRoutes.Dashboard.Tasks.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <TasksPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Tasks.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeTasksPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={RelativeRoutes.Dashboard.Tasks.AddNewTask}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewTask />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Bonus */}
                    <Route
                        path={RelativeRoutes.Dashboard.Bonus.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <BonusPage />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.Bonus.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeBonusPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path={RelativeRoutes.Dashboard.Bonus.AddNewBonus}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewBonus />
                                </Suspense>
                            }
                        />
                    </Route>

                    {/* Single Pages */}
                    <Route
                        path={RelativeRoutes.Dashboard.Reports}
                        element={
                            <Suspense fallback={<Loading />}>
                                <ReportsPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.Notifications}
                        element={
                            <Suspense fallback={<Loading />}>
                                <NotificationsPage />
                            </Suspense>
                        }
                    />
                      <Route
                        path={RelativeRoutes.Dashboard.supportCenter}
                        element={
                            <Suspense fallback={<Loading />}>
                                <SupportCenterPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.ProfileUser}
                        element={
                            <Suspense fallback={<Loading />}>
                                <ProfileUser />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.PackagesProfileUser}
                        element={
                            <Suspense fallback={<Loading />}>
                                <PackagesProfileUser />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.CalendarPage}
                        element={
                            <Suspense fallback={<Loading />}>
                                <CalendarPage />
                            </Suspense>
                        }
                    />

                    {/* Company News */}
                    <Route
                        path={RelativeRoutes.Dashboard.CompanyNews.Base}
                        element={
                            <Suspense fallback={<Loading />}>
                                <CompanyNews />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RelativeRoutes.Dashboard.CompanyNews.All}
                            element={
                                <Suspense fallback={<Loading />}>
                                    <HomeCompanyNews />
                                </Suspense>
                            }
                        />
                        <Route
                            path={
                                RelativeRoutes.Dashboard.CompanyNews
                                    .AddNewNewsCompany
                            }
                            element={
                                <Suspense fallback={<Loading />}>
                                    <AddNewNewsCompany />
                                </Suspense>
                            }
                        />
                    </Route>

                    <Route
                        path={RelativeRoutes.Dashboard.InviteEmployees}
                        element={
                            <Suspense fallback={<Loading />}>
                                <InviteEmployees />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.CandidateFile}
                        element={
                            <Suspense fallback={<Loading />}>
                                <CandidateFile />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.OrganizationalStructure}
                        element={
                            <Suspense fallback={<Loading />}>
                                <OrganizationalStructure />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RelativeRoutes.Dashboard.RangesCalculator}
                        element={
                            <Suspense fallback={<Loading />}>
                                <RangesCalculator />
                            </Suspense>
                        }
                    />

                    <Route
                        path={RelativeRoutes.Dashboard.PasswordForm}
                        element={
                            <Suspense fallback={<Loading />}>
                                <PasswordForm />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </RolesProvider>
    );
};

export default DashboardRoutes;

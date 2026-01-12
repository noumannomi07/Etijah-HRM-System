import { generateFullRoutes } from "./util";

export const CommonRouteKeys = {
    Base: "Base",
    All: "All",
} as const;

export const RelativeRoutes = {
    Website: {
        [CommonRouteKeys.Base]: "",
        About: "about",
        SubmitSubscriptionRequestWeb: "submit-subscription-request",
        AboutApp: "about-app",
        PackagesPage: "packages-page",
        FaqEtijah: "faq-etijah",
        BlogsEtijah: {
            [CommonRouteKeys.All]: "",
            [CommonRouteKeys.Base]: "blogs-etijah",
            SingleBlog: ":idCardSingleBlog",
        },
        ContactUs: "contact-us",
        ServicesPage: "services-page",
        JobApplication: "job/:id/:slug",
        AttendanceDepartureManagementPage:
            "attendance-departure-management-page",
        PayrollBenefitsManagement: "payroll-benefits-management",
        OrderManagementServices: "order-management-services",
        RecruitmentManagementServices: "recruitment-management-services",
        FollowUpPerformance: "follow-up-performance",
        SmartRangeCalculator: "smart-range-calculator",
        PrivacyUsagePolicy: "privacy-usage-policy",
        LoginWeb: "login",
    },

    Dashboard: {
        [CommonRouteKeys.Base]: "dashboard",
        Home: "home-dashboard",
        Orders: {
            [CommonRouteKeys.Base]: "orders",
            [CommonRouteKeys.All]: "",
            AddNewRequest: "add-new-request",
            AddNewRequestWithId: "add-new-request/:id",
            AddNewPermissionRequest: "add-new-permission-request",
            AddNewPermissionRequestWithId: "add-new-permission-request/:id",
            AddNewPredecessorRequests: "add-new-predecessor-requests",
            AddNewPredecessorRequestsWithId: "add-new-predecessor-requests/:id",
            AddNewLetterRequests: "add-new-letter-requests",
            AddNewLetterRequestsWithId: "add-new-letter-requests/:id",
            AddNewBusinessExpenseRequests: "add-new-business-expense-requests",
            AddNewAirlineTicketRequests: "add-new-airline-ticket-requests",
        },
        StaffManagement: {
            [CommonRouteKeys.Base]: "staff-management",
            [CommonRouteKeys.All]: "",
            StepsAddNewEmployee: "steps-add-new-employee",
            StepsAddEmployeeDataWithId: "steps-add-employee-data/:id",
            StaffEmployeeInformation: "staff-employee-information",
            StaffEmployeeInformationWithId: "staff-employee-information/:id",
            AddSalaryConfiguration: "add-salary-configuration",
            AddSalaryConfigurationWithId: "add-salary-configuration/:id",
            EditAirlineTickets: "edit-airline-tickets",
            AddMedicalInsurance: "add-medical-insurance",
        },
        AttendanceDeparture: "attendance-departure",
        AttendanceDepartureEdits: "attendance-departure-edits",
        ShiftSchedule: {
            [CommonRouteKeys.Base]: "shift-schedule",
            [CommonRouteKeys.All]: "",
            AddShiftSchedule: "add-shift-schedule",
            AddShiftScheduleWithId: "add-shift-schedule/:id",
        }, 
        SystemSettings: {
            [CommonRouteKeys.Base]: "home-system-settings",
            [CommonRouteKeys.All]: "",
            AddNewPermissionPage: "tab-add-new-permission-page",
            AddNewWorkingTime: "add-new-working-time",
            AddNewManagingReasonsLeaving: "add-new-managing-reasons-leaving",
            AddNewDocumentManagement: "add-new-document-management",
            AddNewAllowancesManagement: "add-new-allowances-management",
            AddNewLetterManagement: "add-new-letter-management",
            AddNewExpenseManagement: "add-new-expense-management",
            AddNewManageChainApprovals: "add-new-manage-chain-approvals",
            AddNewProjectManagement: "add-new-project-management",
            AddNewProjectManagementSettings:
                "add-new-project-management-settings",
            AddNewManageDiscounts: "add-new-manage-discounts",
            AddNewManageAdditions: "add-new-manage-additions",
            AddNewViolationsManagement: "add-new-violations-management",
            AddNewViolationsManagementWithId:
                "add-new-violations-management/:id",
            AddNewManagingEvaluationCriteria:
                "add-new-managing-evaluation-criteria",
            AddNewCurrencyManagement: "add-new-currency-management",
            AddNewBankManagement: "add-new-bank-management",
            AddNewLeaveManagement: "add-new-leave-management",
            AddNewCountryTicketManagement: "add-new-country-ticket-management",
            AddNewContractType: "add-new-contract-type",
            AddNewJobType: "add-new-job-type",
            AddNewJobRateManagement: "add-new-job-rate-management",

            // AddNewSeasonalVacationManagement:
            //     "add-new-seasonal-vacation-management",

            // new
            AddNewWorkplaceManagement: "add-new-workplace-management",
            AddNewAdvanceManagement: "add-new-advance-management",
            AddNewRolesManagement: "add-new-roles-management",
 
        },
        Employment: {
            [CommonRouteKeys.Base]: "employment-page",
            [CommonRouteKeys.All]: "",
            AddNewEmployee: "add-new-employee",
        },
        Applicants: {
            [CommonRouteKeys.Base]: "applicants-page",
            [CommonRouteKeys.All]: "",
            AddNewApplicant: "add-new-applicant",
            AddNewApplicantWithId: "add-new-applicant/:id",
        },
        Departments: {
            [CommonRouteKeys.Base]: "departments-page",
            [CommonRouteKeys.All]: "",
            AddNewDepartments: "add-new-departments",
            AddNewDepartmentsWithId: "add-new-departments/:id",
        },
        JobTitle: {
            [CommonRouteKeys.Base]: "job-title-page",
            [CommonRouteKeys.All]: "",
            AddNewJobTitle: "add-new-job-title",
            AddNewJobTitleWithId: "add-new-job-title/:id",
        },
        
        NationalitiesManagement: {
            [CommonRouteKeys.Base]: "nationalities-management",
            [CommonRouteKeys.All]: "",
            AddNewNationalitiesManagement: "add-new-nationalities-management",
            AddNewNationalitiesManagementWithId:
                "add-new-nationalities-management/:id",
        },
        FileCategory: {
            [CommonRouteKeys.Base]: "file-category",
            [CommonRouteKeys.All]: "",
            AddNewFileCategory: "add-new-file-category",
            AddNewFileCategoryWithId: "add-new-file-category/:id",
        },
        CompanyDocuments: {
            [CommonRouteKeys.Base]: "company-documents",
            [CommonRouteKeys.All]: "",
            AddNewCompanyDocuments: "add-new-company-documents",
            AddNewCompanyDocumentsWithId: "add-new-company-documents/:id",
        },
        ViolationsManagement: {
            [CommonRouteKeys.Base]: "violations-management-page",
            [CommonRouteKeys.All]: "",
            AddNewViolationsManagementPage:
                "add-new-violations-management-page",
            AddNewViolationsManagementPageWithId:
                "add-new-violations-management-page/:id",
        },
        SalaryMarches: {
            [CommonRouteKeys.Base]: "salary-marches",
            [CommonRouteKeys.All]: "",
            AddNewSalaryMarches: "add-new-salary-marches",
            AddNewSalaryMarchesWithId: "add-new-salary-marches/:id",
        },
        SalaryAdjustments: {
            [CommonRouteKeys.Base]: "salary-adjustments",
            [CommonRouteKeys.All]: "",
            AddNewSalaryAdjustments: "add-new-salary-adjustments",
            AddNewSalaryAdjustmentsWithId: "add-new-salary-adjustments/:id",
        },
        FinancialTransactions: {
            [CommonRouteKeys.Base]: "financial-transactions",
            [CommonRouteKeys.All]: "",
        },
        RecruitmentAds: {
            [CommonRouteKeys.Base]: "recruitment-ads-page",
            [CommonRouteKeys.All]: "",
            AddNewAdPage: "add-new-ad-page",
            AddNewAdPageWithId: "add-new-ad-page/:id",
        },
        PerformanceIndicator: {
            [CommonRouteKeys.Base]: "performance-indicator",
            [CommonRouteKeys.All]: "",
            EvaluativeStandardPageWithId: "evaluative-standard-page/:id",
        },
        Tasks: {
            [CommonRouteKeys.Base]: "tasks-page",
            [CommonRouteKeys.All]: "",
            AddNewTask: "add-new-task",
            AddNewTaskWithId: "add-new-task/:id",
        },
        Bonus: {
            [CommonRouteKeys.Base]: "bonus-page",
            [CommonRouteKeys.All]: "",
            AddNewBonus: "add-new-bonus",
            AddNewBonusWithId: "add-new-bonus/:id",
        },
        ContractType: {
            [CommonRouteKeys.Base]: "contract-type-page",
            [CommonRouteKeys.All]: "",
            AddNewContractType: "add-new-contract-type",
            AddNewContractTypeWithId: "add-new-contract-type/:id",
        },
        Reports: "reports-page",
        Notifications: "notifications",
        supportCenter:"support-center",
        ProfileUser: "profile-user",
        PackagesProfileUser: "packages-profile-user",
        CalendarPage: "calendar-page",
        CompanyNews: {
            [CommonRouteKeys.Base]: "company-news",
            [CommonRouteKeys.All]: "",
            AddNewNewsCompany: "add-new-news-company",
        },
        InviteEmployees: "invite-employees",
        CandidateFile: "candidate-file/:id",
        OrganizationalStructure: "organizational-structure",
        RangesCalculator: "ranges-calculator",
        Charts: "/charts",
        PasswordForm:"change-password"
    },
    NotFound: "*",
} as const;

export const FullRoutes = generateFullRoutes(RelativeRoutes);

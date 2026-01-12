import { useApi } from "@/hooks/useApi";

export const useSalaryadjustment = ({ month, year }) => {
	return useApi(
		"salaryadjustment",
		{
			all: `/salaryadjustment?month=${month}&year=${year}`,
			create: {
				url: "/salaryadjustment",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			update: `/salaryadjustment`,
			delete: `/salaryadjustment`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const usePerformance = () => {
	return useApi(
		"performance",
		{
			all: "/performance",
			get: "/performance",
			create: '/performance',
			update: `/performance`,
			delete: `/performance`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useViolations = () => {
	return useApi(
		"violations",
		{
			all: "/violations",
			get: "/violation/employee",
			create: '/violations',
			update: `/violations`,
			delete: `/violations`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useJobs = () => {
	return useApi(
		"jobs",
		{
			all: "/jobs",
			create: {
				url: "/jobs",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			update: `/jobs`,
			delete: `/jobs`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useApplicants = () => {
	return useApi(
		"job-applicants",
		{
			all: "/job-applicants",
			get: "/job-applicants",
			create: {
				url: "/job-applicants",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			update: `/job-applicants`,
			delete: `/job-applicants`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useFileCategory = () => {
	return useApi(
		"employee-file-category",
		{
			all: "/employee-file-category",
			get: "/employee-file-category",
			create: '/employee-file-category',
			update: `/employee-file-category`,
			delete: `/employee-file-category`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useLetters = () => {
	return useApi(
		"letters",
		{
			all: "/letters",
			get: "/letters",
			create: '/letters',
			update: `/letters`,
			delete: `/letters`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useAdvances = () => {
	return useApi(
		"advances",
		{
			all: "/advances",
			create: {
				url: "/advances",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			get: "/advances",
			update: `/advances`,
			delete: `/advances`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useLeaveRequests = () => {
	return useApi(
		"leaverequests",
		{
			all: "/leaverequests",
			get: "/leaverequests",
			create: {
				url: "/leaverequests",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			update: `/leaverequests`,
			delete: `/leaverequests`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};


export const usePayrollMonths = () => {
	return useApi(
		"payroll-months",
		{
			all: "/payroll-months",
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useOvertimeManagement = () => {
	return useApi(
		"overtime-management",
		{
			all: "/overtime-management",
			create: `/overtime-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
}; 

export const useSupports = () => {
	return useApi(
		"supports",
		{
			all: "/get-supports",
			get: "/get-support",
			create: {
				url: "/add-support",
				config: {
					headers: {
						'Content-Type': 'multipart/form-data',
						Accept: "application/json",
					}
				}
			},
			update: `/supports`,
			delete: `/delete-support`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
import { useApi } from "@/hooks/useApi";

export const useWorkPlace = () => {
	return useApi(
		"workplace",
		{
			all: "/workplace",
			create: "/workplace",
			update: `/workplace`,
			delete: `/workplace`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useWorkTime = () => {
	return useApi(
		"worktime",
		{
			all: "/worktime",
			get: "/worktime",
			create: "/worktime",
			update: `/worktime`,
			delete: `/worktime`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useAdvancemanage = () => {
	return useApi(
		"advancemanage",
		{
			all: "/advancemanage",
			create: "/advancemanage",
			update: `/advancemanage`,
			delete: `/advancemanage`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};


export const useContractType = () => {
	return useApi(
		"contract-type",
		{
			all: "/contract-type",
			create: "/contract-type",
			update: `/contract-type`,
			delete: `/contract-type`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useJobType = () => {
	return useApi(
		"job-type",
		{
			all: "/job-type",
			create: "/job-type",
			update: `/job-type`,
			delete: `/job-type`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};


export const useAllowancesManagement = () => {
	return useApi(
		"allowance-mangments",
		{
			all: "/allowance-mangments",
			create: "/allowance-mangments",
			update: `/allowance-mangments`,
			delete: `/allowance-mangments`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};



export const useLetters = () => {
	return useApi(
		"letter-mangments",
		{
			all: "/letter-mangments",
			create: "/letter-mangments",
			update: `/letter-mangments`,
			delete: `/letter-mangments`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useNationalaties = () => {
	return useApi(
		"nationalities",
		{
			all: "/nationalities",
			create: "/nationalities",
			update: `/nationalities`,
			delete: `/nationalities`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useExpenseManagement = () => {
	return useApi(
		"expense-mangments",
		{
			all: "/expense-mangments",
			create: "/expense-mangments",
			update: `/expense-mangments`,
			delete: `/expense-mangments`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useMileManagement = () => {
	return useApi(
		"mile-management",
		{
			all: "/mile-management",
			update: `/mile-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};


export const useBonusManagement = () => {
	return useApi(
		"bonus-management",
		{
			all: "/bonus-management",
			create: "/bonus-management",
			update: `/bonus-management`,
			delete: `/bonus-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useCutManagement = () => {
	return useApi(
		"cut-management",
		{
			all: "/cut-management",
			create: "/cut-management",
			update: `/cut-management`,
			delete: `/cut-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useStandard = () => {
	return useApi(
		"standard",
		{
			all: "/standard",
			show: "/standard",
			create: "/standard",
			update: `/standard`,
			delete: `/standard`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useLeaveManagement = () => {
	return useApi(
		"leave-management",
		{
			all: "/leave-management",
			show: "/leave-management",
			create: "/leave-management",
			update: `/leave-management`,
			delete: `/leave-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useVacationManagement = () => {
	return useApi(
		"vacation-management",
		{
			all: "/vacation-management",
			show: "/vacation-management",
			create: "/vacation-management",
			update: `/vacation-management`,
			delete: `/vacation-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};
export const useCountryTicketManagement = () => {
	return useApi(
		"country-ticket",
		{
			all: "/country-ticket",
			show: "/country-ticket",
			create: "/country-ticket",
			update: `/country-ticket`,
			delete: `/country-ticket`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};




export const useJobRate = () => {
	return useApi(
		"rate-management",
		{
			all: "/rate-management",
			create: "/rate-management",
			update: `/rate-management`,
			delete: `/rate-management`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};

export const useGeneralSettings = () => {
	return useApi(
		"general-settings",
		{
			all: "/general-setting",
			create: `/general-setting`,
		}
	);
};

export const useRolesManagement = () => {
	return useApi(
		"role",
		{
			all: "/role",
			create: "/role",
			update: `/role`,
			delete: `/role`,
		},
		{
			staleTime: 15 * 60 * 1000,
		}
	);
};






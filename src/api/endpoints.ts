const endpoints = {
  home: "/home",
  attendance: {
    all: "/attendance",
    show: (id: string) => `/attendance/${id}`,
    attend: "/attendance/attend",
    leave: "/attendance/leave",
    update: "/attendance/update"
  },
  orders: {
    approval: {
      all: "/approval",
      create: "/approval",
      show: (id: string) => `/approval/${id}`,
      update: (id: string) => `/approval/${id}`,
      delete: (id: string) => `/approval/${id}`
    },
    requestsCount: "/requests-count",
    letters: {
      all: "/letters",
      create: "/letters",
      show: (id: string) => `/letters/${id}`,
      update: (id: string) => `/letters/${id}`,
      delete: (id: string) => `/letters/${id}`,
      updateStatus: (id: string) => `/letterstatus/${id}`
    },
    expenses: {
      all: "/expenses",
      mine: "/expenses/mine",
      create: "/expenses",
      show: (id: string) => `/expenses/${id}`,
      update: (id: string) => `/expenses/${id}`,
      delete: (id: string) => `/expenses/${id}`
    },
    airlineTickets: {
      all: "/ticketrequests",
      mine: "/ticketrequests/mine",
      show: (id: string) => `/ticketrequests/${id}`,
      update: (id: string) => `/ticketrequests/${id}`,
      create: "/ticketrequests",
      delete: (id: string) => `/ticketrequests/${id}`
    },
    vacations: {
      all: "/vacations",
      show: (id: string) => `/vacations/${id}`,
      update: (id: string) => `/vacations/${id}`,
      create: "/vacations",
      delete: (id: string) => `/vacations/${id}`,
      checkVacation: "/vacationcheck",
      checkEmployeeVacation: "/allvacationcheck",
      updateVacationStatus: "/vacationsstatus"
    },

    advances: {
      all: "/advances",
      mine: "/advances/mine",
      create: "/advances",
      show: (id: string) => `/advances/${id}`,
      update: (id: string) => `/advances/${id}`,
      delete: (id: string) => `/advances/${id}`,
      updateStatus: "/advancestatus"
    },
    comments: {
      create: "/request-comments",
      delete: (id: string) => `/request-comments/${id}`
    }
  },
  Tasks: {
    all: "/tasks",
    show: (id: string) => `/tasks/${id}`,
    update: (id: string) => `/tasks/${id}`,
    create: "/tasks",
    delete: (id: string) => `/tasks/${id}`,
    Comment: (id: string) => `/task-comments/${id}`,
    createComment: "/task-comments"
  },
  employee: {
    all: "/employees",
    create: "/employee",
    manage: {
      assets: {
        create: (id: string) => `/employeeassets/${id}`,
        update: (id: string) => `/employeeassets/${id}`,
        show: (id: string) => `/employeeassets/${id}`,
        delete: (id: string) => `/employeeassets/${id}`
      },
      files: {
        create: (id: string) => `/employeefiles/${id}`,
        update: (id: string, fileId: string) =>
          `/employeefiles/${id}/${fileId}`,
        show: (id: string) => `/employeefiles/${id}`,
        delete: (id: string, fileId: string) => `/employeefiles/${id}/${fileId}`
      },
      information: {
        show: (id: string) => `/employee/${id}`,
        update: (id: string) => `/employee/${id}`,
        delete: (id: string) => `/employee/${id}`,
        change_status: (id: string) => `/employeestatus/${id}`
      },
      work_data: {
        show: (id: string) => `/employee-work-data/${id}`,
        update: (id: string) => `/employee-work-data/${id}`
      },
      insurance: {
        show: (id: string) => `/employeeinsurance/${id}`,
        update: (id: string) => `/employeeinsurance/${id}`
      },
      tickets: {
        show: (id: string) => `/employeeticket/${id}`,
        update: (id: string) => `/employeeticket`
      },
      vancation: {
        all: "/employeevacationtypes",
        show: (id: string) => `/employeevacationtypes/${id}`,
        update: (id: string) => `/employeevacationtypes/${id}`
      },
      salary: {
        show: (id: string) => `/employeesalary/${id}`,
        update: (id: string) => `/employeesalary/${id}`,

        salaryadjustment: (id: string) => `salaryadjustment/${id}`,
        payroll: (id: string) => `payroll/${id}`,
        employeeTransaction: (id: string) => `transaction/${id}`,
        downloadPayslip: (id: string) => `transaction/${id}/download`
      },
      violation: {
        violations: (id: string) => `violation/employee/${id}`
      },
      attendance: {
        show: (id: string) => `/employeeattendance/${id}`
      },
      tasks: {
        show: (id: number) => `/employeetasks/${id}`
      }
    },
    attendance: {
      all: "/attendance",
      show: (id: string) => `/attendance/${id}`,
      attend: "/attendance/attend",
      leave: "/attendance/leave",
      update: "/attendance/update"
    },
    attendance_data: {
      all: "/attendancedata",
      updateStatus: "/attendancedata-status"
    }
  },
  financial: {
    // all: "/financial",
    // create: "/financial",
    violations: {
      all: "/violations",
      create: "/violations",
      update: (id: string) => `/violations/${id}`,
      checkViolationsStatus: "/violation/check",
      delete: (id: string) => `/violations/${id}`
    }
  },
  settings: {
    allowance_mangments: {
      all: "/allowance-mangments",
      show: (id: string) => `/allowance-mangments/${id}`,
      create: "/allowance-mangments",
      update: (id: string) => `/allowance-mangments/${id}`,
      delete: (id: string) => `/allowance-mangments/${id}`
    },
    bank_management: {
      all: "/bank-management",
      show: (id: string) => `/bank-management/${id}`,
      create: "/bank-management",
      update: (id: string) => `/bank-management/${id}`,
      delete: (id: string) => `/bank-management/${id}`
    },
    bonus: {
      all: "/bonus-management",
      show: (id: string) => `/bonus-management/${id}`,
      create: "/bonus-management",
      update: (id: string) => `/bonus-management/${id}`,
      delete: (id: string) => `/bonus-management/${id}`
    },
    cut: {
      all: "/cut-management",
      show: (id: string) => `/cut-management/${id}`,
      create: "/cut-management",
      update: (id: string) => `/cut-management/${id}`,
      delete: (id: string) => `/cut-management/${id}`
    },
    standard: {
      all: "/standard",
      show: (id: string) => `/standard/${id}`,
      create: "/standard",
      update: (id: string) => `/standard/${id}`,
      delete: (id: string) => `/standard/${id}`
    }
  },
  payroll: {
    transactions: {
      all: "/payroll-transaction",
      show: (id: string) => `/payroll-transaction/${id}`,
      create: "/payroll-transaction",
      update: (id: string) => `/payroll-transaction/${id}`,
      delete: (id: string) => `/payroll-transaction/${id}`,
      updateStatus: "/payroll-transaction-status",
      payslip: (id: string) => `/payroll/${id}/payslip`,
      createComment: "/transaction-comment",
      employeeTransaction: (id: string) => `transaction/${id}`,
      approve: (id: string) => `/payroll-transaction/approve/${id}`,
      reject: (id: string) => `/payroll-transaction/reject/${id}`,
      excel: (id: string) => `/transaction-excel/${id}`
    }
  },
  reports: {
    all: "/main-report"
  },

  invitation: {
    all: "/invitation",
    create: "/invitation",
    onEmployee: (id: string) => `/invitation/employee/${id}`
  },
  rewards: {
    all: "/rewards",
    create: "/rewards",
    show: (id: string) => `/rewards/${id}`,
    update: (id: string) => `/rewards/${id}`,
    delete: (id: string) => `/rewards/${id}`
  },
  organizationalStructure: {
    all: "/structure",
    addManager: "/structure/add-manager",
    removeManager: "/structure/remove-manager"
  },
  website: {
    packages: "/website/packages"
  }
} as const;

export default endpoints;

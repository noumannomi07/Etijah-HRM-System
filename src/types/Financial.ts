import { Allowance } from "@/hooks/settings/allowance";
import { Bank } from "@/hooks/settings/bank";

export interface Employee {
    id: number;
    id_number: string;
    jobtitle: {
        id: number;
        title: string;
        status: number;
        employees_count: number;
        created_at: string;
    };
    name: string;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    gender: string;
    phone: string;
    email: string;
    sponsorship: number;
    status: number;
    created_at: string;
    updated_at: string;
    code: string;
}

export interface ViolationRule {
    id: number;
    title: string;
    first_type: "percent" | "days" | null;
    second_type: "percent" | "days" | null;
    third_type: "percent" | "days" | null;
    fourth_type: "percent" | "days" | null;
    fifth_type: "percent" | "days" | null;
    first_value: string | null;
    second_value: string | null;
    third_value: string | null;
    fourth_value: string | null;
    fifth_value: string | null;
}

export interface Violation {
    id: number;
    employee: Employee;
    violation_rule: ViolationRule;
    type: "percent" | "days";
    value: string;
    times: "first" | "second" | "third" | "fourth" | "fifth";
    note: string | null;
    created_at: string;
    updated_at: string;
}

export interface ViolationFormValues {
    employee_id: number | null;
    violation_rule_id: number | null;
    apply_action?: number;
}

export interface EmployeeSalary {
    id: number;
    employee: Employee;
    salary: number;
    salaryextra: {
        id: number;
        allowance: Allowance;
        amount: number;
    }[];
    payment_method: string;
    iban: string;
    account_number: string;
    account_user_name: string;
    bank: Bank;
    extra_total: number;
    net_salary: number;
    created_at: string;
    updated_at: string;
    gosi_employee_percent: number;
    gosi_office_percent: number;
}
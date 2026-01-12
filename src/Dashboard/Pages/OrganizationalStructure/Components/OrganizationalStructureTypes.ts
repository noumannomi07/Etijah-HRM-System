export type Employee = {
    id: number;
    jobtitle: string;
    name: string;
    image: string;
    gender: 'male' | 'female';
    phone: string;
    email: string;
    status: number;
    code: string | null;
    created_at: string;
};

export type Category = {
    id: number;
    title: string;
    manager: Employee | null;
    employees_count: number;
    children: Employee[];
};

export type OrganizationalStructure = {
    ceo: Employee;
    categories: Category[];
};
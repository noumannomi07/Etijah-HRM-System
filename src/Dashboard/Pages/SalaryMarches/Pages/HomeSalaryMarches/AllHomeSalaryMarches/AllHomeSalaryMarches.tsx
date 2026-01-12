import React from "react";
import { useEffect, useState } from "react";
import HeaderCardsSalaryMarches from "./HeaderCardsSalaryMarches/HeaderCardsSalaryMarches";
import TableSalaryMarches from "./TableSalaryMarches/TableSalaryMarches";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/utils/axios";

const AllHomeSalaryMarches = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [salaryData, setSalaryData] = useState<any>({});
    const [payrollData, setPayrollData] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [searchParams] = useSearchParams();
    const start_of_month = searchParams.get("start_of_month");

    function handleFilterData(filterData: any) {
        const queryParams = new URLSearchParams();
        
        // Add basic parameters
        queryParams.append('month', String(new Date(start_of_month || new Date()).getMonth() + 1));
        queryParams.append('year', String(new Date(start_of_month || new Date()).getFullYear()));
        queryParams.append('category_id', filterData.category_id || '');
        queryParams.append('payment_method', filterData.payment_method || '');
        
        // Handle job_type_id array
        if (Array.isArray(filterData.job_type_id)) {
            filterData.job_type_id.forEach((id: any, index: number) => {
                queryParams.append(`job_type_id[${index}]`, String(id));
            });
        }

        // Handle contract_type_id array
        if (Array.isArray(filterData.contract_type_id)) {
            filterData.contract_type_id.forEach((id: any, index: number) => {
                queryParams.append(`contract_type_id[${index}]`, String(id));
            });
        }

        axiosInstance
            .get(`/payroll?${queryParams.toString()}`)
            .then((res) => {
                setSalaryData(res.data || {});
                setPayrollData(res.data?.payroll || []);
            })
            .catch((err) => {
                console.error("Error loading filtered payroll data:", err);
            });
    }

    useEffect(() => {
        if (!start_of_month) return;
        const queryParams = new URLSearchParams();
        queryParams.append('month', String(new Date(start_of_month || new Date()).getMonth() + 1));
        queryParams.append('year', String(new Date(start_of_month || new Date()).getFullYear()));

        axiosInstance
            .get(`/payroll?${queryParams.toString()}`)
            .then((res) => {
                setSalaryData(res.data || {});
                setPayrollData(res.data?.payroll || []);
            })
            .catch((err) => {
                console.error("Error loading payroll data:", err);
            });
    }, [start_of_month, refetch]);

    useEffect(() => {
        setSelectedRows([]);
    }, [refetch]);

    return (
        <div className="all-home-card-marches">
            <div>
                <HeaderCardsSalaryMarches
                    employees_count={salaryData?.employees_count || 0}
                    net_salary={salaryData?.net_salary || 0}
                    total_bonus={salaryData?.total_bonus || 0}
                    total_cut={salaryData?.total_cut || 0}
                    total_salary={salaryData?.total_salary || 0}
                    selectedRows={selectedRows}
                    refetch={refetch}
                    setRefetch={setRefetch}
                />
            </div>
            <div data-aos="fade-up">
                <TableSalaryMarches
                    salaryData={payrollData}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    handleFilterData={handleFilterData}
                    key={String(refetch)}
                />
            </div>
        </div>
    );
};

export default AllHomeSalaryMarches;

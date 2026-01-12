import React from "react";
import TableEvaluativeStandard from "./TableEvaluativeStandard";
import HeaderEvaluatives from "./HeaderEvaluatives";
import { usePerformance } from "@/hooks/api";
import { useParams } from "react-router-dom";
import { Loading } from "@/components";
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";

const AllEvaluativeStandardPage = ({ isEmployeePage = false }) => {
    const { id } = useParams();
    const { queryOne } = usePerformance();

    const { data: dataPerformance = [], isLoading } = queryOne(id ?? "");

    if (isLoading) {
        return <Loading />;
    } 

    // Check if there is valid performance data
    const employeeData = dataPerformance[0]?.employee;
    const evaluativeData = dataPerformance[0]?.evaluative_employees;

    if (!employeeData) {
        return <NotDataFound />;
    }

    return (
        <div
            data-aos="fade-up"
            className={`all-evaluative-standard  mt-7 ${
                !isEmployeePage ? "border-width-content" : ""
            }`}
        >
            {!isEmployeePage && <HeaderEvaluatives employee={employeeData} />}

            <TableEvaluativeStandard
                employeeData={employeeData}
                evaluative_employees={evaluativeData}
                isEmployeePage={isEmployeePage}
            />
            
        </div>
    );
};

export default AllEvaluativeStandardPage;

import DateHeaderSalaryMarches from "./DateHeaderSalaryMarches";
import CardHeaderSalaryMarches from "./CardHeaderSalaryMarches";
import CardTotalNetPay from "./CardTotalNetPay";
import "./HeaderCardsSalaryMarches.css";
const HeaderCardsSalaryMarches = ({
    selectedRows,
    employees_count,
    net_salary,
    total_bonus,
    total_cut,
    total_salary,
    refetch,
    setRefetch
}) => {
    return (
        <div className="header-cards-salary-marches">
            <DateHeaderSalaryMarches refetch={refetch} />
            <div className="main-header-salary-marches grid md:grid-cols-1 lg:grid-cols-6 gap-4 mt-5">
                <div className="md:col-span-6 lg:col-span-4">
                    <CardHeaderSalaryMarches
                        employees_count={employees_count}
                        net_salary={net_salary}
                        total_bonus={total_bonus}
                        total_cut={total_cut}
                    />
                </div>
                <div className="md:col-span-6 lg:col-span-2">
                    <CardTotalNetPay
                        selectedRows={selectedRows}
                        total_salary={total_salary}
                        setRefetch={setRefetch}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderCardsSalaryMarches;

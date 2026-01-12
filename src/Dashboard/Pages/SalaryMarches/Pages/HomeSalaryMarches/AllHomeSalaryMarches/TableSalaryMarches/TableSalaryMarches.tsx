import React, { Dispatch, SetStateAction, useState } from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ActionTableSalaryMarches from "./ActionTableSalaryMarches";
import ModalDetailsSalaryMarches from "./Modals/ModalDetailsSalaryMarches";
import ModalFilterSalaryMarches from "./Modals/ModalFilterSalaryMarches";
import { useNavigate } from "react-router-dom";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { useTranslation } from "react-i18next";

const TableSalaryMarches = ({ salaryData, selectedRows, setSelectedRows, handleFilterData }: 
    { salaryData: any, selectedRows: any, setSelectedRows: any, 
        handleFilterData: Dispatch<SetStateAction<any>>

    }) => {
    const { t } = useTranslation('salaryMarches');
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenModalFilter] = useState(false);

    const buttonOpenModal = (id: number) => {
        setOpenModal(id);
    };
    const OpenModalFilter = () => setOpenModalFilter(!openFilter);

    const handleRowSelection = (selectedIndices: number[]) => {
        // Map the selected indices to the actual row data
        const selectedData = selectedIndices.map((index) => salaryData[index]);
        setSelectedRows(selectedData);
    };


    const theadTrContent = [
        t('table.headers.employee'),
        t('table.headers.basicSalary'),
        t('table.headers.allowances'),
        t('table.headers.insurance'),
        t('table.headers.netBonus'),
        t('table.headers.netDeduction'),
        t('table.headers.totalSalary'),
        t('table.headers.paymentMethod'),
        "",
    ];

    const tbodyContent = salaryData.map((item) => [
        <div className="flex items-center gap-3" key={item.id}>
            <img
                src={item.image}
                className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
                alt="img user"
                loading="lazy"
            />
            {item.name}
            <br />
            {/* {item.sponsorship ? "مكفول" : "غير مكفول"} */}
            {/* {"-"} */}
            {item.jobtitle?.title}
        </div>,
        <div className="flex items-center gap-1 justify-center">
            {item.salary?.salary ? (
                <>
                    {item.salary.salary.toLocaleString()} <Saudiriyal fill="#000" />
                </>
            ) : "—"}
        </div>,
        <div className="flex items-center gap-1">
            {item.salary?.extra_total ? (
                <>
                    {item.salary.extra_total.toLocaleString()} <Saudiriyal fill="#000" />
                </>
            ) : "—"}
        </div>,
        (item.salary?.gosi_employee_percent ? 
            <div>
                {item.salary.gosi_employee_percent.toLocaleString()} %
                <br/>
                {(item.month_salary && item.salary.gosi_employee_percent ? 
                    (item.month_salary * item.salary.gosi_employee_percent / 100).toLocaleString() 
                    : "—")}
            </div>
            : "—"
        ),
        <div className="flex items-center gap-1 justify-center">
            <span className="text-greenColor01 flex items-center">
               +{item.total_bonus?.toLocaleString() ?? 0} 
            
            </span>
            {/* green */}
            <Saudiriyal fill="#32A840" />
        </div>,
        <div className="flex items-center gap-1 justify-center">
            <span className="text-redColor01 flex items-center">
                -{item.total_cut?.toLocaleString() ?? 0} 
                
            </span>
            {/* red */}
            <Saudiriyal fill="#FE4D4F" />
        </div>,
        <div className="flex items-center gap-1 justify-center">
            <span className="text-greenColor01 flex items-center">
               +{item.month_salary?.toLocaleString() ?? 0} 
            
            </span>
            <Saudiriyal />
        </div>,
        item.salary?.payment_method ?? "—",
        <ActionTableSalaryMarches
            key={item.id}
            functionShow={() => buttonOpenModal(item.id)}
            // functionEdit={() => {
            //     navigate(`add-new-salary-marches/${item.id}`);
            // }}
            functionCheckMark={() => {}}
            functionSendTransaction={() => {}}
        />,
    ]);

    return (
        <>
            <ModalFilterSalaryMarches
                open={openFilter}
                hiddenModal={OpenModalFilter}
                handleFilterData={handleFilterData}
            />
            <ModalDetailsSalaryMarches
                openModalDetailsSalaryMarches={openModal}
                hiddenModalDetailsSalaryMarches={() => buttonOpenModal(null)}
                handleButtonDeleteSalaryMarches={() => {}}
                buttonEditPageRouteSalaryMarches=""
            />

            <div className="table-employment-requests border-width-content mt-5">
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={true}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={OpenModalFilter}
                    isTrueButtonsModalContentRight={false}
                    functionButtonModalOne={() => {}}
                    textContentButtonOne=""
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                    onRowSelection={handleRowSelection}
                    showDateFilter={false}
                    onChangeDateFilter={() => {}}
                />
            </div>
        </>
    );
};

export default TableSalaryMarches;

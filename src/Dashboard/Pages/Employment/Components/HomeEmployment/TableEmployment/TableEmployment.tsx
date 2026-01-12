import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useState } from "react";
import { Link } from "react-router-dom";
import FilterTableEmployment from "./FilterTableEmployment";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import theDateObj from "@/Dashboard/DateMonthDays";
import { useTranslation } from "react-i18next";

const TableEmployment = ({ queryAll }) => {
    const { t, i18n } = useTranslation('employment');
    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const theadTrContent = [
        t('table.headers.candidateName'),
        t('table.headers.email'),
        t('table.headers.job'),
        t('table.headers.status'),
        t('table.headers.dateAdded'),
        t('table.headers.actions'),
    ];

    // CONTENT OF ARRAY
    const tbodyContent = queryAll?.data?.applicants?.map((item) => [
        // <div className="flex items-center gap-3" key={item.id}>
        //     <img
        //         src={item.job.image}
        //         className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
        //         alt="img user"
        //         loading="lazy"
        //     />
        //     {item.name}
        // </div>,

        item.name,
        item.email,
        item.job.title,
        <div
            key={item.id}
            className={`${
                item.status === "pending"
                    ? "status-oranged"
                    : item.status === "accepted"
                    ? "status-success"
                    : item.status === "rejected"
                    ? "status-danger"
                    : item.status === "on_hold"
                    ? "status-oranged"
                    : item.status === "hired"
                    ? "status-success"
                    : ""
            }`}
        >
            {t(`table.status.${item.status}`)}
        </div>,
        i18n.language === "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),

        <Link
            to={FullRoutes.Dashboard.CandidateFile({ id: item?.id })}
            key={item.id}
            className="btn-main button-green"
        >
            {t('table.viewButton')}
        </Link>,
    ]);
    if (queryAll.isLoading) {
        return <Loading />;
    }

    return (
        <>
            <FilterTableEmployment open={open} hiddenModal={handleOpen} />

            <div className="table-employment-requests border-width-content mt-5">
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={() => {
                        handleOpen();
                    }}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo={false}
                    functionModalButtonTwo={false}
                    textContetButtonTwo={false}
                />
            </div>
        </>
    );
};

export default TableEmployment;

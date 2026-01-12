import React from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { Link } from "react-router-dom";
import SmallImageUser from "@/Dashboard/Shared/SmallImageUser/SmallImageUser";
import { useState } from "react";
import ModalFilterPredecessorRequests from "@/Dashboard/Pages/Orders/Components/PredecessorRequests/ModalFilterPredecessorRequests";
import { FullRoutes } from "@/Routes/routes";
import { usePerformance } from "@/hooks/api";
import { Loading } from "@/components";
import { getPerformanceIndicatorStatus } from "@/utils/global";
import { useTranslation } from "react-i18next";

const TablePerformanceIndicator = () => {
    const { t } = useTranslation('performance');
    const { queryAll } = usePerformance();

    const theadTrContent = [
        t('table.headers.employee'),
        // t('table.headers.department'),
        // t('table.headers.workOffice'),
        t('table.headers.firstQuarter'),
        t('table.headers.secondQuarter'),
        t('table.headers.thirdQuarter'),
        t('table.headers.fourthQuarter'),
        t('table.headers.actions'),
    ];

    // CONTENT OF ARRAY
    const tbodyContent: (string | JSX.Element)[][] =
        queryAll?.data?.map((item, idx) => [
            <div className="flex items-center gap-3" key={item?.id || idx}>
                <SmallImageUser
                    newClassImage=""
                    imageUser={item.employee?.image}
                    altImage={item.employee?.name}
                />
                <p className="flex flex-col gap-1">
                    <span>{item.employee?.name}</span>
                    <span className="text-sm text-gray-500">
                        {item.employee?.jobtitle?.title}
                    </span>
                </p>
            </div>,

            // item.sectionName,
            // item.placeInfo,
            <div
                className={`${
                    isNaN(item.first_quarter) ? "status-oranged" : ""
                }`}
                key={item.id}
            >
                {getPerformanceIndicatorStatus(item.first_quarter)}
            </div>,
            <div
                className={`${
                    isNaN(item.second_quarter) ? "status-oranged" : ""
                }`}
                key={item.id}
            >
                {getPerformanceIndicatorStatus(item.second_quarter)}
            </div>,
            <div
                className={`${
                    isNaN(item.third_quarter) ? "status-oranged" : ""
                }`}
                key={item.id}
            >
                {getPerformanceIndicatorStatus(item.third_quarter)}
            </div>,
            <div
                className={`${
                    isNaN(item.fourth_quarter) ? "status-oranged" : ""
                }`}
                key={item.id}
            >
                {getPerformanceIndicatorStatus(item.fourth_quarter)}
            </div>,

            <Link
                to={FullRoutes.Dashboard.PerformanceIndicator.EvaluativeStandardPageWithId(
                    { id: item.employee?.id }
                )}
                key={item.id}
                className="btn-main button-green"
            >
                {t('buttons.view')}
            </Link>,
        ]) || [];

    // SHOW MODAL FILTER
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const hideModalFiler = () => setOpenFilter(false);

    if (queryAll.isLoading) {
        return <Loading />;
    }
    return (
        <>
            <ModalFilterPredecessorRequests
                open={openFilter}
                hiddenModal={hideModalFiler}
            />
            <div
                data-aos="fade-up"
                className="table-employment-requests border-width-content mt-5"
            >
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={() => {
                        handleOpenFilter();
                    }}
                />
            </div>
        </>
    );
};

export default TablePerformanceIndicator;

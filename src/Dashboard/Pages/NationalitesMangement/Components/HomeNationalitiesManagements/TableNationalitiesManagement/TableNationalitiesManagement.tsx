import React, { useEffect, useState } from "react";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useNavigate } from "react-router-dom";

import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import ModalNationalitiesManagement from "./ModalFilterNationalitiesManagement";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import theDateObj from "@/Dashboard/DateMonthDays";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import ButtonsActionDepartments from "./ButtonsActionNationalitiesManagement";

const TableNationalitiesManagement = () => {
    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // SHOW MODAL DETAILS WORK
    const [openDetails, setOpenDetails] = useState(false);
    // const handleDetailsOpen = () => setOpenDetails(!openDetails);

    const theadTrContent = ["#", "الجنسية", "عدد الموظفين", "تاريخ الإنشاء",  ""];

    const [nationalityData, setnationalityData] = useState([]);
    const [loading, setLoading] = useState(true);

    const langgg = i18next.language;
    useEffect(() => {
        axiosInstance
            .get("/nationalities")
            .then((res) => {
                setnationalityData(res.data.data); // تحديث البيانات
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false); // إخفاء مؤشر التحميل
            });
    }, []);

    // CONTENT OF ARRAY
    const tbodyContent = nationalityData.map((item) => [
        <div key={item.id}># {item.id}</div>,
        item.title,
        <div key={item.id}>{item.employees_count} موظف</div>,
        langgg == "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        // <ToggleSwitchCheck key={item.id} id={item.id} />,
        <div key={item.id}>
            <ButtonsActionDepartments
                functionShow={() => {
                    // handleDetailsOpen();
                }}
                functionEdit={() => {
                    navigate(`add-new-nationalities-management/${item.id}`);
                }}
                functionDelete={() => {
                    buttonOpenModalDelete();
                }}
            />
        </div>,
    ]);

    //   OPEN MODAL DELETE
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const navigate = useNavigate();
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <ModalDelete
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                onDelete={() => {}}
                titleModal="حذف من النظام نهائيا ؟"
                textModal={
                    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
                }
            />

            <ModalNationalitiesManagement
                open={open}
                hiddenModal={handleOpen}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={"إدارة الجنسيات"}
                    isButtonAll={false}
                    routePageInfo={false}
                    textLink={false}
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={false}
                    functionButtonAddNewOrder={() => {
                        navigate(
                            FullRoutes.Dashboard.NationalitiesManagement
                                .AddNewNationalitiesManagement
                        );
                    }}
                    newButtonWithoutText={false}
                    functionButtonNewButton={false}
                    textButton={false}
                    newComponentsHere={false}
                />
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={() => {
                        handleOpen();
                    }}
                    isTrueButtonsModalContentRight={true}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo={false}
                    functionModalButtonTwo={false}
                    textContetButtonTwo={false}

                    functionButtonModalOne={() => {
                        navigate(FullRoutes.Dashboard.NationalitiesManagement.AddNewNationalitiesManagement);
                    }}
                    textContentButtonOne={"إضافة جنسية جديدة"}
                />
            </div>
        </>
    );
};

export default TableNationalitiesManagement;

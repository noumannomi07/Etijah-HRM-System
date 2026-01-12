import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalManagingReasonsLeaving from "../ModalManagingReasonsLeaving/ModalManagingReasonsLeaving";

import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import axiosInstance from "@/utils/axios";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { hasAnyPermission } from "@/utils/global";

interface LeaveData {
    id: number;
    ar_title: string;
    en_title: string;
    title: string;
    created_at: string;
    exchange_rate?: number;
    symbol?: string;
}

const TableManagingReasonsLeaving = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    
    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // SHOW MODAL DETAILS WORK
    // const [openDetails, setOpenDetails] = useState(false);
    // const handleDetailsOpen = () => setOpenDetails(!openDetails);

    const theadTrContent = [
        t("managingReasonsLeaving.tableHeaders.number"),
        t("managingReasonsLeaving.tableHeaders.reason"),
        t("managingReasonsLeaving.tableHeaders.createdAt"),
        t("managingReasonsLeaving.tableHeaders.status"),
        ...(hasAnyPermission(permissions) ? [t("managingReasonsLeaving.tableHeaders.actions")] : []),
    ];

    // تهيئة البيانات كمصفوفة
    const [leaveData, setleaveData] = useState<LeaveData[]>([]);
    const [loading, setloading] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditleave, setopenEditleave] = useState(false);
    const [refetch, setrefetch] = useState(0);
    const [EditleaveData, setEditleaveData] = useState<LeaveData>({} as LeaveData);

    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const refetchFunc = () => {
        setrefetch(Math.floor(Math.random() * 100000000));
    };

    const deleteItmeleave = (id: number) => {
        axiosInstance.delete(`leave-management/${id}`).then(() => {
            refetchFunc();
        });
    };

    // init values
    const initialValues = {
        ar: {
            title: EditleaveData.ar_title, // Arabic title
        },
        en: {
            title: EditleaveData.en_title, // English title
        },
        exchange_rate: EditleaveData.exchange_rate, // Exchange rate
        symbol: EditleaveData.symbol,
    };

    const handleSubmit = (values: any, { setTouched, resetForm }: any) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
            exchange_rate: true,
            symbol: true,
        });

        // Perform API call
        axiosInstance
            .put(`leave-management/${EditleaveData.id}`, values)
            .then(() => {
                toast.success(t("managingReasonsLeaving.toast.updateSuccess"));
                setopenEditleave(false); // Update state or perform other necessary actions
                resetForm(); // Reset form after successful submission if needed
                refetchFunc();
            })
            .catch((error) => {
                console.error("Error updating leave:", error);
                toast.error(t("managingReasonsLeaving.toast.updateError"));
            });
    };

    const langgg = i18next.language;

    const navigate = useNavigate();
    const cancelAdd = () => {
        toast.success(t("managingReasonsLeaving.toast.cancelSuccess"));
        setopenEditleave(false);
    };

    useEffect(() => {
        axiosInstance
            .get("/leave-management", {
                headers: {
                    "Accept-Language": langgg, // Replace "en" with your desired language code
                },
            })
            .then((res) => {
                setleaveData(res.data.data); // تحديث البيانات
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setloading(false); // إخفاء مؤشر التحميل
            });
    }, [refetch]);

    // إذا كانت البيانات قيد التحميل
    if (loading) {
        return <Loading />;
    }

    // CONTENT OF ARRAY
    const tbodyContent = leaveData?.map((item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        item.ar_title,
        langgg == "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        <ToggleSwitchCheck key={`switch-${item.id}`} id={item.id.toString()} />,
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={`actions-${item.id}`}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction={true}
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
                          functionShow={() => {}}
                          showLinkCopy={false}
                          functionLinkCopy={() => {}}
                          functionEdit={() => {
                              setopenEditleave(true);
                              setEditleaveData(item);
                          }}
                          functionDelete={() => {
                              buttonOpenModalDelete();
                              setEditleaveData(item);
                          }}
                      />
                  </div>,
              ]
            : []),
    ]);

    //   OPEN MODAL DELETE

    return (
        <>
            <ModalDelete
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                titleModal={t("common.DeleteTitle")}
                textModal={t("common.DeleteText")}
                onDelete={() => {
                    deleteItmeleave(EditleaveData.id);
                }}
            />

            <ModalManagingReasonsLeaving
                modalOpen={open}
                hideModal={handleOpen}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("managingReasonsLeaving.title")}
                    isButtonAll={false}
                    routePageInfo=""
                    textLink=""
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewManagingReasonsLeaving
                        )
                    }
                    newButtonWithoutText={false}
                    functionButtonNewButton={() => {}}
                    textButton=""
                    newComponentsHere=""
                />
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={false}
                    functionButtonModalOne={() => {}}
                    textContentButtonOne=""
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                    showDateFilter={false}
                    onChangeDateFilter={() => {}}
                    showButtonImportExcel={false}
                />
            </div>
            <CustomModal
                isOpen={openEditleave}
                titleModal={`${t("managingReasonsLeaving.editModal.title")} '${EditleaveData.title}'`}
                handleOpen={() => {
                    setopenEditleave(false);
                }}
            >
                <h1>{EditleaveData.title}</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid grid-cards-2">
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("managingReasonsLeaving.form.reasonNameArabic")}
                                        name={"ar.title"}
                                        type={"text"}
                                        placeholder={t("managingReasonsLeaving.form.reasonNameArabic")}
                                        success
                                        error={
                                            touched.ar?.title &&
                                            errors.ar?.title
                                        }
                                    />
                                </div>
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("managingReasonsLeaving.form.reasonNameEnglish")}
                                        name={"en.title"}
                                        type={"text"}
                                        placeholder={t("managingReasonsLeaving.form.reasonNameEnglish")}
                                        success
                                        error={
                                            touched.en?.title &&
                                            errors.en?.title
                                        }
                                    />
                                </div>
                            </div>

                            <ButtonsFormSendCancel
                                cancelAdd={cancelAdd}
                                submitButton={() => handleSubmit()}
                            />
                        </Form>
                    )}
                </Formik>
            </CustomModal>
        </>
    );
};

export default TableManagingReasonsLeaving;

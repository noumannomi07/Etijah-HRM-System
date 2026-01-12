import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCurrencyManagement from "../ModalCurrencyManagement/ModalCurrencyManagement";
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

const TableCurrencyManagement = () => {
    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // SHOW MODAL DETAILS WORK
    // const [openDetails, setOpenDetails] = useState(false);
    // const handleDetailsOpen = () => setOpenDetails(!openDetails);

    const theadTrContent = [
        "الرقم",
        "إسم العملة",
        "تاريخ الإنشاء",
        "الحالة",
        "",
    ];

    // تهيئة البيانات كمصفوفة
    const [currencyData, setcurrencyData] = useState([]);
    const [loading, setloading] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditCurrency, setopenEditCurrency] = useState(false);
    const [refetch, setrefetch] = useState(false);
    const [EditCurrencyData, setEditCurrencyData] = useState({});

    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const refetchFunc = () => {
        setrefetch(Math.random() * 100000000);
    };

    const deleteItmeCurrency = (id) => {
        axiosInstance
            .delete(`currency-management/${id}`, {
                headers: {
                    "Accept-Language": i18next.language,
                },
            })
            .then((res) => {
                refetchFunc();
            });
    };

    // init values
    const initialValues = {
        ar: {
            title: EditCurrencyData.ar_title, // Arabic title
        },
        en: {
            title: EditCurrencyData.en_title, // English title
        },
        exchange_rate: EditCurrencyData.exchange_rate, // Exchange rate
        symbol: EditCurrencyData.symbol,
    };

    const handleSubmit = (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
            exchange_rate: true,
            symbol: true,
        });

        // Perform API call
        axiosInstance
            .put(`currency-management/${EditCurrencyData.id}`, values, {
                headers: {
                    "Accept-Language": i18next.language,
                },
            })
            .then((res) => {
                toast.success("تم تعديل العملة بنجاح"); // Success message in Arabic
                setopenEditCurrency(false); // Update state or perform other necessary actions
                resetForm(); // Reset form after successful submission if needed
                refetchFunc();
            })
            .catch((error) => {
                console.error("Error updating currency:", error);
                toast.error("حدث خطأ أثناء تعديل العملة"); // Error message in Arabic
            });
    };

    const langgg = i18next.language;

    const navigate = useNavigate();
    const cancelAdd = () => {
        toast.success("تم الالغاء بنجاح.");
        setopenEditCurrency(false);
    };

    useEffect(() => {
        axiosInstance
            .get("/currency-management", {
                headers: {
                    "Accept-Language": langgg, // Replace "en" with your desired language code
                },
            })
            .then((res) => {
                setcurrencyData(res.data.data); // تحديث البيانات
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
    const tbodyContent = currencyData?.map((item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        item.ar_title,
        langgg == "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        <ToggleSwitchCheck key={`switch-${item.id}`} id={item.id} />,
        <div key={`actions-${item.id}`}>
            <ButtonsActionShowEditDelete
                hideShowFunction={true}
                functionEdit={() => {
                    setopenEditCurrency(true);
                    setEditCurrencyData(item);
                }}
                functionDelete={() => {
                    buttonOpenModalDelete();
                    setEditCurrencyData(item);
                }}
            />
        </div>,
    ]);

    //   OPEN MODAL DELETE

    return (
        <>
            <ModalDelete
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                titleModal="حذف من النظام نهائيا ؟"
                textModal="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
                onDelete={() => {
                    deleteItmeCurrency(EditCurrencyData.id);
                }}
            />

            <ModalCurrencyManagement modalOpen={open} hideModal={handleOpen} />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={"إدارة العملات"}
                    isButtonAll={false}
                    routePageInfo={false}
                    textLink={false}
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={true}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewCurrencyManagement
                        )
                    }
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
                    isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={false}
                    functionButtonModalOne={false}
                    textContentButtonOne={false}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo={false}
                    functionModalButtonTwo={false}
                    textContetButtonTwo={false}
                />
            </div>
            <CustomModal
                isOpen={openEditCurrency}
                titleModal={`التعديل علي عملة الـ '${EditCurrencyData.title}'`}
                handleOpen={() => {
                    setopenEditCurrency(false);
                }}
            >
                <h1>{EditCurrencyData.title}</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid grid-cards-2">
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={"إسم العملة باللغة العربية"}
                                        name={"ar.title"}
                                        type={"text"}
                                        placeholder={
                                            "إسم العملة باللغة العربية"
                                        }
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
                                        label={"إسم العملة باللغة الإنجليزية"}
                                        name={"en.title"}
                                        type={"text"}
                                        placeholder={
                                            "إسم العملة باللغة الإنجليزية"
                                        }
                                        success
                                        error={
                                            touched.en?.title &&
                                            errors.en?.title
                                        }
                                    />
                                </div>
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={
                                            "سعر الريال بالنسبة للعملة الأجنبية"
                                        }
                                        name={"exchange_rate"}
                                        type={"number"}
                                        placeholder={
                                            "سعر الريال بالنسبة للعملة الأجنبية"
                                        }
                                        success
                                        error={
                                            touched.exchange_rate &&
                                            errors.exchange_rate
                                        }
                                    />
                                </div>
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={"رمز العملة (إختياري)"}
                                        name={"symbol"}
                                        type={"text"}
                                        placeholder={"رمز العملة"}
                                        success
                                        error={touched.symbol && errors.symbol}
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

export default TableCurrencyManagement;

import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import ModalDocumentManagement from "../ModalDiscourseManagement/ModalDiscourseManagement";
import OrderIconText from "@/assets/images/sidebaricons/ordericontext.svg";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";

const TableDocumentManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    
    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // SHOW MODAL DETAILS WORK
    // const [openDetails, setOpenDetails] = useState(false);
    // const handleDetailsOpen = () => setOpenDetails(!openDetails);

    const theadTrContent = [
        t("documentManagement.tableHeaders.id"),
        t("documentManagement.tableHeaders.document"),
        t("documentManagement.tableHeaders.creationDate"),
        t("documentManagement.tableHeaders.documentCount"),
        t("documentManagement.tableHeaders.status"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    // تهيئة البيانات كمصفوفة
    const [letterData, setletterData] = useState([]);
    const [loading, setloading] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditletter, setopenEditletter] = useState(false);
    const [refetch, setrefetch] = useState(false);
    const [EditletterData, setEditletterData] = useState({});

    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const refetchFunc = () => {
        setrefetch(Math.random() * 100000000);
    };

    const deleteItmeletter = (id) => {
        axiosInstance
            .delete(`filecategory/${id}`, {
                headers: {
                    "Accept-Language": langgg, // Replace "en" with your desired language code
                },
            })
            .then((res) => {
                refetchFunc();
            });
    };

    // init values
    const initialValues = {
        ar: {
            title: EditletterData.ar_title, // Arabic title
        },
        en: {
            title: EditletterData.en_title, // English title
        },
    };

    const handleSubmit = (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
        });

        // Perform API call
        axiosInstance
            .put(`filecategory/${EditletterData.id}`, values, {
                headers: {
                    "Accept-Language": langgg, // Replace "en" with your desired language code
                },
            })
            .then((res) => {
                toast.success(t("documentManagement.messages.updateSuccess")); // Success message
                setopenEditletter(false); // Update state or perform other necessary actions
                resetForm(); // Reset form after successful submission if needed
                refetchFunc();
            })
            .catch((error) => {
                console.error("Error updating letter:", error);
                toast.error(t("documentManagement.messages.updateError")); // Error message
            });
    };

    const langgg = i18next.language;

    const navigate = useNavigate();
    const cancelAdd = () => {
        toast.success(t("documentManagement.messages.cancelSuccess"));
        setopenEditletter(false);
    };

    useEffect(() => {
        axiosInstance
            .get("/filecategory", {
                headers: {
                    "Accept-Language": langgg, // Replace "en" with your desired language code
                },
            })
            .then((res) => {
                setletterData(res.data.data); // تحديث البيانات
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
    const tbodyContent = letterData?.map((item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        langgg === "ar" ? item.ar_title : item.en_title,
        langgg === "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        <div
            key={`count-${item.id}`}
            className="flex items-center gap-2 justify-center"
        >
            <img src={OrderIconText} />
            {item.files_count}
        </div>,
        <ToggleSwitchCheck key={`switch-${item.id}`} id={item.id} />,
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={`actions-${item.id}`}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction={true}
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
                          functionEdit={() => {
                              setopenEditletter(true);
                              setEditletterData(item);
                          }}
                          functionDelete={() => {
                              buttonOpenModalDelete();
                              setEditletterData(item);
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
                titleModal={t("documentManagement.deleteModal.title")}
                textModal={t("documentManagement.deleteModal.text")}
                onDelete={() => {
                    deleteItmeletter(EditletterData.id);
                }}
            />

            <ModalDocumentManagement modalOpen={open} hideModal={handleOpen} />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("documentManagement.title")}
                    isButtonAll={false}
                    routePageInfo={false}
                    textLink={false}
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewDocumentManagement
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
                isOpen={openEditletter}
                titleModal={`${t("documentManagement.editModal.title")}'${langgg === "ar" ? EditletterData.ar_title : EditletterData.en_title}'`}
                handleOpen={() => {
                    setopenEditletter(false);
                }}
            >
                <h1>{langgg === "ar" ? EditletterData.ar_title : EditletterData.en_title}</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid grid-cards-2">
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("documentManagement.form.documentNameArabic")}
                                        name={"ar.title"}
                                        type={"text"}
                                        placeholder={t("documentManagement.form.documentNameArabicPlaceholder")}
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
                                        label={t("documentManagement.form.documentNameEnglish")}
                                        name={"en.title"}
                                        type={"text"}
                                        placeholder={t("documentManagement.form.documentNameEnglishPlaceholder")}
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

export default TableDocumentManagement;

import React from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useEffect, useState } from "react";
import ModalFilterDepartments from "./ModalFilterJobTitles";
import { useNavigate } from "react-router-dom";
import ModalDeleteEmployeeSystemPermanently from "@/Dashboard/Shared/ModalDeleteEmployeeSystemPermanently/ModalDeleteEmployeeSystemPermanently";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import i18next from "i18next";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { Form, Formik } from "formik";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import ButtonsActionJobTitles from "./ButtonsActionJobTitles";
import theDateObj from "@/Dashboard/DateMonthDays";
const TableDepartments = () => {
    const navigate = useNavigate();
    const langgg = i18next.language;

    // SHOW MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const theadTrContent = [
        "#","الاسم", "عدد الموظفين", "تاريخ الإنشاء", "الإجراءات"];

    // بيانات الأقسام
    const [DepartmentsData, setDepartmentsData] = useState([]);
    const [loading, setloading] = useState(true);

    // الحذف والتعديل
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditDepartments, setopenEditDepartments] = useState(false);
    const [refetch, setrefetch] = useState(false);
    const [EditDepartmentsData, setEditDepartmentsData] = useState({});

    // فتح وغلق مودال الحذف
    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    // إعادة تحميل البيانات بعد التعديل أو الحذف
    const refetchFunc = () => {
        setrefetch(Math.random() * 100000000);
    };

    // حذف القسم
    const deleteItmeDepartments = (id) => {
        axiosInstance
            .delete(`/job-title/${id}`, {
                headers: { "Accept-Language": langgg },
            })
            .then(() => {
                refetchFunc();
            });
    };

    // قيم النموذج عند تعديل القسم
    const initialValues = {
        ar: { title: EditDepartmentsData.title },
        en: { title: EditDepartmentsData.title },
    };

    // عند إرسال نموذج التعديل
    const handleSubmit = (values, { setTouched, resetForm }) => {
        setTouched({ "ar.title": true, "en.title": true });
        axiosInstance
            .put(`/job-title/${EditDepartmentsData.id}`, values, {
                headers: { "Accept-Language": langgg },
            })
            .then(() => {
                toast.success("تم تعديل القسم بنجاح");
                setopenEditDepartments(false);
                resetForm();
                refetchFunc();
            })
            .catch((error) => {
                console.error("Error updating Departments:", error);
                toast.error("حدث خطأ أثناء تعديل القسم");
            });
    };

    // إلغاء التعديل
    const cancelAdd = () => {
        toast.success("تم الالغاء بنجاح.");
        setopenEditDepartments(false);
    };

    // جلب الأقسام عند التحميل الأول أو عند التحديث
    useEffect(() => {
        axiosInstance
            .get("/job-title", {
                headers: { "Accept-Language": langgg },
            })
            .then((res) => {
                setDepartmentsData(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setloading(false);
            });
    }, [refetch]);

    // أثناء التحميل

    if (loading) {
        return <Loading />;
    }

    // البيانات المعروضة داخل الجدول
    const tbodyContent = DepartmentsData.map((item) => [
        item.id,
        item.title,
        <div key={item.id}>{item.employees_count} موظف</div>,
        <div key={item.created_at}>
            {langgg == "ar" 
                ? theDateObj.formatDataFunctionAR(item.created_at)
                : theDateObj.formatDataFunctionEN(item.created_at)}
        </div>,

        <div key={item.id}>
            <ButtonsActionJobTitles
                functionEdit={() => {
                    setopenEditDepartments(true);
                    setEditDepartmentsData(item);
                }}
                functionDelete={() => {
                    buttonOpenModalDelete();
                    setEditDepartmentsData(item);
                }}
            />
        </div>,
    ]);

    return (
        <>
            {/* فلتر الأقسام */}
            <ModalFilterDepartments open={open} hiddenModal={handleOpen} />

            {/* مودال الحذف */}
            <ModalDeleteEmployeeSystemPermanently
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                titleModal="حذف من النظام نهائيا ؟"
                textModal="لا يمكن الرجوع لهذا القسم بعد الحذف"
                onDelete={() => deleteItmeDepartments(EditDepartmentsData.id)}
            />

            {/* جدول الأقسام */}
            <div className="table-employment-requests border-width-content">
                <DataTableTwo
                    theadContent={theadTrContent}
                    allDataTable={DepartmentsData}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false} 
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={true}
                    functionButtonModalOne={() => {
                        navigate(FullRoutes.Dashboard.JobTitle.AddNewJobTitle);
                    }}
                    textContentButtonOne={"إضافة مسمي وظيفي جديد"}
                    isTrueButtonTwoModalContent={false}
                />
            </div>

            {/* مودال تعديل القسم */}
            <CustomModal
                isOpen={openEditDepartments}
                titleModal={`التعديل علي قسم الـ '${EditDepartmentsData.title}'`}
                handleOpen={() => setopenEditDepartments(false)}
            >
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid grid-cards-2">
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={"إسم القسم باللغة العربية"}
                                        name={"ar.title"}
                                        type={"text"}
                                        placeholder={"إسم القسم باللغة العربية"}
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
                                        label={"إسم القسم باللغة الإنجليزية"}
                                        name={"en.title"}
                                        type={"text"}
                                        placeholder={
                                            "إسم القسم باللغة الإنجليزية"
                                        }
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

export default TableDepartments;

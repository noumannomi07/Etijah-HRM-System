import React, { useCallback } from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useState } from "react";
import ButtonsActionFileCategory from "./ButtonsActionFileCategory";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import i18next from "i18next";

import { Loading } from "@/components";
import theDateObj from "@/Dashboard/DateMonthDays";
import { useFileCategory } from "@/hooks/api";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { FullRoutes } from "@/Routes/routes";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormComponent from "../../Components/form";

const TABLE_HEADERS = [
    "#",
    "الاسم بالعربية",
    "الاسم بالانجليزية",
    "هل مطلوب",
    "اشعار الموظفين",
    "اشعار كل شهر",
    "تاريخ الإنشاء",
    "",
];
const TableFileCategory = () => {
    const navigate = useNavigate();
    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useFileCategory();

    const langgg = i18next.language;

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
    });

    const [selectedItem, setSelectedItem] = useState<any>(null);

    const toggleModal = useCallback((modalName) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(
        async (id: string) => {
            try {
                await deleteItem(id);
                toast.success("تم الحذف بنجاح");
                toggleModal("delete");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "حدث خطأ أثناء الحذف"
                );
            }
        },
        [deleteItem, toggleModal]
    );

    const handleUpdate = useCallback(
        async (values: any) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success("تم تعديل وقت العمل بنجاح");
                toggleModal("edit");
            } catch (error) {
                toast.error("حدث خطأ أثناء التعديل");
            }
        },
        [selectedItem, toggleModal, updateItem]
    );

    // إذا كانت البيانات قيد التحميل

    // CONTENT OF ARRAY
    const tbodyContent = queryAll?.data?.map((item) => [
        item.id,
        item.ar_title,
        item.en_title,
        <div>{item.is_required ? "مطلوب" : "غير مطلوب"}</div>,
        <div>{item.end_notify ? "اشعار" : "لا"}</div>,
        <div>{item.notify_months} شهر</div>,

        <div key={item.created_at}>
            {langgg == "ar"
                ? theDateObj.formatDataFunctionAR(item.created_at)
                : theDateObj.formatDataFunctionEN(item.created_at)}
        </div>,

        <div key={item.id}>
            <ButtonsActionFileCategory
                functionEdit={() => {
                    toggleModal("edit");
                    setSelectedItem(item);
                }}
                functionDelete={() => {
                    toggleModal("delete");
                    setSelectedItem(item);
                }}
            />
        </div>,
    ]);

    if (queryAll?.isLoading) {
        return <Loading />;
    }
    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                titleModal="حذف من النظام نهائيا ؟"
                textModal="هل أنت متأكد من رغبتك في حذف اقسام الملفات هذا؟ لن تتمكن من استرجاعه لاحقاً."
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="table-employment-requests border-width-content">
                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    textContentButtonOne="إضافة نوع مستند جديد"
                    functionButtonModalOne={() => {
                        navigate(
                            FullRoutes.Dashboard.FileCategory.AddNewFileCategory
                        );
                    }}
                    isTrueButtonsModalContentRight={true}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`التعديل علي اصناف الملفات الـ ${selectedItem?.ar_title}`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        ar: {
                            title: selectedItem?.ar_title,
                        },
                        en: {
                            title: selectedItem?.en_title,
                        },

                        is_required: {
                            label: selectedItem?.is_required ? "نعم" : "لا",
                            value: selectedItem?.is_required,
                        },
                        end_notify: {
                            label: selectedItem?.end_notify ? "نعم" : "لا",
                            value: selectedItem?.end_notify,
                        },
                        notify_months: selectedItem?.notify_months,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default TableFileCategory;

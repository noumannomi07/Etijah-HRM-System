import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import theDateObj from "@/Dashboard/DateMonthDays";
import { toast } from "react-toastify";
import i18next from "i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { useWorkTime } from "@/hooks/api/system-settings";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import FormComponent from "./Components/form";
import Details from "./Components/details";

const TABLE_HEADERS = [
    "الرقم",
    "الاسم بالعربية",
    "الاسم بالانجليزية",
    "تاريخ الإنشاء",
    "وقت العمل",
    "",
];

const daysOfWeekKSA = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
];

const WorkingTimeManagement = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const navigate = useNavigate();

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useWorkTime();

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        show: false,
    });

    const toggleModal = useCallback((modalName: string) => {
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

    const lang = i18next.language;

    const renderTableRow = (item: any) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{item?.ar?.title || item?.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item?.en?.title || item?.en_title}</span>
        </div>,
        lang === "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        item.period === "night" ? "مسائي" : "صباحي",
        <div key={`actions-${item.id}`}>
            <ButtonsActionShowEditDelete
                hideShowFunction={false}
                functionShow={() => {
                    setSelectedItem(item);
                    toggleModal("show");
                }}
                functionEdit={() => {
                    setSelectedItem(item);
                    toggleModal("edit");
                }}
                functionDelete={() => {
                    setSelectedItem(item);
                    toggleModal("delete");
                }}
            />
        </div>,
    ];

    if (queryAll.isLoading) return <Loading />;

    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                titleModal="حذف من النظام نهائيا ؟"
                textModal="هل أنت متأكد من رغبتك في حذف وقت العمل هذا؟ لن تتمكن من استرجاعه لاحقاً."
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <CustomModal
                isOpen={modalState.show}
                titleModal={`عرض تفاصيل وقت العمل - ${
                    selectedItem?.ar?.title || selectedItem?.ar_title
                }`}
                handleOpen={() => toggleModal("show")}
            >
                <Details
                    selectedItem={selectedItem}
                    daysOfWeekKSA={daysOfWeekKSA}
                />
            </CustomModal>

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader="أوقات العمل"
                    isButtonSystemSettings
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewWorkingTime
                        )
                    }
                />

                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={queryAll.data?.map(renderTableRow) ?? []}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`تعديل وقت العمل - ${
                    selectedItem?.ar?.title || selectedItem?.ar_title
                }`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={
                        selectedItem
                            ? {
                                  shiftNameAr:
                                      selectedItem.ar?.title ||
                                      selectedItem.ar_title,
                                  shiftNameEn:
                                      selectedItem.en?.title ||
                                      selectedItem.en_title,
                                  time_from: selectedItem.time_from,
                                  time_to: selectedItem.time_to,
                                  period:
                                      selectedItem.period === "night"
                                          ? { value: "night", label: "مسائي" }
                                          : { value: "day", label: "صباحي" },
                                  vacationDays:
                                      selectedItem.vacation_days?.map(
                                          (day: string) => ({
                                              value: day,
                                              label: daysOfWeekKSA[+day],
                                          })
                                      ) || [],
                                  flexible:
                                      selectedItem.flexible === 1
                                          ? { value: 1, label: "نعم" }
                                          : { value: 0, label: "لا" },
                                  flexible_time: selectedItem.flexible_time,
                                  break: selectedItem.break,
                                  absent_after: selectedItem.absent_after,
                              }
                            : null
                    }
                />
            </CustomModal>
        </>
    );
};

export default React.memo(WorkingTimeManagement);

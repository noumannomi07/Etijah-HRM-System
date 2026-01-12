import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import i18next from "i18next";
import { FormikHelpers } from "formik";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";

import FormComponent from "./Components/form";
import theDateObj from "@/Dashboard/DateMonthDays";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useVacationManagement } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const LeaveManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const currentLanguage = i18next.language;
    const TABLE_HEADERS = [
        t("leaveManagement.name_ar"),
        t("leaveManagement.name_en"),
        t("leaveManagement.days"),
        t("leaveManagement.available_after"),
        t("leaveManagement.paid"),
        t("leaveManagement.creation_date"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useVacationManagement();

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success(t("lettersManagement.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("lettersManagement.deleteError"));
        }
    }, []);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                const payload = {
                    ...values,
                    paid: values.paid || 0,
                    paid_percent: +values?.paid_percent || 1,
                };
                await updateItem({ id: selectedItem?.id, ...payload });
                toast.success(t("leaveManagement.leave_updated_successfully"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("lettersManagement.updateError"));
            }
        },
        [selectedItem]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        // <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{item.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item.en_title}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.days}</span>
        </div>,
        <div
            key={`can_take_after-${item.id}`}
            className="flex justify-center flex-col"
        >
            <span>{item.can_take_after}</span>
        </div>,
        <div
            key={`paid-${item.id}`}
            className={`flex justify-center flex-col ${
                item.paid == 1 ? "text-green-500" : "text-red-500"
            }`}
        >
            <span>
                {item.paid == 1
                    ? t("leaveManagement.paid")
                    : t("leaveManagement.unpaid")}
            </span>
        </div>,
        <div
            key={`days_type-${item.id}`}
            className="flex justify-center flex-col"
        >
            <span>{item.days_type}</span>
        </div>,
        currentLanguage === "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={`actions-${item.id}`}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
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
              ]
            : []),
    ];

    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                textModal={t("allowancesManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("leaveManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewLeaveManagement
                        )
                    }
                />

                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={queryAll.data?.map(renderTableRow) ?? []}
                    isShowContentFilterInfo={true}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`${t("leaveManagement.edit_leave")} ${
                    selectedItem?.ar_title
                }`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        ar: {
                            title: selectedItem?.ar_title,
                            content: selectedItem?.ar_content,
                        },
                        en: {
                            title: selectedItem?.en_title,
                            content: selectedItem?.en_content,
                        },
                        days: selectedItem?.days,
                        can_take_after: selectedItem?.can_take_after,
                        paid: selectedItem?.paid,
                        paid_percent: selectedItem?.paid_percent || 1,
                        days_type: selectedItem?.days_type || "work_days",
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(LeaveManagement);

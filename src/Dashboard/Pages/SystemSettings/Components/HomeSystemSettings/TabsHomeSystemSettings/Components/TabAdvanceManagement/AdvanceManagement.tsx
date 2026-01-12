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
import { useAdvancemanage } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const AdvanceManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");

    const TABLE_HEADERS = [
        // t("advanceManagement.number"),
        t("advanceManagement.arName"),
        t("advanceManagement.enName"),
        t("advanceManagement.paymentDays"),
        t("advanceManagement.createdAt"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];
    const navigate = useNavigate();
    const currentLanguage = i18next.language;

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useAdvancemanage();

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
            toast.success(t("advanceManagement.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("advanceManagement.deleteError"));
        }
    }, []);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("advanceManagement.updateSuccess"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("advanceManagement.updateError"));
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
        `${item?.days ? `${item?.days} شهر` : " لم يتم التحديد"}`,
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
                textModal={t("advanceManagement.deleteConfirmText")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("advanceManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewAdvanceManagement
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
                titleModal={
                    t("advanceManagement.editAdvance") +
                    " " +
                    selectedItem?.title
                }
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        ar: { title: selectedItem?.ar_title },
                        en: { title: selectedItem?.en_title },
                        days: selectedItem?.days,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(AdvanceManagement);

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
import { useContractType } from "@/hooks/api/system-settings";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";

const ContractType = ({ permissions }: { permissions: any }) => {
    const { t, i18n } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const currentLanguage = i18next.language;

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useContractType();

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
            toast.success(t("contractTypeManagement.messages.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("contractTypeManagement.messages.deleteError"));
        }
    }, [deleteItem, t, toggleModal]);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("contractTypeManagement.messages.updateSuccess"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("contractTypeManagement.messages.updateError"));
            }
        },
        [selectedItem, updateItem, t, toggleModal]
    );

    if (queryAll.isLoading) return <Loading />;
    const TABLE_HEADERS = [
        t("contractTypeManagement.tableHeaders.id"),
        t("contractTypeManagement.tableHeaders.nameArabic"),
        t("contractTypeManagement.tableHeaders.nameEnglish"),
        t("contractTypeManagement.tableHeaders.employeeCount"),
        t("contractTypeManagement.tableHeaders.creationDate"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const renderTableRow = (item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{item.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item.en_title}</span>
        </div>,
        `${item?.employees_count} موظف`,
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
                titleModal={t("contractTypeManagement.deleteModal.title")}
                textModal={t("contractTypeManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("contractTypeManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewContractType
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
                titleModal={`${t("contractTypeManagement.editModal.title")} ${currentLanguage === "ar" ? selectedItem?.ar_title : selectedItem?.en_title}`}
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

export default React.memo(ContractType);

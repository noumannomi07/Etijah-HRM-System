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
import { useAllowancesManagement } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const AllowancesManagement = ({ permissions }: { permissions: any }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("systemSettings");
    const currentLanguage = i18next.language;
    const TABLE_HEADERS = [
        t("allowancesManagement.tableHeaders.id"),
        t("allowancesManagement.tableHeaders.arName"),
        t("allowancesManagement.tableHeaders.enName"),
        t("allowancesManagement.tableHeaders.createdAt"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useAllowancesManagement();

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
            toast.success(t("allowancesManagement.toast.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("allowancesManagement.toast.deleteError"));
        }
    }, []);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("allowancesManagement.toast.updateSuccess"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("allowancesManagement.toast.updateError"));
            }
        },
        [selectedItem]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{item.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item.en_title}</span>
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
                    titleHeader={t("allowancesManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewAllowancesManagement
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
                titleModal={`${t("allowancesManagement.editModal.title")} ${
                    selectedItem?.title
                }`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        ar: { title: selectedItem?.ar_title },
                        en: { title: selectedItem?.en_title },
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(AllowancesManagement);

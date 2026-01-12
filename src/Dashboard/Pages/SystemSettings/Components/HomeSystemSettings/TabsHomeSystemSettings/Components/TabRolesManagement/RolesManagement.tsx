import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import FormComponent from "./Components/form";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useRolesManagement } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const rolesManagementPage = ({ permissions }: { permissions: any }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("systemSettings");
    const TABLE_HEADERS = [
        t("rolesManagement.tableHeaders.id"),
        t("rolesManagement.tableHeaders.name"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useRolesManagement();

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
            toast.success(t("rolesManagement.toast.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("rolesManagement.toast.deleteError"));
        }
    }, [deleteItem, t, toggleModal]);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("rolesManagement.toast.updateSuccess"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("rolesManagement.toast.updateError"));
            }
        },
        [selectedItem, updateItem, t, toggleModal]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`name-${item.id}`} className="flex justify-center flex-col">
            <span>{item.name}</span>
        </div>,

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
                textModal={t("rolesManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("rolesManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewRolesManagement
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
                newClassModal="!max-w-[800px] lg:!min-w-[1000px] xl:!min-w-[1200px]"
                titleModal={`${t("rolesManagement.editModal.title")} ${
                    selectedItem?.name
                }`}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        name: selectedItem?.name,
                        permissions: selectedItem?.permissions,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(rolesManagementPage);

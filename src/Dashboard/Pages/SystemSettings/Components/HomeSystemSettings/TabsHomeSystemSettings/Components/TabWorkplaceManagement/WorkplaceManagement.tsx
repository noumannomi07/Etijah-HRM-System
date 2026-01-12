import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import i18next from "i18next";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";

import FormComponent from "./Components/form";
import theDateObj from "@/Dashboard/DateMonthDays";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useWorkPlace } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const WorkplaceManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");

    const navigate = useNavigate();

    const currentLanguage = i18next.language;

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useWorkPlace();

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const TABLE_HEADERS = [
        t("workplaceManagement.index"),
        t("workplaceManagement.nameAr"),
        t("workplaceManagement.nameEn"),
        t("workplaceManagement.address"),
        t("workplaceManagement.location"),
        t("workplaceManagement.createdAt"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success(t("workplaceManagement.successDelete"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("workplaceManagement.errorDelete"));
        }
    }, []);

    const handleUpdate = useCallback(
        async (values) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("workplaceManagement.successUpdate"));
                toggleModal("edit");
            } catch (error) {
                toast.error(t("workplaceManagement.errorUpdate"));
            }
        },
        [selectedItem]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item?.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item?.en_title}</span>
        </div>,
        <div key={`id-${item.id}`}>{item.address}</div>,
        <div key={`id-${item.id}`}>{item.round}</div>,
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
                titleModal={t("workplaceManagement.deleteTitle")}
                textModal={t("workplaceManagement.deleteText")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("workplaceManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewWorkplaceManagement
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
                titleModal={`${t("workplaceManagement.editTitle")} ${
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
                        address: selectedItem?.address,
                        round: selectedItem?.round,
                        lat: selectedItem?.lat,
                        lng: selectedItem?.lng,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(WorkplaceManagement);

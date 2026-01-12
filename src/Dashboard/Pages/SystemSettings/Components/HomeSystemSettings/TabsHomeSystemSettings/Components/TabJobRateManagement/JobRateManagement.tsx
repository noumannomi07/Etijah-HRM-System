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
import { useJobRate } from "@/hooks/api/system-settings";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import FormComponent from "./Components/form";
import Details from "./Components/details";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";

const JobRateManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const navigate = useNavigate();

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useJobRate();

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
                toast.success(t("jobRateManagement.messages.deleteSuccess"));
                toggleModal("delete");
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || t("jobRateManagement.messages.deleteError")
                );
            }
        },
        [deleteItem, toggleModal, t]
    );

    const handleUpdate = useCallback(
        async (values: any) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("jobRateManagement.messages.updateSuccess"));
                toggleModal("edit");
            } catch (error) {
                toast.error(error?.data?.message || t("jobRateManagement.messages.updateError"));
            }
        },
        [selectedItem, toggleModal, updateItem, t]
    );

    const lang = i18next.language;

    const TABLE_HEADERS = [
        t("jobRateManagement.tableHeaders.id"),
        t("jobRateManagement.tableHeaders.nameArabic"),
        t("jobRateManagement.tableHeaders.nameEnglish"),
        t("jobRateManagement.tableHeaders.creationDate"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const renderTableRow = (item: any) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{lang === "ar" ? (item?.ar?.title || item?.ar_title) : (item?.en?.title || item?.en_title)}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{lang === "ar" ? (item?.en?.title || item?.en_title) : (item?.ar?.title || item?.ar_title)}</span>
        </div>,
        lang === "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={`actions-${item.id}`}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction={false}
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
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
              ]
            : []),
    ];

    if (queryAll.isLoading) return <Loading />;

    return (
        <>
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                titleModal={t("jobRateManagement.deleteModal.title")}
                textModal={t("jobRateManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <CustomModal
                isOpen={modalState.show}
                titleModal={`${t("jobRateManagement.detailsModal.title")} - ${
                    lang === "ar" ? (selectedItem?.ar?.title || selectedItem?.ar_title) : (selectedItem?.en?.title || selectedItem?.en_title)
                }`}
                handleOpen={() => toggleModal("show")}
            >
                <Details selectedItem={selectedItem} />
            </CustomModal>

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("jobRateManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewJobRateManagement
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
                titleModal={`${t("jobRateManagement.editModal.title")} - ${
                    lang === "ar" ? (selectedItem?.ar?.title || selectedItem?.ar_title) : (selectedItem?.en?.title || selectedItem?.en_title)
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
                                  ar: { title: selectedItem?.ar_title },
                                  en: { title: selectedItem?.en_title },
                              }
                            : null
                    }
                />
            </CustomModal>
        </>
    );
};

export default React.memo(JobRateManagement);

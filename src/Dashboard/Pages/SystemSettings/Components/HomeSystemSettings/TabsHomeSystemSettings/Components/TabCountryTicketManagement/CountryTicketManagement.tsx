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
import { useCountryTicketManagement } from "@/hooks/api/system-settings";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CountryTicketManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useCountryTicketManagement();

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
            toast.success(t("countryTicketManagement.messages.deleteSuccess"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("countryTicketManagement.messages.deleteError"));
        }
    }, [deleteItem, t, toggleModal]);

    const handleUpdate = useCallback(
        async (values, { resetForm }: FormikHelpers<any>) => {
            try {
                const payload = {
                    ...values,
                    paid: values.paid || 0,
                    paid_percent: +values?.paid_percent || 1,
                };
                await updateItem({ id: selectedItem?.id, ...payload });
                toast.success(t("countryTicketManagement.messages.updateSuccess"));
                toggleModal("edit");
                resetForm();
            } catch (error) {
                toast.error(t("countryTicketManagement.messages.updateError"));
            }
        },
        [selectedItem, updateItem, t, toggleModal]
    );

    const lang = i18next.language;

    if (queryAll.isLoading) return <Loading />;

    const TABLE_HEADERS = [
        t("countryTicketManagement.tableHeaders.id"),
        t("countryTicketManagement.tableHeaders.nameArabic"),
        t("countryTicketManagement.tableHeaders.nameEnglish"),
        t("countryTicketManagement.tableHeaders.yearCount"),
        t("countryTicketManagement.tableHeaders.amount"),
        t("countryTicketManagement.tableHeaders.adult"),
        t("countryTicketManagement.tableHeaders.child"),
        t("countryTicketManagement.tableHeaders.infant"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const renderTableRow = (item) => [
        <div key={`id-${item.id}`}># {item.id}</div>,
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{lang === "ar" ? item.ar_title : item.en_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{lang === "ar" ? item.en_title : item.ar_title}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.year_count}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.amount}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.adult}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.child}</span>
        </div>,
        <div key={`days-${item.id}`} className="flex justify-center flex-col">
            <span>{item.infant}</span>
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
                titleModal={t("countryTicketManagement.deleteModal.title")}
                textModal={t("countryTicketManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("countryTicketManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewCountryTicketManagement
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
                titleModal={`${t("countryTicketManagement.editModal.title")} ${lang === "ar" ? selectedItem?.ar_title : selectedItem?.en_title}`}
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
                        year_count: selectedItem?.year_count,
                        amount: selectedItem?.amount,
                        adult: selectedItem?.adult,
                        child: selectedItem?.child,
                        infant: selectedItem?.infant,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(CountryTicketManagement);

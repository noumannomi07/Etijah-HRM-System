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
import HasMileForm from "./Components/has-mile-form";
import theDateObj from "@/Dashboard/DateMonthDays";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import {
    useExpenseManagement,
    useMileManagement,
} from "@/hooks/api/system-settings";
import { Tooltip } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const ExpenseManagement = ({ permissions }: { permissions: any }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("systemSettings");

    const TABLE_HEADERS = [
        // t("lettersManagement.tableHeaders.id"),
        t("lettersManagement.tableHeaders.arName"),
        t("lettersManagement.tableHeaders.enName"),
        t("lettersManagement.tableHeaders.createdAt"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];
    const currentLanguage = i18next.language;

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useExpenseManagement();
    const {
        queryAll: queryAllMilePrice,
        updateItem: updateItemMilePrice,
        isUpdating: isUpdatingMilePrice,
    } = useMileManagement();

    const hasMileObj = queryAllMilePrice?.data || {};
    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
        edit_has_mile: false,
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success(t("workplaceManagement.successDelete"));
            toggleModal("delete");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    t("workplaceManagement.errorDelete")
            );
        }
    }, []);

    const handleUpdate = useCallback(
        async (values) => {
            try {
                await updateItem({ id: selectedItem.id, ...values });
                toast.success(t("allowancesManagement.toast.updateSuccess"));
                toggleModal("edit");
            } catch (error) {
                toast.error(t("allowancesManagement.toast.updateError"));
            }
        },
        [selectedItem]
    );
    const handleUpdateMilePrice = useCallback(
        async (values) => {
            try {
                await updateItemMilePrice({
                    id: hasMileObj?.id || 1,
                    ...values,
                });
                toast.success(t("allowancesManagement.toast.updateSuccess"));

                toggleModal("edit_has_mile");
            } catch (error) {
                toast.error(t("allowancesManagement.toast.updateError"));
            }
        },
        [hasMileObj]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        // <div key={`id-${item.id}`}># {item.id}</div>,
        <div
            key={`ar-${item.id}`}
            className="flex flex-col gap-2 items-start justify-start"
        >
            <div className="flex items-center gap-2">
                <Tooltip
                    trigger="hover"
                    content={item.ar_content}
                    placement="bottom"
                >
                    <span>
                        {item.ar_title}

                        {/* <FontAwesomeIcon icon={faQuestion} className="text-gray-500" size="sm" /> */}
                    </span>
                </Tooltip>

                {item.has_mile && (
                    <button
                        onClick={() => {
                            setSelectedItem(item);
                            toggleModal("edit_has_mile");
                        }}
                        className="btn-main py-1 px-2 text-xs"
                    >
                        {t("expenseManagement.edit_mileage_rate")}
                    </button>
                )}
            </div>
        </div>,
        <div key={`en-${item.id}`}>
            <Tooltip
                trigger="hover"
                content={item.en_content}
                placement="bottom"
            >
                <span>
                    {item.en_title}
                    {/* <FontAwesomeIcon icon={faQuestion} /> */}
                </span>
            </Tooltip>
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
                    titleHeader={t("expenseManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewExpenseManagement
                        )
                    }
                />

                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={queryAll.data?.map(renderTableRow) ?? []}
                    isShowContentFilterInfo={true}
                    // isTrueButtonsModalContentRight={queryAll?.data?.find(
                    //     (item) => item.has_mile
                    // )}
                    // functionButtonModalOne={() => toggleModal("edit_has_mile")}
                    // textContentButtonOne={t("expenseManagement.edit_mileage_rate")}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={`${"expenseManagement.edit_the_movement"} ${
                    selectedItem?.title
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
                    }}
                />
            </CustomModal>
            <CustomModal
                isOpen={modalState.edit_has_mile}
                titleModal={t("expenseManagement.edit_mileage_rate")}
                handleOpen={() => toggleModal("edit_has_mile")}
            >
                <HasMileForm
                    price={selectedItem?.mile_price}
                    loading={isUpdatingMilePrice}
                    handleSubmit={handleUpdateMilePrice}
                    cancel={() => toggleModal("edit_has_mile")}
                    initialValuesForEdit={{
                        price: hasMileObj?.id ? hasMileObj?.price : 0,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(ExpenseManagement);

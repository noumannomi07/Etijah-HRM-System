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
import { useLetters } from "@/hooks/api/system-settings";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import FormComponent from "./Components/form";
import Details from "./Components/details";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

const LettersManagement = ({ permissions }: { permissions: any }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const navigate = useNavigate();
    const { t } = useTranslation("systemSettings");
    const TABLE_HEADERS = [
        t("lettersManagement.tableHeaders.id"),
        t("lettersManagement.tableHeaders.arName"),
        t("lettersManagement.tableHeaders.enName"),
        t("lettersManagement.tableHeaders.roomOfCommerce"),
        t("lettersManagement.tableHeaders.createdAt"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];
    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useLetters();

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
                toast.success(t("lettersManagement.toast.deleteSuccess"));

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
                toast.success(t("lettersManagement.toast.updateSuccess"));
                toggleModal("edit");
            } catch (error) {
                toast.error(
                    error?.data?.message ||
                        t("lettersManagement.toast.updateError")
                );
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
        item?.room_of_commerce === 1 ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                {t("common.yes")}
            </span>
        ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md">
                {t("common.no")}
            </span>
        ),
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
                textModal={t("lettersManagement.deleteModal.text")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <CustomModal
                isOpen={modalState.show}
                titleModal={`${t("lettersManagement.showModal.title")}  ${
                    selectedItem?.ar?.title || selectedItem?.ar_title
                }`}
                handleOpen={() => toggleModal("show")}
            >
                <Details selectedItem={selectedItem} />
            </CustomModal>

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("lettersManagement.title")}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewLetterManagement
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
                titleModal={`${t("lettersManagement.editModal.title")}  ${
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
                                  ar: { title: selectedItem?.ar_title },
                                  en: { title: selectedItem?.en_title },
                                  room_of_commerce:
                                      selectedItem.room_of_commerce === 1
                                          ? {
                                                value: 1,
                                                label: t(
                                                    "lettersManagement.yes"
                                                ),
                                            }
                                          : {
                                                value: 0,
                                                label: t(
                                                    "lettersManagement.no"
                                                ),
                                            },
                                  all_nationality:
                                      selectedItem.all_nationality === 1
                                          ? {
                                                value: 1,
                                                label: t(
                                                    "lettersManagement.yes"
                                                ),
                                            }
                                          : {
                                                value: 0,
                                                label: t(
                                                    "lettersManagement.no"
                                                ),
                                            },
                                  nationalities:
                                      selectedItem?.nationalaties?.map((n) => {
                                          return {
                                              ...n,
                                              value: n.id,
                                              label: n.title,
                                          };
                                      }),
                              }
                            : null
                    }
                />
            </CustomModal>
        </>
    );
};

export default React.memo(LettersManagement);

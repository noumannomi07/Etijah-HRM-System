import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { Bank, useBanks, useDeleteBank } from "@/hooks/settings/bank";
import { toast } from "react-toastify";
import AddEditBank from "../AddEditBank/AddEditBank";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";

const TableBankManagement = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const theadTrContent = [
        t("bankManagement.tableHeaders.id"),
        t("bankManagement.tableHeaders.bankName"),
        t("bankManagement.tableHeaders.creationDate"),
        // "IBAN",
        // "Swift Code",
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditBank, setOpenEditBank] = useState(false);
    const [editBankData, setEditBankData] = useState<Bank | null>(null);

    const { data: banks, isLoading } = useBanks();
    const { mutate: deleteBank } = useDeleteBank();

    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handleDelete = (id: number) => {
        deleteBank(id.toString(), {
            onSuccess: () => {
                toast.success(t("bankManagement.messages.deleteSuccess"));
                setOpenModalDelete(false);
            },
        });
    };

    const lang = i18next.language;
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />;
    }

    const tbodyContent =
        banks?.map((item) => [
            <div key={`id-${item.id}`}># {item.id}</div>,
            lang === "ar" ? item.ar_title : item.en_title,
            lang === "ar"
                ? theDateObj.formatDataFunctionAR(item.created_at)
                : theDateObj.formatDataFunctionEN(item.created_at),
            // item.iban,
            // item.swift_code,
            ...(hasAnyPermission(permissions)
                ? [
                      <div key={`actions-${item.id}`}>
                          <ButtonsActionShowEditDelete
                              hideShowFunction={true}
                              hideDelete={!permissions?.delete}
                              hideEdit={!permissions?.update}
                              functionEdit={() => {
                                  setOpenEditBank(true);
                                  setEditBankData(item);
                              }}
                              functionDelete={() => {
                                  buttonOpenModalDelete();
                                  setEditBankData(item);
                              }}
                              functionLinkCopy={() => {}}
                          />
                      </div>,
                  ]
                : []),
        ]) || [];

    return (
        <>
            <ModalDelete
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                titleModal={t("bankManagement.deleteModal.title")}
                textModal={t("bankManagement.deleteModal.text")}
                onDelete={() => {
                    if (editBankData) {
                        handleDelete(editBankData.id);
                    }
                }}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("bankManagement.title")}
                    isButtonAll={false}
                    routePageInfo=""
                    textLink=""
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewBankManagement
                        )
                    }
                    newButtonWithoutText={false}
                    functionButtonNewButton={() => {}}
                    textButton=""
                    newComponentsHere={false}
                />
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={false}
                    functionButtonModalOne={() => {}}
                    textContentButtonOne=""
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                    showDateFilter={false}
                    onChangeDateFilter={() => {}}
                />
            </div>
            <CustomModal
                isOpen={openEditBank}
                titleModal={`${t("bankManagement.editModal.title")}${lang === "ar" ? editBankData?.ar_title : editBankData?.en_title}`}
                handleOpen={() => {
                    setOpenEditBank(false);
                }}
            >
                <AddEditBank
                    data={editBankData || undefined}
                    hideModal={() => setOpenEditBank(false)}
                />
            </CustomModal>
        </>
    );
};

export default TableBankManagement;

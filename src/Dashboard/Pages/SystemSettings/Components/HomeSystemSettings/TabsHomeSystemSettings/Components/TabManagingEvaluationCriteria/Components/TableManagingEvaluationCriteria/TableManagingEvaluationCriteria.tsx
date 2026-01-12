import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import {
    Standard,
    useDeleteStandard,
    useStandards,
} from "@/hooks/settings/standard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalManagingEvaluationCriteria from "../ModalManagingEvaluationCriteria/ModalManagingEvaluationCriteria";
import AddEditManagingEvaluation from "./AddEditManagingEvaluation";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const TableManagingEvaluationCriteria = ({
    permissions,
}: {
    permissions: any;
}) => {
    const { t } = useTranslation("systemSettings");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const navigate = useNavigate();

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openEditStandard, setOpenEditStandard] = useState(false);
    const [editStandardData, setEditStandardData] = useState<Standard | null>(
        null
    );

    const { data: standards, isLoading } = useStandards();
    const { mutate: deleteStandard } = useDeleteStandard();

    const theadTrContent = [
        t("performanceEvaluationManagement.tableHeaders.id"),
        t("performanceEvaluationManagement.tableHeaders.criteriaName"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handleDelete = (id: number) => {
        deleteStandard(id.toString(), {
            onSuccess: () => {
                toast.success(t("performanceEvaluationManagement.messages.deleteSuccess"));
                setOpenModalDelete(false);
            },
        });
    };
    
    const lang = i18next.language;

    if (isLoading) {
        return <Loading />;
    }

    const tbodyContent =
        standards?.map((item) => [
            <div key={`id-${item.id}`}># {item.id}</div>,
            lang === "ar" ? item.ar_title : item.en_title,
            ...(hasAnyPermission(permissions)
                ? [
                      <div key={`actions-${item.id}`}>
                          <ButtonsActionShowEditDelete
                              hideShowFunction={true}
                              hideDelete={!permissions?.delete}
                              hideEdit={!permissions?.update}
                              functionEdit={() => {
                                  setOpenEditStandard(true);
                                  setEditStandardData(item);
                              }}
                              functionDelete={() => {}}
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
                titleModal={t("performanceEvaluationManagement.deleteModal.title")}
                textModal={t("performanceEvaluationManagement.deleteModal.text")}
                onDelete={() => {
                    if (editStandardData) {
                        handleDelete(editStandardData.id);
                    }
                }}
            />

            <ModalManagingEvaluationCriteria
                modalOpen={open}
                hideModal={handleOpen}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("performanceEvaluationManagement.title")}
                    isButtonAll={false}
                    routePageInfo=""
                    textLink=""
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() =>
                        navigate(
                            FullRoutes.Dashboard.SystemSettings
                                .AddNewManagingEvaluationCriteria
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
                    isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={false}
                    functionButtonModalOne={() => {}}
                    textContentButtonOne=""
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                />
            </div>
            <CustomModal
                isOpen={openEditStandard}
                titleModal={`${t("performanceEvaluationManagement.editModal.title")}${lang === "ar" ? editStandardData?.ar_title : editStandardData?.en_title}`}
                handleOpen={() => {
                    setOpenEditStandard(false);
                }}
            >
                <AddEditManagingEvaluation
                    data={editStandardData}
                    hideModal={() => setOpenEditStandard(false)}
                />
            </CustomModal>
        </>
    );
};

export default TableManagingEvaluationCriteria;

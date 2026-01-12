import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import theDateObj from "@/Dashboard/DateMonthDays";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { Bonus, useBonuses, useDeleteBonus } from "@/hooks/settings/bonus";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewDiscountModal from "../AddNewDiscountModal";
import ModalManageDiscounts from "../ModalManageDiscounts/ModalManageDiscounts";
import AddNewCutModal from "../AddNewCutModal";
import { Cut, useDeleteCut } from "@/hooks/settings/cut";
import { useCuts } from "@/hooks/settings/cut";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { hasAnyPermission } from "@/utils/global";

enum EManageSection {
    Additions = 1,
    Discounts = 2,
}

const TableManageDiscounts = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const [mangeSec, setmangeSec] = useState<EManageSection>(
        EManageSection.Additions
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { data: bonuses, isPending } = useBonuses();
    const { mutate: deleteBonus } = useDeleteBonus();

    const { data: cuts, isPending: isPendingCuts } = useCuts();
    const { mutate: deleteCut } = useDeleteCut();

    const selectMangeFunc = (e: EManageSection) => {
        setmangeSec(e);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [activeEntity, setActiveEntity] = useState<Bonus | Cut>();

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const buttonOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    if (isPending || isPendingCuts) {
        return <Loading />;
    }

    const theadTrContentDiscount = [
        t("discountsManagement.ID"),
        t("discountsManagement.discount_name"),
        t("discountsManagement.created_at"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    const theadTrContentAdd = [
        t("discountsManagement.ID"),
        t("discountsManagement.addon_name"),
        t("discountsManagement.created_at"),
        ...(hasAnyPermission(permissions) ? [""] : []),
    ];

    // CONTENT OF ARRAY
    const tbodyContent = (
        mangeSec === EManageSection.Additions ? bonuses ?? [] : cuts ?? []
    ).map((item) => [
        <div key={item.id}># {item.id}</div>,
        item.ar_title,

        i18next.language === "ar"
            ? theDateObj.formatDataFunctionAR(item.updated_at)
            : theDateObj.formatDataFunctionEN(item.updated_at),

        ...(hasAnyPermission(permissions)
            ? [
                  <div key={item.id}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction={true}
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
                          functionEdit={() => {
                              setIsEditing(true);
                              setActiveEntity(item);
                          }}
                          functionDelete={() => {
                              buttonOpenModalDelete();
                              setActiveEntity(item);
                          }}
                      />
                  </div>,
              ]
            : []),
    ]);

    return (
        <>
            <ModalDelete
                openModalDelete={openModalDelete}
                hiddenModalDelete={buttonOpenModalDelete}
                titleModal={t("common.DeleteTitle")}
                textModal={t("common.DeleteText")}
                onDelete={() => {
                    if (activeEntity) {
                        if (mangeSec === EManageSection.Additions) {
                            deleteBonus(String(activeEntity.id));
                        } else {
                            deleteCut(String(activeEntity.id));
                        }
                    }
                }}
            />

            <ModalManageDiscounts
                modalOpen={open}
                hideModal={handleOpen}
                section={mangeSec}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={
                        mangeSec === EManageSection.Additions
                            ? t("discountsManagement.orders_management")
                            : t("discountsManagement.title")
                    }
                    isButtonAll={false}
                    textLink={false}
                    buttonAddNewOrder={false}
                    isButtonSystemSettings={permissions?.create}
                    functionButtonAddNewOrder={() => {
                        navigate(
                            mangeSec === EManageSection.Discounts
                                ? FullRoutes.Dashboard.SystemSettings
                                      .AddNewManageDiscounts
                                : FullRoutes.Dashboard.SystemSettings
                                      .AddNewManageAdditions
                        );
                    }}
                    newButtonWithoutText={false}
                    newComponentsHere={false}
                />
                <div
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                    }}
                >
                    <button
                        onClick={() => {
                            selectMangeFunc(EManageSection.Additions);
                        }}
                        className={`button-transparent button-hover-svg font-[600] gap-[5px] ${
                            mangeSec === EManageSection.Additions
                                ? "activeButtonNewx02"
                                : null
                        }`}
                        style={{
                            margin: "0 5px",
                        }}
                    >
                        {t("discountsManagement.additions")}
                    </button>
                    <button
                        onClick={() => {
                            selectMangeFunc(EManageSection.Discounts);
                        }}
                        className={`button-transparent button-hover-svg font-[600] gap-[5px] ${
                            mangeSec === EManageSection.Discounts
                                ? "activeButtonNewx02"
                                : null
                        }`}
                        style={{
                            margin: "0 5px",
                        }}
                    >
                        {t("discountsManagement.discounts")}
                    </button>
                </div>
                <DataTableTwo
                    theadContent={
                        mangeSec === EManageSection.Discounts
                            ? theadTrContentDiscount
                            : theadTrContentAdd
                    }
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={() => {
                        handleOpen();
                    }}
                    isTrueButtonsModalContentRight={false}
                    isTrueButtonTwoModalContent={false}
                />
            </div>
            <CustomModal
                isOpen={isEditing}
                titleModal={`${t("discountsManagement.edit")} ${
                    mangeSec === EManageSection.Additions
                        ? t("discountsManagement.addition")
                        : t("discountsManagement.discount")
                } ${activeEntity?.ar_title}`}
                handleOpen={() => setIsEditing(false)}
            >
                {mangeSec === EManageSection.Additions ? (
                    <AddNewCutModal
                        data={activeEntity}
                        hideModal={() => setIsEditing(false)}
                    />
                ) : (
                    <AddNewDiscountModal
                        data={activeEntity}
                        hideModal={() => setIsEditing(false)}
                    />
                )}
            </CustomModal>
        </>
    );
};

export default TableManageDiscounts;

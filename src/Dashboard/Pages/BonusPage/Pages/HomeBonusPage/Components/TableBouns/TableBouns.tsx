import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDetailsBouns from "../ModalDetailsBouns/ModalDetailsBouns";
import ModalFilterBouns from "../ModalFilterBouns/ModalFilterBouns";
import { FullRoutes } from "@/Routes/routes";
import axiosInstance from "@/utils/axios"; // Assuming axiosInstance is set up in utils or elsewhere
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { withPermissions } from "@/hoc";

interface Reward {
    id: string;
    title: string;
    amount: number;
    quarters: string;
    year: string;
    status: "upcoming" | "completed";
}

const TableBouns = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation('bonus');
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedBouns, setSelectedBouns] = useState<Reward | null>(null);
    const [openDetailsBouns, setOpenDetailsBouns] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/rewards")
            .then((res) => {
                setRewards(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching rewards:", error);
            });
    }, []);

    const handleOpen = () => setOpen(!open);
    const handleOpenDetailsBouns = (bouns: Reward) => {
        setSelectedBouns(bouns);
        setOpenDetailsBouns(true);
    };
    const hiddenDetailsBouns = () => setOpenDetailsBouns(false);
    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeDeleteModal = () => setIsModalDeleteOpen(false);
    const handleDelete = () => {
        // Add delete logic here
        closeDeleteModal();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDateFilterChange = (date: Date | string) => {
        // Add date filter logic here
    };

    const theadTrContent = [
        t('table.headers.bonusTitle'),
        t('table.headers.rating'),
        t('table.headers.bonusAmount'),
        t('table.headers.quarter'),
        t('table.headers.year'),
        t('table.headers.status'),
        t('table.headers.actions'),
    ];

    const tbodyContent = rewards.map((reward) => [
        reward.title,
        reward.rate + " %",
        <div key={reward.id}>
            {reward.amount} <Saudiriyal />
        </div>,
        reward.quarters
            ? JSON.parse(reward.quarters)
                  .map((quarter: string, index: number) => {
                      switch (quarter) {
                          case "1":
                              return t('quarters.first');
                          case "2":
                              return t('quarters.second');
                          case "3":
                              return t('quarters.third');
                          case "4":
                              return t('quarters.fourth');
                          default:
                              return "";
                      }
                  })
                  .join(` ${t('quarters.and')} `)
            : t('status.notSpecified'),
        reward.year,
        reward.status === "upcoming" ? t('status.upcoming') : t('status.completed'),
        <button
            onClick={() => handleOpenDetailsBouns(reward)}
            className="btn-main button-green"
            key={reward.id}
        >
            {t('buttons.view')}
        </button>,
    ]);

    return (
        <>
            <ModalDelete
                openModalDelete={isModalDeleteOpen}
                hiddenModalDelete={closeDeleteModal}
                titleModal={t('deleteModal.title')}
                textModal={t('deleteModal.message')}
                onDelete={handleDelete}
            />

            {selectedBouns && (
                <ModalDetailsBouns
                    openModalDetailsBouns={openDetailsBouns}
                    hiddenModalDetailsBouns={hiddenDetailsBouns}
                    handleButtonDelete={() => {
                        hiddenDetailsBouns();
                        openDeleteModal();
                    }}
                    buttonEditPageRoute={FullRoutes.Dashboard.Bonus.AddNewBonusWithId(
                        { id: selectedBouns.id }
                    )}
                    rewardData={selectedBouns}
                />
            )}

            <ModalFilterBouns open={open} hiddenModal={handleOpen} />

            <div className="table-employment-requests border-width-content">
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={permissions?.create}
                    functionButtonModalOne={() => {
                        navigate(FullRoutes.Dashboard.Bonus.AddNewBonus);
                    }}
                    textContentButtonOne={t('buttons.addBonus')}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => {}}
                    textContetButtonTwo=""
                    showDateFilter={true}
                    onChangeDateFilter={handleDateFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </div>
        </>
    );
};

export default withPermissions(TableBouns, "rewards", {
    isComponent: true,
});

import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import FormComponent from "../form";
import { useWorkPlace } from "@/hooks/api/system-settings";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Index = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("systemSettings");

    const { createItem, isCreating } = useWorkPlace();

    const handleSubmit = async (values) => {
        try {
            await createItem({ ...values });
            toast.success(t("messages.successAdd"));
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || t("messages.error"));
        }
    };
    return (
        <>
            <HelmetInfo titlePage={t("workplaceManagement.title")} />
            <BreadCrumbShared textPage={t("workplaceManagement.title")} />
            <HeaderButtonBack />
            <main>
                <div className="all-conent-permission mt-5 border-width-content">
                    <FormComponent
                        loading={isCreating}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </main>
        </>
    );
};

export default Index;

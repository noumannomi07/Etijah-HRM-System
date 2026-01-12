import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import FormComponent from "../form";
import { useJobRate } from "@/hooks/api/system-settings";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();

    const { createItem, isCreating } = useJobRate();

    const handleSubmit = async (values: any) => {
        try {
            await createItem({ ...values });
            toast.success(t("jobRateManagement.messages.addSuccess"));
            navigate(-1);
        } catch (error: any) {
            toast.error(error?.message || t("jobRateManagement.messages.addError"));
        }
    };
    return (
        <>
            <HelmetInfo titlePage={t("jobRateManagement.addNew.title")} />
            <BreadCrumbShared textPage={t("jobRateManagement.addNew.breadcrumb")} />
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

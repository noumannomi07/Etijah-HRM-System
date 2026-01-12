import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useCountryTicketManagement } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();

    const { createItem, isCreating } = useCountryTicketManagement();

    const handleSubmit = async (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
            year_count: true,
            amount: true,
            adult: true,
            child: true,
            infant: true,
        });

        try {
            const payload = {
                ...values,
                year_count: values.year_count || 0,
                amount: values.amount || 0,
                adult: values.adult || 0,
                child: values.child || 0,
                infant: values.infant || 0,
            };

            await createItem(payload);
            toast.success(t("countryTicketManagement.messages.addSuccess"));
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || t("countryTicketManagement.messages.addError"));
        }
    };
    return (
        <>
            <HelmetInfo titlePage={t("countryTicketManagement.addNew.title")} />
            <BreadCrumbShared textPage={t("countryTicketManagement.addNew.breadcrumb")} />
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

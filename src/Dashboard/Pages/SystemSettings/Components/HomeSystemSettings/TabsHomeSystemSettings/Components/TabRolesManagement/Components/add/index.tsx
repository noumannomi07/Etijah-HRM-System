import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useRolesManagement } from "@/hooks/api/system-settings";
import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();

    const { createItem, isCreating } = useRolesManagement();

    const handleSubmit = async (
        values,
        { setTouched, resetForm }: FormikHelpers<any>
    ) => {
        setTouched({
            name: true,
        });

        try {
            await createItem({
                ...values,
                permissions: values?.permissions || [],
            });
            toast.success(t("rolesManagement.toast.addSuccess"));
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || t("rolesManagement.toast.addError"));
        }
    };
    return (
        <>
            <HelmetInfo titlePage={t("rolesManagement.addNew.title")} />
            <BreadCrumbShared textPage={t("rolesManagement.addNew.breadcrumb")} />
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

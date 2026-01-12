import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import {  useJobType } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";

const AddNewJobType = () => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const { createItem, isCreating } = useJobType();

    const handleSubmit = async (values: any, { setTouched, resetForm }: any) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
        });

        try {
            console.log(values);
            await createItem({ ...values });
            toast.success(t("jobTypeManagement.messages.addSuccess"));
            navigate(-1);
        } catch (error: any) {
            toast.error(error?.message || t("jobTypeManagement.messages.addError"));
        }
    };

    return (
        <>
            <HelmetInfo titlePage={t("jobTypeManagement.addNew.title")} />
            <BreadCrumbShared textPage={t("jobTypeManagement.addNew.breadcrumb")} />
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

export default AddNewJobType;

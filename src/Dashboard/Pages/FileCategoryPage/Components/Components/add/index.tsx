import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";

import { useNavigate } from "react-router-dom";
import FormComponent from "../form";
import { useFileCategory } from "@/hooks/api";
import { toast } from "react-toastify";
import BreadCrumbShared from "@/Dashboard/Pages/SystemSettings/Components/HomeSystemSettings/TabsHomeSystemSettings/Components/Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "@/Dashboard/Pages/SystemSettings/Components/HomeSystemSettings/TabsHomeSystemSettings/Components/Shared/HeaderButtonBack/HeaderButtonBack";

const Index = () => {
    const navigate = useNavigate();

    const { createItem, isCreating } = useFileCategory();

    const handleSubmit = async (values: any) => {
        try {
            await createItem({ ...values });
            toast.success("تم إضافة اقسام الملفات بنجاح!");
            navigate(-1);
        } catch (error: any) {
            toast.error(error?.message || "حدث خطأ أثناء إضافة اقسام الملفات");
        }
    };
    return (
        <>
            <HelmetInfo titlePage={"مستندات الموظفين"} />
            <BreadCrumbShared textPage="مستندات الموظفين" />
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

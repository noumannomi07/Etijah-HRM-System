import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useAdvancemanage } from "@/hooks/api/system-settings";

const Index = () => {
    const navigate = useNavigate();

    const { createItem, isCreating } = useAdvancemanage();

    const handleSubmit = async (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
            months: true,
        });

        try {
            await createItem({ ...values });
            toast.success("تم إضافة فترة السداد بنجاح!");
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || "حدث خطأ أثناء إضافة فترة السداد");
        }
    };
    return (
        <>
            <HelmetInfo titlePage={"إدارة السلف"} />
            <BreadCrumbShared textPage="إدارة السلف" />
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

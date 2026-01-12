import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import FormComponent from "../form";
import { useWorkTime } from "@/hooks/api/system-settings";
import { toast } from "react-toastify";

const Index = () => {
    const navigate = useNavigate();

    const { createItem, isCreating } = useWorkTime();

    const handleSubmit = async (values) => {
        try {
            await createItem({ ...values });
            toast.success("تم إضافة وقت العمل بنجاح!");
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || "حدث خطأ أثناء إضافة وقت العمل");
        }
    };
    return (
        <>
            <HelmetInfo titlePage={"اوقات العمل"} />
            <BreadCrumbShared textPage="اوقات العمل" />
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

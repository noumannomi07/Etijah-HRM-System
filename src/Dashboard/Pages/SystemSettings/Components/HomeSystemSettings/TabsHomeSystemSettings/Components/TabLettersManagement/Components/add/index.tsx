import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import FormComponent from "../form";
import { useLetters } from "@/hooks/api/system-settings";
import { toast } from "react-toastify";

const Index = () => {
    const navigate = useNavigate();

    const { createItem, isCreating } = useLetters();

    const handleSubmit = async (values) => {
        try {
            await createItem({ ...values });
            toast.success("تم الاضافة بنجاح!");
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || "حدث خطأ أثناء الاضافة");
        }
    };
    return (
        <>
            <HelmetInfo titlePage={"خطابات العمل"} />
            <BreadCrumbShared textPage="خطابات العمل" />
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

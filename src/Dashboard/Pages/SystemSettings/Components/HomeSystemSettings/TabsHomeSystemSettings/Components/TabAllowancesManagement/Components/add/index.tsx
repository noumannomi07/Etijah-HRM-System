import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useAllowancesManagement } from "@/hooks/api/system-settings";

const Index = () => {
    const navigate = useNavigate();

    const { createItem, isCreating } = useAllowancesManagement();

    const handleSubmit = async (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
        });

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
            <HelmetInfo titlePage={"إدارة البدلات"} />
            <BreadCrumbShared textPage="إدارة البدلات" />
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

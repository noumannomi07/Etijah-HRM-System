import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useContractType } from "@/hooks/api/system-settings";

const AddNewContractType = () => {
    const navigate = useNavigate();
    const { createItem, isCreating } = useContractType();

    const handleSubmit = async (values, { setTouched, resetForm }) => {
        setTouched({
            "ar.title": true,
            "en.title": true,
        });

        try {
            console.log(values);
            await createItem({ ...values });
            toast.success("تم إضافة نوع العقد بنجاح!");
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || "حدث خطأ أثناء إضافة نوع العقد");
        }
    };

    return (
        <>
            <HelmetInfo titlePage={"إضافة نوع عقد جديد"} />
            <BreadCrumbShared textPage="إضافة نوع عقد جديد" />
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

export default AddNewContractType;

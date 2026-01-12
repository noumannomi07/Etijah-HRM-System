import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
    ar: {
        title: "",
    },
    en: {
        title: "",
    },
};
function FormComponent({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}) {
        const {t} =useTranslation("systemSettings")
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required(t("advanceManagement.form.validation.title_ar_required"))
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    t("advanceManagement.form.validation.title_ar_format")
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required(t("advanceManagement.form.validation.title_en_required"))
                .matches(
                    /^[A-Za-z\s]+$/,
                    t("advanceManagement.form.validation.title_en_format")
                ),
        }),
    });

    return (
        <Formik
            initialValues={initialValuesForEdit || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form>
                    <div className="all-forms-grid grid-cards-2">
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("advanceManagement.form.fields.nameAr")}
                                name={"ar.title"}
                                type={"text"}
                                placeholder={t("advanceManagement.form.fields.nameAr")}
                                success
                                error={touched.ar?.title && errors.ar?.title}
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("advanceManagement.form.fields.nameEn")}
                                name={"en.title"}
                                type={"text"}
                                placeholder={t("advanceManagement.form.fields.nameEn")}
                                success
                                error={touched.en?.title && errors.en?.title}
                            />
                        </div>
                    </div>

                    <ButtonsFormSendCancel
                        cancelAdd={() => (cancel ? cancel() : navigate(-1))}
                        submitButton={handleSubmit}
                        isSubmitting={loading}
                    />
                </Form>
            )}
        </Formik>
    );
}

export default FormComponent;

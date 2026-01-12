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
    cancel = () => {},
}) {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required(t("jobTypeManagement.validation.nameArabicRequired"))
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    t("jobTypeManagement.validation.nameArabicFormat")
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required(t("jobTypeManagement.validation.nameEnglishRequired"))
                .matches(
                    /^[A-Za-z\s]+$/,
                    t("jobTypeManagement.validation.nameEnglishFormat")
                ),
        })
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
                                label={t("jobTypeManagement.form.nameArabic")}
                                name={"ar.title"}
                                type={"text"}
                                placeholder={t("jobTypeManagement.form.nameArabicPlaceholder")}
                                success
                                error={touched.ar?.title && errors.ar?.title}
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("jobTypeManagement.form.nameEnglish")}
                                name={"en.title"}
                                type={"text"}
                                placeholder={
                                    t("jobTypeManagement.form.nameEnglishPlaceholder")
                                }
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

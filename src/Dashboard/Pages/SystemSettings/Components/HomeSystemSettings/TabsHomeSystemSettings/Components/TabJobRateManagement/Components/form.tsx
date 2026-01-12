import React from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface FormValues {
    ar: { title: string };
    en: { title: string };
}

const initialValues: FormValues = {
    ar: { title: "" },
    en: { title: "" },
};

interface FormComponentProps {
    initialValuesForEdit?: FormValues | null;
    loading?: boolean;
    handleSubmit?: (values: any) => void;
    cancel?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}) => {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();

    // ✅ Fixed Validation Schema
    const validationSchema = Yup.object().shape({
        ar: Yup.object().shape({
            title: Yup.string()
                .required(t("jobRateManagement.validation.nameArabicRequired"))
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    t("jobRateManagement.validation.nameArabicFormat")
                ),
        }),
        en: Yup.object().shape({
            title: Yup.string()
                .required(t("jobRateManagement.validation.nameEnglishRequired"))
                .matches(
                    /^[A-Za-z\s]+$/,
                    t("jobRateManagement.validation.nameEnglishFormat")
                ),
        }),
    });

    const onSubmit = (values: FormValues) => {
        const formData = {
            ...values,
        };
        handleSubmit(formData);
    };

    return (
        <Formik
            initialValues={initialValuesForEdit || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnBlur
            validateOnChange
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form>
                    <div className="all-forms-grid grid-cards-2">
                        {/* Arabic Title */}
                        <div className="input-one-details">
                            <Field name="ar.title">
                                {({
                                    field,
                                    meta,
                                }: {
                                    field: any;
                                    meta: any;
                                }) => (
                                    <InputField
                                        isShowLabel={true}
                                        label={t("jobRateManagement.form.nameArabic")}
                                        name={field.name}
                                        type="text"
                                        placeholder={t("jobRateManagement.form.nameArabicPlaceholder")}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                        </div>

                        {/* English Title */}
                        <div className="input-one-details">
                            <Field name="en.title">
                                {({
                                    field,
                                    meta,
                                }: {
                                    field: any;
                                    meta: any;
                                }) => (
                                    <InputField
                                        isShowLabel={true}
                                        label={t("jobRateManagement.form.nameEnglish")}
                                        name={field.name}
                                        type="text"
                                        placeholder={t("jobRateManagement.form.nameEnglishPlaceholder")}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>

                    <ButtonsFormSendCancel
                        cancelAdd={() => (cancel ? cancel() : navigate(-1))}
                        submitButton={handleSubmit}
                        isSubmitting={loading || isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;

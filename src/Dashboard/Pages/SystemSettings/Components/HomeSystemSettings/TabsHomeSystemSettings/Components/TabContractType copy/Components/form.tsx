import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required("الاسم باللغة العربية مطلوب")
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    "يجب إدخال الاسم باللغة العربية فقط"
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required("الاسم باللغة الإنجليزية مطلوب")
                .matches(
                    /^[A-Za-z\s]+$/,
                    "يجب إدخال الاسم باللغة الإنجليزية فقط"
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
                                label={"الاسم باللغة العربية"}
                                name={"ar.title"}
                                type={"text"}
                                placeholder={"الاسم باللغة العربية"}
                                success
                                error={touched.ar?.title && errors.ar?.title}
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={"الاسم باللغة الإنجليزية"}
                                name={"en.title"}
                                type={"text"}
                                placeholder={
                                    "الاسم باللغة الإنجليزية"
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

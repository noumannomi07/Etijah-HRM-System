import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { TWorkdataForm } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/types";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { useNationalaties } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface FormValues {
    ar: {
        title: string;
    };
    en: {
        title: string;
    };
    amount: string;
    adult: string;
    child: string;
    infant: string;
 
}

interface FormComponentProps {
    initialValuesForEdit?: FormValues | null;
    loading?: boolean;
    handleSubmit?: (values: FormValues) => void;
    cancel?: () => void;
}

const initialValues = {
    ar: {
        title: "",
    },
    en: {
        title: "",
    },
    year_count: null,
    amount: "",
    adult: 0,
    child: 0,
    infant: 0,
 
};
function FormComponent({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}: FormComponentProps) {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
 
    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required(t("countryTicketManagement.validation.nameArabicRequired"))
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    t("countryTicketManagement.validation.nameArabicFormat")
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required(t("countryTicketManagement.validation.nameEnglishRequired"))
                .matches(
                    /^[A-Za-z\s]+$/,
                    t("countryTicketManagement.validation.nameEnglishFormat")
                ),
        }),
        year_count: Yup.number()
            .max(10, t("countryTicketManagement.validation.yearCountMax"))
            .required(t("countryTicketManagement.validation.yearCountRequired")),
        amount: Yup.number().required(t("countryTicketManagement.validation.amountRequired")),
        adult: Yup.number().required(t("countryTicketManagement.validation.adultRequired")),
        child: Yup.number().required(t("countryTicketManagement.validation.childRequired")),
        infant: Yup.number().required(t("countryTicketManagement.validation.infantRequired")),
 
    });

    return (
        <Formik
            initialValues={initialValuesForEdit || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, errors, touched, values, setFieldValue }) => {
                console.log({ values });
                console.log({ errors });

                return (
                    <Form>
                        <div className="all-forms-grid grid-cards-2">
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.nameArabic")}
                                    name={"ar.title"}
                                    type={"text"}
                                    placeholder={t("countryTicketManagement.form.nameArabicPlaceholder")}
                                    success
                                    error={
                                        touched.ar?.title && errors.ar?.title
                                    }
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.nameEnglish")}
                                    name={"en.title"}
                                    type={"text"}
                                    placeholder={t("countryTicketManagement.form.nameEnglishPlaceholder")}
                                    success
                                    error={
                                        touched.en?.title && errors.en?.title
                                    }
                                />
                            </div>

                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.amount")}
                                    name={"amount"}
                                    type={"number"}
                                    placeholder={t("countryTicketManagement.form.amountPlaceholder")}
                                    success
                                    error={touched.amount && errors.amount}
                                    min="1"
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.yearCount")}
                                    name={"year_count"}
                                    type={"number"}
                                    placeholder={t("countryTicketManagement.form.yearCountPlaceholder")}
                                    success
                                    error={
                                        touched.year_count && errors.year_count
                                    }
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.adultCount")}
                                    name={"adult"}
                                    type={"number"}
                                    placeholder={t("countryTicketManagement.form.adultCountPlaceholder")}
                                    success
                                    error={touched.adult && errors.adult}
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.childCount")}
                                    name={"child"}
                                    type={"number"}
                                    placeholder={t("countryTicketManagement.form.childCountPlaceholder")}
                                    success
                                    error={touched.child && errors.child}
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("countryTicketManagement.form.infantCount")}
                                    name={"infant"}
                                    type={"number"}
                                    placeholder={t("countryTicketManagement.form.infantCountPlaceholder")}
                                    success
                                    error={touched.infant && errors.infant}
                                />
                            </div>
 
                        </div>

                        <ButtonsFormSendCancel
                            cancelAdd={() => (cancel ? cancel() : navigate(-1))}
                            submitButton={handleSubmit}
                            isSubmitting={loading}
                        />
                    </Form>
                );
            }}
        </Formik>
    );
}

export default FormComponent;

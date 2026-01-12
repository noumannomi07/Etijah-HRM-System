import React from "react";
import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormAddNewBankManagement = () => {
  const { t } = useTranslation("systemSettings");
  
  const initialValues = {
    ar: {
      title: "", // Arabic title
    },
    en: {
      title: "", // English title
    },
    // iban: "",
    // swift_code: "",
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t("bankManagement.validation.bankNameArabicRequired"))
        .matches(/^[\u0621-\u064A\s]+$/, t("bankManagement.validation.bankNameArabicFormat")),
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t("bankManagement.validation.bankNameEnglishRequired"))
        .matches(/^[A-Za-z\s]+$/, t("bankManagement.validation.bankNameEnglishFormat")),
    }),
    // iban: Yup.string().required("رقم ال IBAN مطلوب"),
    // swift_code: Yup.string().required("سويفت كود مطلوب"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
      // iban: true,
      // swift_code: true,
    });

    axiosInstance
      .post("/bank-management", values)
      .then((res) => res.data)
      .then((data) => {
        toast.success(t("bankManagement.messages.addSuccess"));
        resetForm();
        navigate(FullRoutes.Dashboard.SystemSettings.All);
      });
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("bankManagement.messages.cancelSuccess"));
    navigate(FullRoutes.Dashboard.SystemSettings.All);
  };
  return (
    <div className="all-conent-permission mt-5 border-width-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("bankManagement.form.bankNameArabic")}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={t("bankManagement.form.bankNameArabicPlaceholder")}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>

              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("bankManagement.form.bankNameEnglish")}
                  name={"en.title"}
                  type={"text"}
                  placeholder={t("bankManagement.form.bankNameEnglishPlaceholder")}
                  success
                  error={touched.en?.title && errors.en?.title}
                />
              </div>
              {/* <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={"رقم ال IBAN"}
                  name={"iban"}
                  type={"number"}
                  placeholder={"رقم ال IBAN"}
                  success
                  error={touched.iban && errors.iban}
                />
              </div> */}
              {/* <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={"سويفت كود - Swift Code"}
                  name={"swift_code"}
                  type={"text"}
                  placeholder={"سويفت كود - Swift Code"}
                  success
                  error={touched.swift_code && errors.swift_code}
                />
              </div> */}
            </div>

            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={() => handleSubmit()}
              // isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewBankManagement;

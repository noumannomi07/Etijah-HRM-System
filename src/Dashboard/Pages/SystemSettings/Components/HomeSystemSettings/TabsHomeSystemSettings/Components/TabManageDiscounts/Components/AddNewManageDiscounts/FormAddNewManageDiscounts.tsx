import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import React from "react";
import { useTranslation } from "react-i18next";

interface FormValues {
  ar: {
    title: string;
  };
  en: {
    title: string;
  };
}

const FormAddNewManageDiscounts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("systemSettings");

  const initialValues: FormValues = {
    ar: {
      title: "", // Arabic title
    },
    en: {
      title: "", // English title
    },
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t("manageDiscounts.discountNameArabicRequired"))
        .matches(/^[\u0621-\u064A\s]+$/, t("manageDiscounts.arabicOnlyError")),
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t("manageDiscounts.discountNameEnglishRequired"))
        .matches(/^[A-Za-z\s]+$/, t("manageDiscounts.englishOnlyError")),
    }),
  });

  const handleSubmit = (values: FormValues, { setTouched, resetForm }: FormikHelpers<FormValues>) => {
    setTouched({
      ar: { title: true },
      en: { title: true },
    });

    const data = {
      "ar[title]": values.ar.title,
      "en[title]": values.en.title,
    };

    axiosInstance
      .post("/cut-management", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(() => {
        toast.success(t("manageDiscounts.addSuccessMessage"));
        resetForm();
        navigate(FullRoutes.Dashboard.SystemSettings.All);
      })
      .catch((error) => {
        toast.error(t("manageDiscounts.addErrorMessage"));
        console.error("Error:", error);
      });
  };
  const cancelAdd = () => {
    toast.success(t("manageDiscounts.cancelSuccessMessage"));
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
                  label={t("manageDiscounts.discountNameArabic")}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={t("manageDiscounts.discountNameArabic")}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("manageDiscounts.discountNameEnglish")}
                  name={"en.title"}
                  type={"text"}
                  placeholder={t("manageDiscounts.discountNameEnglish")}
                  success
                  error={touched.en?.title && errors.en?.title}
                />
              </div>
            </div>

            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewManageDiscounts;

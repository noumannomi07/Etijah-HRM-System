import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

type FormValues = {
  ar: { title: string };
  en: { title: string };
};

const FormAddNewProjectManagementSettings = () => {
  const { t } = useTranslation("systemSettings");

  const initialValues = {
    ar: {
      title: "",
    },
    en: {
      title: "",
    },
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string().required(t("projectManagement.validation.projectNameArabicRequired")),
    }),
    en: Yup.object({
      title: Yup.string().required(t("projectManagement.validation.projectNameEnglishRequired")),
    }),
  });

  const handleSubmit = (values: FormValues, { setTouched, resetForm }: FormikHelpers<FormValues>) => {
    setTouched({
      ar: { title: true },
      en: { title: true },
    });

    // Perform API call
    axiosInstance
      .post("/project-management", values, {
        headers: {
          "Accept-Language": i18next.language,
        },
      })
      .then(() => {
        toast.success(t("projectManagement.messages.addSuccess"));
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        toast.error(t("projectManagement.messages.addError"));
      });
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("projectManagement.messages.cancelSuccess"));
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
            <div className="all-forms-grid ">
              <div className="input-one-details">
                <div className="form-one-step divformnewaddition02x">
                  <InputField
                    isShowLabel={true}
                    label={t("projectManagement.form.projectNameArabic")}
                    name={"ar.title"}
                    type={"text"}
                    placeholder={t("projectManagement.form.projectNameArabicPlaceholder")}
                    success
                    error={touched.ar?.title && errors.ar?.title}
                  />
                  <InputField
                    isShowLabel={true}
                    label={t("projectManagement.form.projectNameEnglish")}
                    name={"en.title"}
                    type={"text"}
                    placeholder={t("projectManagement.form.projectNameEnglishPlaceholder")}
                    success
                    error={touched.en?.title && errors.en?.title}
                  />
                </div>
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

export default FormAddNewProjectManagementSettings;

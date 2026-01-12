import React from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FormAddNewManagingReasonsLeaving = () => {
  const { t } = useTranslation("systemSettings");
  
  const initialValues = {
    ar: {
      title: "", // Arabic title
    },
    en: {
      title: "", // English title
    },
    // percentageBonus: ""
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t("managingReasonsLeaving.addNew.validation.arabicNameRequired"))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t("managingReasonsLeaving.addNew.validation.arabicNameFormat")
        ),
    }),

    en: Yup.object({
      title: Yup.string()
        .required(t("managingReasonsLeaving.addNew.validation.englishNameRequired"))
        .matches(/^[A-Za-z\s]+$/, t("managingReasonsLeaving.addNew.validation.englishNameFormat")),
    }),
    // percentageBonus: Yup.string()
    // .required("نسبة المكافأة المستحقة مطلوب")
    // .matches(/^\d+(\.\d+)?$/, "يجب إدخال رقم صحيح أو عشري")
  });

  const handleSubmit = (values: any, { setTouched, resetForm }: any) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
      // percentageBonus: true
    });

    axiosInstance
      .post("/leave-management", values)
      .then(() => {
        toast.success(t("managingReasonsLeaving.addNew.addSuccessMessage"));
        resetForm();
        navigate(FullRoutes.Dashboard.SystemSettings.All);
      });
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("managingReasonsLeaving.addNew.cancelSuccessMessage"));
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
                  label={t("managingReasonsLeaving.form.reasonNameArabic")}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={t("managingReasonsLeaving.form.reasonNameArabic")}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>

              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("managingReasonsLeaving.form.reasonNameEnglish")}
                  name={"en.title"}
                  type={"text"}
                  placeholder={t("managingReasonsLeaving.form.reasonNameEnglish")}
                  success
                  error={touched.en?.title && errors.en?.title}
                />
              </div>

              {/*<div className="input-one-details col-span-1 sm:col-span-2">
                <InputField
                  isShowLabel={true}
                  label={"نسبة المكافأة المستحقة"}
                  name={"percentageBonus"}
                  type={"number"}
                  placeholder={"نسبة المكافأة المستحقة"}
                  success
                  error={touched.percentageBonus && errors.percentageBonus}
                />
              </div>*/}
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

export default FormAddNewManagingReasonsLeaving;

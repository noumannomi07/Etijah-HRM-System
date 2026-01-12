import React from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";

const FormAddNewNewsCompany = () => {
  const { t } = useTranslation("addNewNewsCompany");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    titleNews: Yup.string()
      .required(t("requiredTitle"))
      .min(5, t("minTitle")),
    details: Yup.string()
      .required(t("requiredDetails"))
      .min(10, t("minDetails"))
  });

  const initialValues = {
    titleNews: "",
    details: "",
    file: []
  };

  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    const files = values.file;
    if (!files || files.length === 0) {
      toast.error(t("fileRequired"));
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("ar[title]", values.titleNews);
    formData.append("en[title]", values.titleNews);
    formData.append("ar[content]", values.details);
    formData.append("en[content]", values.details);

    files.forEach((item, index) => {
      if (item?.file instanceof File) {
        formData.append(`images[${index}]`, item.file);
      }
    });

    axiosInstance
      .post("/blogs", formData, {
        headers: {
          "Accept-Language": i18next.language,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        toast.success(t("submitSuccess"));
        resetForm();
        navigate(FullRoutes.Dashboard.CompanyNews.All);
      })
      .catch((err) => {
        toast.error(t("submitError"));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const cancelAdd = () => {
    toast.success(t("cancelSuccess"));
    navigate(FullRoutes.Dashboard.CompanyNews.All);
  };

  return (
    <div className="form-add-news border-width-content mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <div className="all-forms-grid grid gap-4">
              <InputField
                isShowLabel={true}
                label={t("titleNews")}
                name="titleNews"
                type="text"
                placeholder={t("titleNews")}
                success
              />

              <TextAreaInput
                isShowLabel={true}
                label={t("details")}
                name="details"
                type="text"
                placeholder={t("details")}
                success
              />

              <FileUploader
                textLabel={t("uploadFile")}
                multiple={true}
                name="file"
              />
            </div>
            {isSubmitting ? (
              <Loading />
            ) : (
              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewNewsCompany;

import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormAddNewDocumentManagement = () => {
  const { t } = useTranslation("systemSettings");
  
  const initialValues = {
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
        .required(t("documentManagement.validation.documentNameArabicRequired"))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t("documentManagement.validation.documentNameArabicFormat")
        ),
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t("documentManagement.validation.documentNameEnglishRequired"))
        .matches(
          /^[A-Za-z\s]+$/,
          t("documentManagement.validation.documentNameEnglishFormat")
        ),
    }),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
    });

    axiosInstance
      .post("/filecategory", values, {
        headers: {
          "Accept-Language": i18next.language,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        toast.success(t("documentManagement.messages.addSuccess"));
        resetForm();
        navigate(FullRoutes.Dashboard.SystemSettings.All);
      });
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("documentManagement.messages.cancelSuccess"));
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
                  label={t("documentManagement.form.documentNameArabic")}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={t("documentManagement.form.documentNameArabicPlaceholder")}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("documentManagement.form.documentNameEnglish")}
                  name={"en.title"}
                  type={"text"}
                  placeholder={t("documentManagement.form.documentNameEnglishPlaceholder")}
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

export default FormAddNewDocumentManagement;

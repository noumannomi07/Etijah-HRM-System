import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { useCreateBonus } from "@/hooks/settings/bonus";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface FormValues {
  nameOpponent: string;
  nameOpponentEn: string;
}

const FormAddNewManageAdditions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("systemSettings");
  
  const { mutate: createBonus } = useCreateBonus({
    onSuccess: () => {
      toast.success(t("manageAdditions.messages.addSuccess"));
      navigate(FullRoutes.Dashboard.SystemSettings.All);
    },
  });

  const initialValues: FormValues = {
    nameOpponent: "",
    nameOpponentEn: "",
  };

  const validationSchema = Yup.object({
    nameOpponent: Yup.string()
      .required(t("manageAdditions.validation.additionNameArabicRequired"))
      .matches(
        /^[\u0621-\u064A\s]+$/,
        t("manageAdditions.validation.additionNameArabicFormat")
      ),

    nameOpponentEn: Yup.string()
      .required(t("manageAdditions.validation.additionNameEnglishRequired"))
      .matches(/^[A-Za-z\s]+$/, t("manageAdditions.validation.additionNameEnglishFormat")),
  });

  const handleSubmit = (values: FormValues, { setTouched }: FormikHelpers<FormValues>) => {
    setTouched({
      nameOpponent: true,
      nameOpponentEn: true,
    });

    createBonus({
      "en[title]": values.nameOpponentEn,
      "ar[title]": values.nameOpponent,
    });
  };

  const cancelAdd = () => {
    toast.success(t("manageAdditions.messages.cancelSuccess"));
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
                  label={t("manageAdditions.form.additionNameArabic")}
                  name={"nameOpponent"}
                  type={"text"}
                  placeholder={t("manageAdditions.form.additionNameArabicPlaceholder")}
                  success
                  error={touched.nameOpponent && errors.nameOpponent}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("manageAdditions.form.additionNameEnglish")}
                  name={"nameOpponentEn"}
                  type={"text"}
                  placeholder={t("manageAdditions.form.additionNameEnglishPlaceholder")}
                  success
                  error={touched.nameOpponentEn && errors.nameOpponentEn}
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

export default FormAddNewManageAdditions;


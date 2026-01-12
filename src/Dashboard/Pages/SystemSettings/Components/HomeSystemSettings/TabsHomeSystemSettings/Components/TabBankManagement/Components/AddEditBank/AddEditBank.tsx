import { Bank, useCreateBank, useUpdateBank } from "@/hooks/settings/bank";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import React from "react";
import { useTranslation } from "react-i18next";

interface AddEditBankProps {
  data?: Bank;
  hideModal: () => void;
}

const AddEditBank = ({ data, hideModal }: AddEditBankProps) => {
  const { t } = useTranslation("systemSettings");
  
  const validationSchema = Yup.object().shape({
    "ar[title]": Yup.string()
      .required(t("bankManagement.validation.bankNameArabicRequired"))
      .min(3, t("bankManagement.validation.bankNameArabicMinLength")),
    "en[title]": Yup.string()
      .required(t("bankManagement.validation.bankNameEnglishRequired"))
      .min(3, t("bankManagement.validation.bankNameEnglishMinLength")),
  });

  const { mutate: createBank } = useCreateBank({
    onSuccess: () => {
      toast.success(t("bankManagement.messages.addSuccess"));
      hideModal();
    },
  });

  const { mutate: updateBank } = useUpdateBank({
    onSuccess: () => {
      toast.success(t("bankManagement.messages.updateSuccess"));
      hideModal();
    },
  });

  const initialValues = {
    "ar[title]": data?.ar_title,
    "en[title]": data?.en_title,
  };

 
  const handleSubmit = (values: typeof initialValues) => {
    if (data) {
      updateBank({ id: data.id.toString(), data: values });
    } else {
      createBank(values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form>
          <div className="all-forms-grid grid-cards-2">
            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("bankManagement.form.bankNameArabic")}
                name={"ar[title]"}
                type={"text"}
                placeholder={t("bankManagement.form.bankNameArabicPlaceholder")}
                success
                error={touched["ar[title]"] && errors["ar[title]"]}
                value={data?.ar_title}
              />
            </div>
            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("bankManagement.form.bankNameEnglish")}
                name={"en[title]"}
                type={"text"}
                placeholder={t("bankManagement.form.bankNameEnglishPlaceholder")}
                success
                error={touched["en[title]"] && errors["en[title]"]}
                value={data?.en_title}
              />
            </div>
          </div>

          <ButtonsFormSendCancel
            cancelAdd={hideModal}
            submitButton={() => handleSubmit()}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddEditBank; 
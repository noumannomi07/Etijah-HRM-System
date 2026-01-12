import { Bonus, CreateBonusInput, useUpdateBonus } from "@/hooks/settings/bonus";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type AddNewDiscountModalForm = {
  "ar_title": string;
  "en_title": string;
}

const initialValues: AddNewDiscountModalForm = {
  "ar_title": "",
  "en_title": "",
};

type AddNewDiscountModalProps = {
  data?: Bonus;
  hideModal: () => void;
}

export default function AddNewDiscountModal({ data, hideModal }: AddNewDiscountModalProps) {
    const { t } = useTranslation("systemSettings");
  const { mutate: updateBonus } = useUpdateBonus({
    onSuccess: () => {
      toast.success(t("discountsManagement.request_updated_successfully"));
      hideModal();
    },
  });

  const formik = useFormik<AddNewDiscountModalForm>({
    initialValues,
    validationSchema: Yup.object({
      ar_title: Yup.string().required(t("discountsManagement.discount_name_ar_required")),
      en_title: Yup.string().required(t("discountsManagement.discount_name_en_required"))
    }),
    onSubmit: (values) => {
      const bonusData: CreateBonusInput = {
        "en[title]": values.en_title,
        "ar[title]": values.ar_title,
      };
      updateBonus({
        id: data?.id,
        data: bonusData
      });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        "ar_title": data.ar_title,
        "en_title": data.en_title,
      }, false);
    }

    return () => {
      formik.resetForm();
    }
  }, [data]);

  return (
    <FormikProvider value={formik}>
      <div className="all-forms-grid grid-cards-2">
        <div className="flex flex-col gap-2">
          <ControlledInput<AddNewDiscountModalForm>
            label={t("discountsManagement.discount_name_ar")}
            fieldName="ar_title"
            type={"text"}
            placeholder={t("discountsManagement.discount_name_ar")}
          />
          <p className="text-red-500 text-sm">
            {formik.touched.ar_title && formik.errors.ar_title}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ControlledInput<AddNewDiscountModalForm>
            label={t("discountsManagement.discount_name_en")}
            fieldName="en_title"
            type={"text"}
            placeholder={t("discountsManagement.discount_name_en")}
          />
          <p className="text-red-500 text-sm">
            {formik.touched.en_title && formik.errors.en_title}
          </p>
        </div>
      </div>
      <div>
        <ButtonsFormSendCancel
          cancelAdd={() => {
            formik.resetForm();
            hideModal();
          }}
          submitButton={formik.handleSubmit}
        />
      </div>
    </FormikProvider>
  );
}

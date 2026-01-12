
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import { Standard, UpdateStandardInput, useCreateStandard, useUpdateStandard } from "@/hooks/settings/standard";
import { FullRoutes } from "@/Routes/routes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type AddEditManagingEvaluationForm = {
  "ar_title": string;
  "en_title": string;
}

const initialValues: AddEditManagingEvaluationForm = {
  "ar_title": "",
  "en_title": "",
};

type AddEditManagingEvaluationProps = {
  data?: Standard;
  hideModal?: () => void;
}

export default function AddEditManagingEvaluation({ data, hideModal }: AddEditManagingEvaluationProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("systemSettings");
  
  const { mutate: createStandard } = useCreateStandard({
    onSuccess: () => {
      toast.success(t("performanceEvaluationManagement.messages.addSuccess"));
      hideModal?.();
      navigate(FullRoutes.Dashboard.SystemSettings.All);
    },
  });
  const { mutate: updateStandard } = useUpdateStandard({
    onSuccess: () => {
      toast.success(t("performanceEvaluationManagement.messages.updateSuccess"));
      hideModal?.();
      navigate(FullRoutes.Dashboard.SystemSettings.All);
    },
  });

  const formik = useFormik<AddEditManagingEvaluationForm>({
    initialValues,
    validationSchema: Yup.object({
      ar_title: Yup.string().required(t("performanceEvaluationManagement.validation.criteriaNameArabicRequired"))
        .matches(/^[\u0621-\u064A\s]+$/, t("performanceEvaluationManagement.validation.criteriaNameArabicFormat")),
      en_title: Yup.string().required(t("performanceEvaluationManagement.validation.criteriaNameEnglishRequired"))
        .matches(/^[A-Za-z\s]+$/, t("performanceEvaluationManagement.validation.criteriaNameEnglishFormat")),
    }),
    onSubmit: (values) => {
      const standardData: UpdateStandardInput = {
        "en[title]": values.en_title,
        "ar[title]": values.ar_title,
      };
      if (data?.id) {
        updateStandard({
          id: data?.id.toString(),
          data: standardData
        });
      }
      else {
        createStandard(standardData);
      }
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
          <ControlledInput<AddEditManagingEvaluationForm>
            label={t("performanceEvaluationManagement.form.criteriaNameArabic")}
            fieldName="ar_title"
            type={"text"}
            placeholder={t("performanceEvaluationManagement.form.criteriaNameArabicPlaceholder")}
          />
          <p className="text-red-500 text-sm">
            {formik.touched.ar_title && formik.errors.ar_title}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ControlledInput<AddEditManagingEvaluationForm>
            label={t("performanceEvaluationManagement.form.criteriaNameEnglish")}
            fieldName="en_title"
            type={"text"}
            placeholder={t("performanceEvaluationManagement.form.criteriaNameEnglishPlaceholder")}
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

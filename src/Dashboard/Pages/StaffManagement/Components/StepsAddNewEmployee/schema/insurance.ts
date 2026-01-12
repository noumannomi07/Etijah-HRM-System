import * as Yup from "yup";
import { TInsuranceForm } from "../types";
import i18next from "i18next";

const getValidationSchema = () => {
  const t = i18next.getFixedT(i18next.language, "staffManagement");
  
  return Yup.object().shape({
    number: Yup.string().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.insuranceNumberRequired")),
      otherwise: (schema) => schema.nullable().optional()
    }),
    category: Yup.string().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.insuranceCategoryRequired")),
      otherwise: (schema) => schema.nullable().optional()
    }),
    persons: Yup.number().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.personsCountRequired")).positive().integer(),
      otherwise: (schema) => schema.nullable().optional()
    }),
    start_date: Yup.date().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.startDateRequired")),
      otherwise: (schema) => schema.nullable().optional()
    }),
    end_date: Yup.date().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.endDateRequired")),
      otherwise: (schema) => schema.nullable().optional()
    }),
    medical: Yup.number().required(t("medicalInsurance.validation.medicalInsuranceRequired")),
    file: Yup.mixed().when('medical', {
      is: 1,
      then: (schema) => schema.required(t("medicalInsurance.validation.fileRequired")),
      otherwise: (schema) => schema.nullable().optional()
    }),
  });
};

const validationSchema = getValidationSchema();

const initialValues: TInsuranceForm = {
  category: "",
  medical: 0,
  persons: 0,
  number: "",
  start_date: "",
  end_date: "",
  file: undefined,
};

export {
  initialValues,
  validationSchema,
  getValidationSchema
}
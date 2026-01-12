import * as Yup from "yup";
import { ExpensesCompenstationType, MileageCompensationType } from "./types";
import { formatDateToYmd } from "@/utils/date";
import i18next from "i18next";

const t = (key: string) => i18next.t(`orders:${key}`);

const compensationInitialValues: ExpensesCompenstationType = {
  employee_id: 0,
  amount: 0,
  has_mile: 0,
  has_tax: 0,
  expense_mangment_id: 0,
  projectmange_id: 0,
  code: "",
  content: "",
  tax: 0,
  date: formatDateToYmd(new Date()),
  type: "expenses",
};

const compoenstationValidationSchema = Yup.object({
  employee_id: Yup.number().notOneOf([0], t("validation.employeeRequired")),
  amount: Yup.number()
    .required(t("validation.amountRequired"))
    .min(1, t("validation.amountGreaterThanZero")),
  projectmange_id: Yup.number().required(t("validation.projectRequired")),
  has_tax: Yup.number(),
  tax: Yup.number().nullable(),
  code: Yup.string().nullable(),
  content: Yup.string().nullable(),
  date: Yup.date().required(t("validation.dateRequired")),
});

export const ExpensesCompenstationSchema = {
  initialValues: compensationInitialValues,
  validationSchema: compoenstationValidationSchema
}

const mileageCompensationInitialValues: MileageCompensationType = {
  employee_id: 0,
  has_mile: 1,
  amount: 0,
  date: formatDateToYmd(new Date()),
  projectmange_id: 0,
  expense_mangment_id: 0,
  code: "",
  content: "",
  type: "mileage",
  has_tax: 0,
  tax: 0,
  miles: 0,
  mile_type: "distance",
  mile_price: 0
};

const mileageCompensationValidationSchema = Yup.object({
  employee_id: Yup.number().required(t("validation.employeeRequired")),
  amount: Yup.number()
    .required(t("validation.amountRequired"))
    .min(1, t("validation.amountGreaterThanZero")),
  miles: Yup.number()
    .required(t("validation.distanceRequired"))
    .min(0, t("validation.distanceGreaterThanZero")),
  mile_price: Yup.number().required(t("validation.mileRateRequired")),
  tax: Yup.number().nullable(),
  code: Yup.string().nullable(),
  content: Yup.string().nullable(),
  date: Yup.date().required(t("validation.dateRequired")),
});

export const MileageCompensationSchema = {
  initialValues: mileageCompensationInitialValues,
  validationSchema: mileageCompensationValidationSchema
}
import * as Yup from "yup";
import { MileageDistanceCompensationType, MileageDistanceCounterCompensationType, MileageMapCompensationType } from "../../../../types";
import { formatDateToYmd } from "@/utils/date";
import i18next from "i18next";

const t = (key: string) => i18next.t(`orders:${key}`);

const distanceCompensationInitialValues: MileageDistanceCompensationType = {
  amount: 0,
  has_mile: 1,
  mile_type: "distance",
  has_tax: 0,
  tax: 0,
  code: "",
  mile_price: 0,
  content: "",
  employee_id: 0,
  date: formatDateToYmd(new Date()),
  projectmange_id: 0,
  expense_mangment_id: 0,
  miles: 0,
  type: "mileage",
};

const distanceCompensationValidationSchema = Yup.object({
  miles: Yup.number()
    .required(t("validation.distanceRequired"))
    .min(1, t("validation.distanceGreaterThanZero")),
  mile_price: Yup.number().required(t("validation.mileRateRequired")),
  tax: Yup.number().required(t("validation.taxRequired")),
  employee_id: Yup.number().required(t("validation.employeeRequired")),
  date: Yup.date().required(t("validation.dateRequired")),
  projectmange_id: Yup.number().required(t("validation.projectRequired")),
  expense_mangment_id: Yup.number().required(t("validation.expenseTypeRequired")),
  amount: Yup.number().required(t("validation.amountRequired")),
  code: Yup.object().nullable(),
  content: Yup.string().nullable()
});

export const MileageDistanceCompensationSchema = {
  initialValues: distanceCompensationInitialValues,
  validationSchema: distanceCompensationValidationSchema
};


const mileageDistanceCounterInitialValues: MileageDistanceCounterCompensationType = {
  amount: 0,
  content: "",
  type: "mileage",
  mile_type: "odometer",
  has_tax: 0,
  tax: 0,
  code: "",
  employee_id: 0,
  date: formatDateToYmd(new Date()),
  projectmange_id: 0,
  expense_mangment_id: 0,
  miles: 0,
  mile_price: 0,
  km_from: 0,
  km_to: 0,
};

const mileageDistanceCounterValidationSchema = Yup.object({
  miles: Yup.number()
    .required(t("validation.distanceRequired"))
    .min(1, t("validation.distanceGreaterThanZero")),
  mile_price: Yup.number().required(t("validation.mileRateRequired")),
  tax: Yup.number().required(t("validation.taxRequired")),
  employee_id: Yup.number().required(t("validation.employeeRequired")),
  date: Yup.date().required(t("validation.dateRequired")),
  projectmange_id: Yup.number().required(t("validation.projectRequired")),
  expense_mangment_id: Yup.number().required(t("validation.expenseTypeRequired")),
  amount: Yup.number().required(t("validation.amountRequired")),
  code: Yup.object().nullable(),
  content: Yup.string().nullable(),
  km_from: Yup.number().required(t("validation.startDistanceRequired")),
  km_to: Yup.number()
    .required(t("validation.endDistanceRequired"))
    .min(1, t("validation.endDistanceGreaterThanZero"))
});
export const MileageDistanceCounterCompensationSchema = {
  initialValues: mileageDistanceCounterInitialValues,
  validationSchema: mileageDistanceCounterValidationSchema
};


const mileageMapInitialValues: MileageMapCompensationType = {
  amount: 0,
  content: "",
  type: "mileage",
  mile_type: "map",
  has_tax: 0,
  tax: 0,
  code: "",
  date: formatDateToYmd(new Date()),
  projectmange_id: 0,
  expense_mangment_id: 0,
  employee_id: 0,
  start_lat: 0,
  start_lng: 0,
  end_lat: 0,
  end_lng: 0,
  distance: 0,
};


const mileageMapValidationSchema = Yup.object({
  miles: Yup.number()
    .required(t("validation.distanceRequired"))
    .min(1, t("validation.distanceGreaterThanZero")),
  mile_price: Yup.number().required(t("validation.mileRateRequired")),
  tax: Yup.number().required(t("validation.taxRequired")),
  employee_id: Yup.number().required(t("validation.employeeRequired")),
  date: Yup.date().required(t("validation.dateRequired")),
  projectmange_id: Yup.number().required(t("validation.projectRequired")),
  expense_mangment_id: Yup.number().required(t("validation.expenseTypeRequired")),
  amount: Yup.number().required(t("validation.amountRequired")),
  code: Yup.object().nullable(),
  content: Yup.string().nullable(),
  start_lat: Yup.number().required(t("validation.startLocationRequired")),
  start_lng: Yup.number().required(t("validation.startLocationRequired")),
  end_lat: Yup.number().required(t("validation.endLocationRequired")),
  end_lng: Yup.number().required(t("validation.endLocationRequired")),
  distance: Yup.number().required(t("validation.distanceRequired")),
});

export const MileageMapCompensationSchema = {
  initialValues: mileageMapInitialValues,
  validationSchema: mileageMapValidationSchema
};
